

* feat: drop zone inside resize plugin (#499) (39764da)
* chore(deps): update taiga-family/ci action to v1.72.0 (#503) (498bc9e)
* chore(deps): update taiga-ui dev infra to v0.169.1 (#502) (e81e371)
* chore(deps): update commitlint to v19.5.0 (#501) (98a322a)
* chore(deps): update taiga-ui dev infra to v0.169.0 (#500) (e1b082f)
* chore(deps): update taiga-ui dev infra to v0.166.0 (#493) (f78b98b)
* chore(deps): update nx to v19.7.2 (#498) (1deef53)

* fix: `ResizePlugin` add event listener (#497) (66032ba)
* chore(deps): update nx to v19.7.1 (#496) (8112606)
* chore(deps): update nx to v19.7.0 (#495) (a60b2fa)
* chore(deps): update nx to v19.6.6 (#494) (873cd14)
* chore(deps): update taiga-ui dev infra to v0.160.1 (#492) (5139385)
* chore(deps): update taiga-ui dev infra to v0.160.0 (#491) (cb5ffe2)
* chore(deps): update taiga-ui dev infra to v0.159.1 (#490) (e1da2ee)

## [4.1.1](https://github.com/taiga-family/ng-event-plugins/compare/v4.0.1...vnull) (2024-09-05)

### Bug Fixes

- bump minor
  ([d771f13](https://github.com/taiga-family/ng-event-plugins/commit/d771f133c939ddf7737472f246afdeff53adab10))
- bump minor
  ([6797ada](https://github.com/taiga-family/ng-event-plugins/commit/6797ada613576ba7e453660c47252706e6734942))

- fix: do not listen `Window` (#326) (c0a99bc)
- chore(deps): update taiga-family/ci action to v1.62.3 (#325) (10461fe)
- chore(deps): update actions/checkout action to v4.1.7 (#324) (4c99150)
- chore: fixup (31272b2)
- chore(deps): update dependency lint-staged to v15.2.7 (#323) (8b84706)
- chore: fixup (3f34c43)

# 4.0.0 (2024-06-11)

### Bug Fixes

- **aot:** add utility function to spoof callable in AOT compiler
  ([b0bed98](https://github.com/taiga-family/ng-event-plugins/commit/b0bed9801f43e5651283bca0817ec899cac7fd4b))
- **bind:** add nullish coalescing instead of resetting element property
  ([0562714](https://github.com/taiga-family/ng-event-plugins/commit/0562714e1fbbb6df84c8c8121e7fb54e32817779))
- **bind:** removes attribute if null provided
  ([113d9fb](https://github.com/taiga-family/ng-event-plugins/commit/113d9fb4e9ee969dc970a88efbace6ffcdab70af))
- correct schema reference ([#113](https://github.com/taiga-family/ng-event-plugins/issues/113))
  ([c622db2](https://github.com/taiga-family/ng-event-plugins/commit/c622db2b78993cf71534090561205631d1d6a008))
- fix memory leak in `capture` plugin ([#218](https://github.com/taiga-family/ng-event-plugins/issues/218))
  ([#219](https://github.com/taiga-family/ng-event-plugins/issues/219))
  ([5fe51f8](https://github.com/taiga-family/ng-event-plugins/commit/5fe51f8579ac8ea0e250527976ea5fc5531ed52d))
- **module:** improve error messages
  ([a86cd79](https://github.com/taiga-family/ng-event-plugins/commit/a86cd79a65c6aa632361bfea842ac80de1d9307b))
- **shouldCall:** fix for AOT build
  ([3688da4](https://github.com/taiga-family/ng-event-plugins/commit/3688da445a9d9792d7d4b2fe70c956099901e933))
- **web-types:** add descriptions and version
  ([9e39ce7](https://github.com/taiga-family/ng-event-plugins/commit/9e39ce77d5d33798e083b9c0176ecded9b46d13e))

### Features

- `Resize` add new plugin ([#319](https://github.com/taiga-family/ng-event-plugins/issues/319))
  ([2697ad2](https://github.com/taiga-family/ng-event-plugins/commit/2697ad2f8d815209a1f1a1535efbd139b8da2c28))
- add web-types for autocomplete ([#30](https://github.com/taiga-family/ng-event-plugins/issues/30))
  ([53c5852](https://github.com/taiga-family/ng-event-plugins/commit/53c58520fa0521dd658125211efd38c1ebe747d4))
- **bind:** add plugin for Observable host binding ([#11](https://github.com/taiga-family/ng-event-plugins/issues/11))
  ([ab68909](https://github.com/taiga-family/ng-event-plugins/commit/ab68909b583960f8991e3ea6673aa1a9b57dc5bf))
- **bind:** add style dasharize
  ([2cdf77e](https://github.com/taiga-family/ng-event-plugins/commit/2cdf77ea7fa73d98ef3ef9d11766330ef7e0be48))
- **capture:** add new modifier .capture to listen to events in capture phase
  ([#10](https://github.com/taiga-family/ng-event-plugins/issues/10))
  ([20a372b](https://github.com/taiga-family/ng-event-plugins/commit/20a372b1df077787e15cdb2b6806c842f6445978))
- **deps:** update Angular ([#142](https://github.com/taiga-family/ng-event-plugins/issues/142))
  ([894a85f](https://github.com/taiga-family/ng-event-plugins/commit/894a85fdfd69fd4771f493e6512dc2903972e5c0))
- **global:** add new plugin
  ([cadf832](https://github.com/taiga-family/ng-event-plugins/commit/cadf832c34592443bc6f16884078e5eddd6083fc))
- **module:** add assertion to keep module singleton
  ([1ff3226](https://github.com/taiga-family/ng-event-plugins/commit/1ff3226bb9f4667c39bd4b28844ab995b8f744e3))
- **module:** add module for clearer addition ([#22](https://github.com/taiga-family/ng-event-plugins/issues/22))
  ([a1a947d](https://github.com/taiga-family/ng-event-plugins/commit/a1a947d6a9970b716fb08cc5848466fabf4b6cce))
- **options:** cover other `addEventListener` options
  ([#25](https://github.com/taiga-family/ng-event-plugins/issues/25))
  ([13f4872](https://github.com/taiga-family/ng-event-plugins/commit/13f487298ee9715314a0f5afe178f35bb353bbb6))
- **self:** add new plugin ([#14](https://github.com/taiga-family/ng-event-plugins/issues/14))
  ([0193b6f](https://github.com/taiga-family/ng-event-plugins/commit/0193b6ff1efe9b85dcb0a748e65f5cc4a5ca8d63))
- **silent:** simplify getting `NgZone` in `[@should](https://github.com/should)Call`
  ([#50](https://github.com/taiga-family/ng-event-plugins/issues/50))
  ([64872cd](https://github.com/taiga-family/ng-event-plugins/commit/64872cd10145173d5121efbd1abf8d57363292b8))
- use taiga-ui scope
  ([8dc54b9](https://github.com/taiga-family/ng-event-plugins/commit/8dc54b9ec39b20e9d7947628c4a916215e8e7574))

### Reverts

- Revert "chore(deps): pin dependencies (#212)"
  ([2671380](https://github.com/taiga-family/ng-event-plugins/commit/26713803c354062b17925714506975667fae817c)), closes
  [#212](https://github.com/taiga-family/ng-event-plugins/issues/212)
- Revert "chore(deps): pin dependencies (#211)"
  ([44d649d](https://github.com/taiga-family/ng-event-plugins/commit/44d649d04ef3e3d90acf628ddd45b89164c3f27b)), closes
  [#211](https://github.com/taiga-family/ng-event-plugins/issues/211)

### BREAKING CHANGES

- `BindEventPlugin` has been removed
- **capture:** Bump Angular version to 9

# Changelog

All notable changes to this project will be documented in this file. See
[standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [3.1.0](https://github.com/TinkoffCreditSystems/ng-event-plugins/compare/v3.0.0...v3.1.0) (2022-12-23)

### Features

- **silent:** simplify getting `NgZone` in `[@should](https://github.com/should)Call`
  ([#50](https://github.com/TinkoffCreditSystems/ng-event-plugins/issues/50))
  ([64872cd](https://github.com/TinkoffCreditSystems/ng-event-plugins/commit/64872cd10145173d5121efbd1abf8d57363292b8))

## [3.0.0](https://github.com/TinkoffCreditSystems/ng-event-plugins/compare/v2.5.1...v3.0.0) (2022-07-18)

### ⚠ BREAKING CHANGES

- update to Angular 12 and Ivy distribution (#45)

### Features

- update to Angular 12 and Ivy distribution ([#45](https://github.com/TinkoffCreditSystems/ng-event-plugins/issues/45))
  ([dabf7f1](https://github.com/TinkoffCreditSystems/ng-event-plugins/commit/dabf7f1a7e7532dfd0b404ef3565580515240e20))

### [2.5.1](https://github.com/TinkoffCreditSystems/ng-event-plugins/compare/v2.5.0...v2.5.1) (2021-12-13)

### Bug Fixes

- **web-types:** add descriptions and version
  ([9e39ce7](https://github.com/TinkoffCreditSystems/ng-event-plugins/commit/9e39ce77d5d33798e083b9c0176ecded9b46d13e))

## [2.5.0](https://github.com/TinkoffCreditSystems/ng-event-plugins/compare/v2.4.0...v2.5.0) (2021-12-10)

### Features

- add web-types for autocomplete ([#30](https://github.com/TinkoffCreditSystems/ng-event-plugins/issues/30))
  ([53c5852](https://github.com/TinkoffCreditSystems/ng-event-plugins/commit/53c58520fa0521dd658125211efd38c1ebe747d4))

## [2.4.0](https://github.com/TinkoffCreditSystems/ng-event-plugins/compare/v2.3.2...v2.4.0) (2021-11-19)

### Features

- **options:** cover other `addEventListener` options
  ([#25](https://github.com/TinkoffCreditSystems/ng-event-plugins/issues/25))
  ([13f4872](https://github.com/TinkoffCreditSystems/ng-event-plugins/commit/13f487298ee9715314a0f5afe178f35bb353bbb6))

### [2.3.2](https://github.com/TinkoffCreditSystems/ng-event-plugins/compare/v2.3.1...v2.3.2) (2021-11-01)

### Bug Fixes

- **module:** improve error messages
  ([a86cd79](https://github.com/TinkoffCreditSystems/ng-event-plugins/commit/a86cd79a65c6aa632361bfea842ac80de1d9307b))

### [2.3.1](https://github.com/TinkoffCreditSystems/ng-event-plugins/compare/v2.3.0...v2.3.1) (2021-11-01)

### Features

- **module:** add assertion to keep module singleton
  ([1ff3226](https://github.com/TinkoffCreditSystems/ng-event-plugins/commit/1ff3226bb9f4667c39bd4b28844ab995b8f744e3))

## [2.3.0](https://github.com/TinkoffCreditSystems/ng-event-plugins/compare/v2.1.2...v2.3.0) (2021-10-15)

### Features

- **module:** add module for clearer addition
  ([#22](https://github.com/TinkoffCreditSystems/ng-event-plugins/issues/22))
  ([a1a947d](https://github.com/TinkoffCreditSystems/ng-event-plugins/commit/a1a947d6a9970b716fb08cc5848466fabf4b6cce))

### Bug Fixes

- **bind:** removes attribute if null provided
  ([113d9fb](https://github.com/TinkoffCreditSystems/ng-event-plugins/commit/113d9fb4e9ee969dc970a88efbace6ffcdab70af))

## [2.2.0](https://github.com/TinkoffCreditSystems/ng-event-plugins/compare/v2.1.2...v2.2.0) (2021-04-21)

### Features

- **self:** add a new plugin ([#14](https://github.com/TinkoffCreditSystems/ng-event-plugins/issues/14))
  ([0193b6f](https://github.com/TinkoffCreditSystems/ng-event-plugins/commit/0193b6ff1efe9b85dcb0a748e65f5cc4a5ca8d63))

### [2.1.3](https://github.com/TinkoffCreditSystems/ng-event-plugins/compare/v2.1.2...v2.1.3) (2021-03-01)

### Bug Fixes

- **bind:** removes attribute if null provided
  ([113d9fb](https://github.com/TinkoffCreditSystems/ng-event-plugins/commit/113d9fb4e9ee969dc970a88efbace6ffcdab70af))
- **bind:** add style dasharize
  ([2cdf77e](https://github.com/TinkoffCreditSystems/ng-event-plugins/commit/2cdf77ea7fa73d98ef3ef9d11766330ef7e0be48))

### [2.1.2](https://github.com/TinkoffCreditSystems/ng-event-plugins/compare/v2.1.1...v2.1.2) (2021-02-20)

### Bug Fixes

- **bind:** add nullish coalescing instead of resetting element property
  ([0562714](https://github.com/TinkoffCreditSystems/ng-event-plugins/commit/0562714e1fbbb6df84c8c8121e7fb54e32817779))

### [2.1.1](https://github.com/TinkoffCreditSystems/ng-event-plugins/compare/v2.1.0...v2.1.1) (2021-02-12)

### Bug Fixes

- **aot:** add utility function to spoof callable in AOT compiler
  ([b0bed98](https://github.com/TinkoffCreditSystems/ng-event-plugins/commit/b0bed9801f43e5651283bca0817ec899cac7fd4b))

## [2.1.0](https://github.com/TinkoffCreditSystems/ng-event-plugins/compare/v2.0.0...v2.1.0) (2021-02-10)

### Features

- **bind:** add plugin for Observable host binding
  ([#11](https://github.com/TinkoffCreditSystems/ng-event-plugins/issues/11))
  ([ab68909](https://github.com/TinkoffCreditSystems/ng-event-plugins/commit/ab68909b583960f8991e3ea6673aa1a9b57dc5bf))

## [2.0.0](https://github.com/TinkoffCreditSystems/ng-event-plugins/compare/v1.0.1...v2.0.0) (2020-12-11)

### ⚠ BREAKING CHANGES

- **capture:** Bump Angular version to 9

### Features

- **capture:** add new modifier `.capture` to listen to events in capture phase
  ([#10](https://github.com/TinkoffCreditSystems/ng-event-plugins/issues/10))
  ([20a372b](https://github.com/TinkoffCreditSystems/ng-event-plugins/commit/20a372b1df077787e15cdb2b6806c842f6445978))

### [1.0.1](https://github.com/TinkoffCreditSystems/ng-event-plugins/compare/v1.0.0...v1.0.1) (2020-02-27)

### Bug Fixes

- **shouldCall:** fix for AOT build ([3688da4](https://github.com/TinkoffCreditSystems/ng-event-plugins/commit/3688da4))

## 1.0.0 (2020-02-18)
