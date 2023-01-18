# Difference Generator

### Tests and linter status:

[![Actions Status](https://github.com/AnastasiaKv/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/AnastasiaKv/frontend-project-lvl2/actions)
[![tests-check](https://github.com/AnastasiaKv/frontend-project-lvl2/actions/workflows/tests-check.yml/badge.svg)](https://github.com/AnastasiaKv/frontend-project-lvl2/actions/workflows/tests-check.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/ea3eaec9ef65407b12b3/maintainability)](https://codeclimate.com/github/AnastasiaKv/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/ea3eaec9ef65407b12b3/test_coverage)](https://codeclimate.com/github/AnastasiaKv/frontend-project-lvl2/test_coverage)

#### This is a program that recognizes the difference between two data structures (similar to the mechanism for automatically tracking changes in configuration files).

#### Utility features:
* Support for different input formats: yaml, json
* Report generation in plain text, style and json

## Setup

- Install packages `make install`
- Run tests `make test`
- Show test-coverage `make test-coverage`
- Run linter `make lint`
- Publish `make publish`
- Create a symlink in the global folder `npm link`

## Using

- Utility description & help `gendiff -h`
- Generate the difference of two files in the following formats:
  - stylish [default]: `gendiff filepath1 filepath2`
  - plain: `gendiff -f plain filepath1 filepath2`
  - json: `gendiff -f json filepath1 filepath2`

## Demos

- #### gendiff description & gendiff of json flat object
  [![asciicast](https://asciinema.org/a/477427.svg)](https://asciinema.org/a/477427)
- #### gendiff of yaml flat object
  [![asciicast](https://asciinema.org/a/478035.svg)](https://asciinema.org/a/478035)
- #### gendiff of complex object
  [![asciicast](https://asciinema.org/a/481359.svg)](https://asciinema.org/a/481359)
- #### gendiff of complex object with plain format
  [![asciicast](https://asciinema.org/a/481360.svg)](https://asciinema.org/a/481360)
- #### gendiff of complex object with json format
  [![asciicast](https://asciinema.org/a/481362.svg)](https://asciinema.org/a/481362)
