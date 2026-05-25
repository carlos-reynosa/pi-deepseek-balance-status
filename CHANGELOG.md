# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

### Changed

### Fixed

## [1.1.1] - 2026-05-25

### Added

- CHANGELOG.md following Keep a Changelog format (#)

## [1.1.0] - 2026-05-25

### Added

- TypeScript type checking via `npm run check` (#)
- GitHub Actions CI workflow running type checks on push (#)
- `tsconfig.json` with strict mode (#)
- auth.json setup example in README with `deepseek` key format (#)
- Status table documenting what each status string means (#)
- Note that subscription/OAuth auth is not supported (DeepSeek requires raw API key) (#)

### Changed

- Restructured README: Requirements section moved before Configuration for natural install flow (#)
- Simplified Reload section to be more concise (#)
- Removed unused `@earendil-works/pi-ai` and `typebox` from peerDependencies (#)
- Switched devDependency `@earendil-works/pi-coding-agent` to `"*"` range to match peerDep convention (#)

## [1.0.0] - 2026-05-25

### Added

- Initial release of pi-deepseek-balance-status (#)
- Displays DeepSeek account balance in the pi status bar (#)
- Configurable prefix via `~/.pi/agent/deepseek-status.json` (#)
- Auto-fallback to `"DS - 💰"` when no config file is present (#)
- Error states for missing model, missing key, network errors, and parse failures (#)

[unreleased]: https://github.com/carlos-reynosa/pi-deepseek-balance-status/compare/v1.1.1...HEAD
[1.1.1]: https://github.com/carlos-reynosa/pi-deepseek-balance-status/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/carlos-reynosa/pi-deepseek-balance-status/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/carlos-reynosa/pi-deepseek-balance-status/releases/tag/v1.0.0
