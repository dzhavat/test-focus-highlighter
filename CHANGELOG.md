# Changelog

Based on [Keep a Changelog](http://keepachangelog.com/).

## [1.0.0] - 2020-04-27

### Added

- Works with JavaScript files whose name ends with `-spec.js` or `.spec.js`.
- Works with TypeScript files whose name ends with `-spec.ts` or `.spec.ts`.
- Highlights tests that use `fdescribe`, `fit` and `.only` syntax.
- Shows a warning icon in the gutter for each line covered by a focused test.
- Shows a warning message when a focused test is hovered.
- Shows a color in the overview ruler that makes it easy to see any focus tests in a big spec file. The color used for this is `editorWarning.foreground` which is defined by the theme. Currently this option is not configurable.