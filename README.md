sf-package-version-checker
==========

Checks on status of a package version that is being created

[![Version](https://img.shields.io/npm/v/sf-package-version-checker.svg)](https://npmjs.org/package/sf-package-version-checker)
[![CircleCI](https://circleci.com/gh/toddhalfpenny/sf-package-version-checker/tree/master.svg?style=shield)](https://circleci.com/gh/toddhalfpenny/sf-package-version-checker/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/toddhalfpenny/sf-package-version-checker?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/sf-package-version-checker/branch/master)
[![Codecov](https://codecov.io/gh/toddhalfpenny/sf-package-version-checker/branch/master/graph/badge.svg)](https://codecov.io/gh/toddhalfpenny/sf-package-version-checker)
[![Greenkeeper](https://badges.greenkeeper.io/toddhalfpenny/sf-package-version-checker.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/toddhalfpenny/sf-package-version-checker/badge.svg)](https://snyk.io/test/github/toddhalfpenny/sf-package-version-checker)
[![Downloads/week](https://img.shields.io/npm/dw/sf-package-version-checker.svg)](https://npmjs.org/package/sf-package-version-checker)
[![License](https://img.shields.io/npm/l/sf-package-version-checker.svg)](https://github.com/toddhalfpenny/sf-package-version-checker/blob/master/package.json)


<!-- install -->
## Install
```
sfdx plugins:install sf-package-version-checker
```

<!-- install -->

<!-- commands -->
* [`sfdx pkgvsn:monitor [--timeout <number>] [--targetdevhubusername <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`]()

## `sfdx pkgvsn:monitor  [--timeout <number>] [--targetdevhubusername <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Monitors for the latest 2GP package version creation request, and notifies when complete.

```
USAGE
  $ sfdx pkgvsn:monitor [--timeout <number>]  [--targetdevhubusername <STRING>] [--json] [--loglevel
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS

  -t, --timeout=timeout                                                             [default: 1200] Timeout
                                                                                    (seconds). Default 1200 (20
                                                                                    minutes)

  -v, --targetdevhubusername=targetdevhubusername                                   username or alias for the dev
                                                                                    hub org; overrides default dev
                                                                                    hub org

  --apiversion=apiversion                                                           override the api version used
                                                                                    for api requests made by this
                                                                                    command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level
                                                                                    for this command invocation

  --quiet                                                                           less emitted stdout

  --verbose                                                                         emit additional command output
                                                                                    to stdout


EXAMPLES
  $ sfdx pkgvsn:monitor

  $ sfdx pkgvsn:monitor --targetdevhubusername devhub@monitor.com --timeout 1800
```
<!-- commandsstop -->
