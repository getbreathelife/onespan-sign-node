# How to contribute to this project

Glad you are here, any help is appreciated for this project!

## Bug reports

- Make sure that the bug is not already reported and open under [Issues](https://github.com/getbreathelife/onespan-sign-node/issues)

- If there isn't an open issue addressing the bug, open a new one. Make sure to include a title and include as much
  relevant information as you can in the description. Our bug report template should guide you through this process.
  :slightly_smiling_face:

## Submit changes

If you wish to contribute your code to this project. You should:

1. [Fork this repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository)
2. Make your changes
3. [Submit a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork)
   to this repository

Before submitting your pull request, make sure to do the following (where applicable):

- Document APIs
- Write unit tests

When opening your PR, please also make sure to:

- Clearly explain the purpose of this PR. Or in case of addressing an issue, link the issue to your PR
- Explain what you did in your changes

## Writing Documentation

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

This command (re)builds the source code, extract the API documentation, then generate Markdown files for the documentation.

:information_source: You don't need to generate the Markdown documentations when opening your PR. It'll be done automatically when it's merged to `main`.

## Coding conventions

Most conventions are enforced using [Prettier](https://prettier.io/) and [Eslint](https://eslint.org/). Please make sure
that your IDE is configured to use those packages and their respective configs to enforce the conventions.

---

Thank you for your contribution!
