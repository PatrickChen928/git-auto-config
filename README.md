# git-auto-config

Auto config diffient user.name and user.email in different git repos.

> ✨✨✨ Don't worry about forgetting to switch git info again!!!.

## Why?

There is always a need to use a different user.name and user.email in different git repos. For example, your company's repo want to use your company's username and email, but your personal repo want to use your personal name and email.

## How?

Firstly, you need to config your rules by `gitp p -r xxx -a xxx`. Then, when you clone a repo by `gitp clone`, it will use your rules and auto to exec `git config --local xxx`.

## Usage

### Install

```shell
npm install -g git-auto-config

# or

yarn global add git-auto-config

# or

pnpm install -g git-auto-config
```

### config your git rules

`only config once`

```shell
# match git repository url contains `github`
gitp p -r "github" -a "name1 <email1@xx.com>"

# match git repository url contains `gitlab`
gitp p -r "gitlab" -a "name2 <email2@xx.com>"
```

### clone your git repository

```shell
# Then this repository will be auto config --local user.name and user.email use `name1 <email1@xx.com>`
gitp clone https://github.com/xxx/xxxx.git

# Then this repository will be auto config --local user.name and user.email use `name2 <email2@xx.com>`
gitp clone https://gitlab.com/xxx/xxxx.git
```

## gitp commands

### proxy | p

add git proxy rules

- `-r, --rule <rule>`
- `-n, --name <name>`
- `-e, --email <email>`
- `-a, --author <author>`

**e.g.**

```shell
gitp p -r github -a "name1 <email1@xx.com>"

# or

gitp p -r github -n name1 -e email1@xx.com
```

### proxy-show | ps

show your config

- `-l, --list`
- `-r, --rule <rule>`

**e.g.**

```shell

# show rule `github` config
gitp ps -r github

# show all
gitp ps
```

### proxy-delete | pd

delete your config

- `[...rules]`
- `-a, --all`

**e.g.**

```shell

# delete rule `github` and `gitlab`
gitp pd github gitlab

# delete all
gitp pd -a
```

### -v | -h

**e.g.**

```shell
gitp -v

gitp -h

gitp p -h

gitp ps -h

gitp pd -h
```

## git commands

Of course, you can continue use all the git command by `gitp xxx`, that's the same with `git`.

## LICENSE

MIT License © 2022-PRESENT [ChpShy](https://github.com/ChpShy)
