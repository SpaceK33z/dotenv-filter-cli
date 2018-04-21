# dotenv-filter-cli

This is a very small CLI tool to filter environment variables from `process.env`.

You can kinda see this as the reverse of [dotenv](https://github.com/motdotla/dotenv); it processes all your current env variables, allows you to filter on them and outputs it as if it were a dotenv file.

My specific use case is that when I run Zeit [Now](https://github.com/zeit/now-cli) in a CI tool like Travis, I want to give it only the environment variables that start with `BACKEND_`, like `BACKEND_SECRET`. The only alternative I saw is to pass every environment variable with, `-e BACKEND_SECRET` etc. That is not maintainable when you have 10+ variables.

Install with `npm i -g dotenv-filter-cli`

## Usages

```bash
$ dotenv-filter --prefix=BACKEND_
BACKEND_SECRET="xxx"
BACKEND_APP_URL="https://example.com"
```

Or save to a file directly:

```bash
$ dotenv-filter --prefix=BACKEND_ > .env
```

Or if your naming scheme uses consistent suffixes instead of prefixes:

```bash
$ dotenv-filter --suffix=_APP
SECRET_APP="xxx"
```

Or maybe you want to filter on multiple suffixes:

```bash
$ dotenv-filter --suffix=_APP --suffix=MAIL
SECRET_APP="xxx"
FROM_MAIL="kees@example.com"
```

Example usage with Zeit Now (note: this is not specific in any way to Zeit):

```bash
$ dotenv-filter --prefix=BACKEND > .env.now
$ now --dotenv .env.now
```