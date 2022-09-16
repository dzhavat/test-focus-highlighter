# Test Focus Highlighter ([link](https://marketplace.visualstudio.com/items?itemName=dzhavat.test-focus-highlighter))

An extension that visually highlights focused tests in spec files.

Why?

Focused tests can be great during local development because they allow us to execute only a single spec or a spec suite. Jasmine has [`fdescribe`](https://jasmine.github.io/api/4.4/global.html#fdescribe) and [`fit`](https://jasmine.github.io/api/4.4/global.html#fit), Mocha has [`.only()`](https://mochajs.org/#exclusive-tests) and Jest [supports](https://jestjs.io/docs/api#describeonlyname-fn) [both](https://jestjs.io/docs/api#testonlyname-fn-timeout).

However, this should come with a **big warning**! Commiting and pushing focused tests upstream means that **only a subset** of your tests will run. This **can mislead you** into thinking that your test suites are executing successfully when in reality it's only a small portion of them.

There are many ways to guard against this problem. Some are manual like relying on self discipline and pull request reviews, while other take advantage of automatization and tooling like setting up git precommit hooks, lint rules, continuous integration pipeline checks, etc.

The purpose of this extension is to help you identify focused tests very early in the development process by making them visually stand out. The extension will not prevent you from commiting focused tests. It only aims to increase your chances of catching focused tests before committing them.

## Features

- Works with JavaScript files whose name ends with `-spec.js` or `.spec.js`.
- Works with TypeScript files whose name ends with `-spec.ts` or `.spec.ts`.
- Works with Cypress files whose name ends with `-cy.js` or `.cy.ts`.
- Highlights tests that use `fdescribe`, `fit` and `.only` syntax.
- Shows a warning icon in the gutter for each line covered by a focused test. (1)
- Shows a warning message when a focused test is hovered. (2)
- Shows a color in the overview ruler that makes it easy to see any focus tests in a big spec file. The color used for this is `editorWarning.foreground` which is defined by the theme. Currently this option is not configurable. (3)

![Features](/images/features.jpg)

## Demo

![Demo](/images/demo.gif)

## Support my work

If you find this extension useful and would like to support my work, you can [buy me a cup of tea](https://www.buymeacoffee.com/dzhavat). Thank you!

[![Buy Me A Cup Of Tea](/images/buy-me-a-cup-of-tea.png)](https://www.buymeacoffee.com/dzhavat)

## Credit

Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
