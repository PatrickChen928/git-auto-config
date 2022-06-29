import { cac } from 'cac'
import { version } from '../package.json'
import {
  execGitCommand,
  storeProxyConfig,
  parseAuthor,
  showProxyConfig,
  delGitConfig,
  execProxyConfig
} from '.'

const cli = cac('gitp')

// start proxy global
cli
  .command('proxy', 'proxy user config')
  .alias('p')
  .option('-r, --rule <rule>', 'proxy rule (string match repository url)')
  .option('-n, --name <name>', 'proxy name')
  .option('-e, --email <email>', 'proxy email')
  .option('-a, --author <author>', 'proxy name and email (xxx <xxx@xx.com>)')
  .action(args => {
    const config = {
      rule: args.r,
      name: args.n,
      email: args.e
    }
    if (args.author) {
      const info = parseAuthor(args.author)
      if (info) {
        config.name = info.name
        config.email = info.email
      }
    }
    storeProxyConfig(config)
  })

// set current project by proxy config
cli
  .command('set', 'set current project by proxy config')
  .alias('s')
  .action(() => {
    execProxyConfig()
  })

// show proxy config
cli
  .command('proxy-show', 'show your proxy config')
  .alias('ps')
  .option('-l, --list', 'show all proxy config', { default: true })
  .option('-r, --rule <rule>', 'show <rule> proxy config')
  .action(args => {
    showProxyConfig(args.r)
  })

// delete proxy config
cli
  .command('proxy-delete [...rules]', 'delete your proxy config')
  .alias('pd')
  .option('-a, --all', 'delete all proxy config', { default: false })
  .action((rules, args) => {
    delGitConfig(rules, args.a)
  })

// exec git command
cli.on('command:*', () => {
  execGitCommand(cli.rawArgs.slice(2))
})

cli.help()
cli.version(version)

cli.parse()
