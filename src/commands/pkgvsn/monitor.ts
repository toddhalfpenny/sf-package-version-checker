import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';

import * as child from 'child_process';
import * as util from 'util';
import * as path from 'path';
import * as notifier from 'node-notifier'
const setTimeoutPromise = util.promisify(setTimeout);

const exec = util.promisify(child.exec);

interface creationStatus {
  Id?: String
  Status?: String,
  err?: String,
  Package2Id?: String,
  Package2VersionId?: String,
  SubscriberPackageVersionId?: String,
  Tag?: String,
  Branch?: String,
  Error?: String | Array<any>,
  CreatedDate?: "2020-04-22 11:15"
}
// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('pkgVsnChkr', 'monitor');

const secondsBetweenRuns = 30;

export default class Monitor extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
  `$ sfdx pkgvsn:monitor
  `,
  `$ sfdx pkgvsn:monitor --targetdevhubusername devhub@monitor.com
  `,
  ];

  protected static requiresUsername = false;
  protected static supportsDevhubUsername = true;

  protected static flagsConfig = {
    timeout: flags.number({
        char: 't',
        description: messages.getMessage('timeoutFlagDescription'),
        default:1200
    }),
    quiet: flags.builtin(),
    verbose: flags.builtin(),
  };

  public async run(): Promise<creationStatus> {
    const maxRuns = Math.floor(this.flags.timeout / secondsBetweenRuns);
    const res = await this.getLatestStatus(1, maxRuns);
    const iconPath = path.join(__dirname, '../../../assets/package.png');
    notifier.notify({
      'title': 'Latest Packaging Version Creation Complete',
      'subtitle': res.Status,
      'message': (res.SubscriberPackageVersionId) ? res.Status + '! \nSubscriberPackageVersionId: ' + res.SubscriberPackageVersionId : res.Status,
      'icon': iconPath,
      'sound': true,
      'timeout': 30
    });

    // Return an object to be displayed with --json
    return res;
  }

  async getLatestStatus(curRun, maxRuns, prevStatus = ''): Promise<creationStatus> {
    if ( curRun == 1 ) {
      this.ux.startSpinner("Initialising");
    }
    const cmdRes =  await exec('sfdx force:package:version:create:list --json');
    if (this.flags.verbose) this.ux.log(JSON.stringify(cmdRes));
    if ( cmdRes.stdout ) {
      const resJson = JSON.parse(cmdRes.stdout);
      if ( resJson.status === 0 ){
        const lastCreationRes = resJson.result[resJson.result.length - 1];
        switch (lastCreationRes.Status) {
          case 'Success':
            this.ux.log(lastCreationRes.Status + ' - SubscriberPackageVersionId: ' + lastCreationRes.SubscriberPackageVersionId);
            return lastCreationRes;
          case 'Error':
            if (!this.flags.quiet) this.ux.error(lastCreationRes.Status + ' - Id: ' + lastCreationRes.Id);
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
              await setTimeoutPromise(secondsBetweenRuns * 1000);
              curRun++;
              return this.getLatestStatus(curRun, maxRuns, lastCreationRes.Status);
            }
        }
      } else {
        if (!this.flags.quiet) this.ux.error('resJson.status', resJson.status);
        return {err: resJson }
      }
    } else {
      if (!this.flags.quiet) this.ux.error(cmdRes.stderr);
      return {err: cmdRes.stderr}
    }
  }
}
