pkgVsnChkr
==========

Checks on status of a package version that is being created

[![Version](https://img.shields.io/npm/v/pkgVsnChkr.svg)](https://npmjs.org/package/pkgVsnChkr)
[![CircleCI](https://circleci.com/gh/toddhalfpenny/pkgVsnChkr/tree/master.svg?style=shield)](https://circleci.com/gh/toddhalfpenny/pkgVsnChkr/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/toddhalfpenny/pkgVsnChkr?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/pkgVsnChkr/branch/master)
[![Codecov](https://codecov.io/gh/toddhalfpenny/pkgVsnChkr/branch/master/graph/badge.svg)](https://codecov.io/gh/toddhalfpenny/pkgVsnChkr)
[![Greenkeeper](https://badges.greenkeeper.io/toddhalfpenny/pkgVsnChkr.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/toddhalfpenny/pkgVsnChkr/badge.svg)](https://snyk.io/test/github/toddhalfpenny/pkgVsnChkr)
[![Downloads/week](https://img.shields.io/npm/dw/pkgVsnChkr.svg)](https://npmjs.org/package/pkgVsnChkr)
[![License](https://img.shields.io/npm/l/pkgVsnChkr.svg)](https://github.com/toddhalfpenny/pkgVsnChkr/blob/master/package.json)


<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g pkgVsnChkr
$ sfdx COMMAND
running command...
$ sfdx (-v|--version|version)
pkgVsnChkr/0.0.0 linux-x64 node-v8.11.4
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`sfdx pkgvsn:monitor [--targetdevhubusername <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`]()

## `sfdx pkgvsn:monitor [--targetdevhubusername <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Monitors for the latest 2GP package version creation request, and notifies when complete.

```
USAGE
  $ sfdx pkgvsn:monitor [--targetdevhubusername <STRING>] [--json] [--loglevel
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLES
  $ sfdx pkgvsn:monitor

  $ sfdx pkgvsn:monitor --targetdevhubusername devhub@monitor.com
```
<!-- commandsstop -->
