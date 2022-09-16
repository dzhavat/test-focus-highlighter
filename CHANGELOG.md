# Changelog

## 1.2.1 - 2022-09-16

### Changed

- Update README file

## 1.2.0 - 2022-09-16

### Added

- Support `*.cy.js` and `*.cy.ts` tests used in Cypress

### Changed

- Set the minimum supported VS Code version to 1.68.0
- Update dependencies

## 1.1.0 - 2021-12-19

### Added

- Support for Workspace Trust

## 1.0.3 - 2021-12-19

### Changed

- Set the minimum supported VS Code version to 1.58.0
- Update dependencies

## 1.0.2 - 2021-06-17

### Changed

- Set the minimum supported VS Code version to 1.52.0
- Update dependencies

## 1.0.1 - 2021-02-20

### Fixed

- Fix links to demo gifs

### Changed

- Set the minimum supported VS Code version to 1.47.0
- Update dependencies

## 1.0.0 - 20-04-27

### Added

- Works with JavaScript files whose name ends with `-spec.js` or `.spec.js`.
- Works with TypeScript files whose name ends with `-spec.ts` or `.spec.ts`.
- Highlights tests that use `fdescribe`, `fit` and `.only` syntax.
- Shows a warning icon in the gutter for each line covered by a focused test.
- Shows a warning message when a focused test is hovered.
- Shows a color in the overview ruler that makes it easy to see any focus tests in a big spec file. The color used for this is `editorWarning.foreground` which is defined by the theme. Currently this option is not configurable.
