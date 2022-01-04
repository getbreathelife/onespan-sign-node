# onespan-sign-node

:warning: This library is still a WIP

Node.js library for the OneSpan Sign API

## API Documentation

Public-facing entities (interfaces, methods, etc.) must be documented properly using [TSDoc](https://tsdoc.org/) syntax. 
[eslint-plugin-tsdoc](https://www.npmjs.com/package/eslint-plugin-tsdoc) is used to catch improper syntax usage.

API documentation is extracted automatically using [@microsoft/api-extractor](https://api-extractor.com/) and a list of
supported syntax can be found on their [documentation page](https://api-extractor.com/pages/tsdoc/doc_comment_syntax/).

We use [@microsoft/api-documenter](https://www.npmjs.com/package/@microsoft/api-documenter) to generate documentation.
If you want to generate documentation locally, you may run the following command(s) in your terminal:

```shell
# Install dependencies if you haven't done so
yarn install
yarn docs
```

This script (re)builds the source code, extract the API documentation, then generate Markdown files for the documentation.

:information_source: You don't need to generate the Markdown documentations when opening your PR. It'll be done automatically when it's merged to `main`.

### Manually Testing using REPL

To start in repl mode run `yarn repl`. This will start an interactive repl, in which you can invoke and test the OneSpanSign class

**Example**

```sh
// Step 1: Start repl
yarn repl

// Step 2: Test code
> console.log(OneSpanSign)
```


