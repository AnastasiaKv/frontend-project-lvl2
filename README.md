### Tests and linter status:

[![Actions Status](https://github.com/AnastasiaKv/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/AnastasiaKv/frontend-project-lvl2/actions)
[![tests-check](https://github.com/AnastasiaKv/frontend-project-lvl2/actions/workflows/tests-check.yml/badge.svg)](https://github.com/AnastasiaKv/frontend-project-lvl2/actions/workflows/tests-check.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/ea3eaec9ef65407b12b3/maintainability)](https://codeclimate.com/github/AnastasiaKv/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/ea3eaec9ef65407b12b3/test_coverage)](https://codeclimate.com/github/AnastasiaKv/frontend-project-lvl2/test_coverage)

# frontend-project-lvl2

#### File's Data compare tool. Shows the differences between the objects.

## Setup

```sh
make install
```

## Run tests

```sh
make test
```

## Run

- ### Create a symlink in the global folder

```sh
npm link
```

- ### Use as utility

```sh
gendiff -h
gendiff filepath1 filepath2
gendiff -f plain filepath1 filepath2
gendiff -f json filepath1 filepath2
```

## Demo

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
