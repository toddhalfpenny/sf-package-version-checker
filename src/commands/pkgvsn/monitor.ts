import { SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';

import * as child from 'child_process';
import * as util from 'util';
import * as notifier from 'node-notifier'
const setTimeoutPromise = util.promisify(setTimeout);

const exec = util.promisify(child.exec);


// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('pkgVsnChkr', 'monitor');

export default class Monitor extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
  `$ sfdx pkgvsn:monitor --targetdevhubusername devhub@monitor.com
  `
  ];

  protected static requiresUsername = false;
  protected static supportsDevhubUsername = true;


  public async run(): Promise<AnyJson> {
    const maxRuns = 10;
    const res = await this.getLatestStatus(1, maxRuns);
    notifier.notify({
      'title': 'Latest Packaging Version Creation Complete',
      'subtitle': res.Status,
      'message': res.Status,
      'icon': 'dwb-logo.png',
      'contentImage': 'blog.png',
      'sound': 'ding.mp3',
      'wait': true
    });

    // Return an object to be displayed with --json
    return { vsnList: res };
  }

  async getLatestStatus(curRun, maxRuns, prevStatus = ''): Promise<AnyJson> {
    if ( curRun == 1 ) {
      this.ux.startSpinner("Initialising");
    }
    const cmdRes =  await exec('sfdx force:package:version:create:list --json');
    if ( cmdRes.stdout ) {
      const resJson = JSON.parse(cmdRes.stdout);
      if ( resJson.status === 0 ){
        const lastCreationRes = resJson.result[resJson.result.length - 1];
        switch (lastCreationRes.Status) {
          case 'Success':
            this.ux.log(lastCreationRes.Status + ' - SubscriberPackageVersionId: ' + lastCreationRes.SubscriberPackageVersionId);
            return lastCreationRes;
          case 'Error':
            this.ux.error(lastCreationRes.Status + ' - Id: ' + lastCreationRes.Id);
            return lastCreationRes;
          default :
              this.ux.startSpinner(lastCreationRes.Status);
              if ( lastCreationRes.Status != prevStatus) {
                this.ux.log(lastCreationRes.Status + ' - Id: ' + lastCreationRes.Id);
              }
            if ( curRun > maxRuns ) {
              this.ux.stopSpinner(lastCreationRes.Status);
              return {};
            } else {
              await setTimeoutPromise(30000);
              curRun++;
              return this.getLatestStatus(curRun, maxRuns, lastCreationRes.Status);
            }
        }
      } else {
        this.ux.error('resJson.status', resJson.status);
        return {err: resJson }
      }
    } else {
      this.ux.error(cmdRes.stderr);
      return {err: cmdRes.stderr}
    }
  }
}
