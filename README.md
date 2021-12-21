# onespan-sign-node

:warning: This library is still a WIP

Node.js library for the OneSpan Sign API

## API Documentation

Public-facing entities (interfaces, methods, etc.) must be documented properly using [TSDoc](https://tsdoc.org/) syntax. 
[eslint-plugin-tsdoc](https://www.npmjs.com/package/eslint-plugin-tsdoc) is used to catch improper syntax usage.

API documentation is extracted automatically using [@microsoft/api-extractor](https://api-extractor.com/) and a list of
supported syntax can be found on their [documentation page](https://api-extractor.com/pages/tsdoc/doc_comment_syntax/).

We use [@microsoft/api-documenter](https://www.npmjs.com/package/@microsoft/api-documenter) to generate documentation.
To generate documentation locally, you may run the provided script in your terminal:

```shell
# From project root
./bin/generate-docs.sh
```

This script (re)builds the source code, extract the API documentation, then generate Markdown files for the documentation.
