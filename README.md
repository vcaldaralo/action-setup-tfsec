# action-setup-tfsec

GitHub Action for install tfsec cli

## Inputs

### Required

`version` - default `latest`

# Example workflow

Never use `main` branch in your github workflows!

```yaml
name: Setup tfsec

on: pull_request

jobs:
  helm-suite:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2

    # - name: myOtherJob1
    #   run:

      - name: "Setup terraform docs"
        uses: vcaldaralo/action-setup-tfsec@master
        with:
          version: "v0.58.14"
```
