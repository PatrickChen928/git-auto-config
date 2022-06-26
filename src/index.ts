import { execSync as exec, spawnSync as spawn } from 'child_process'
import fs from 'fs'
import path from 'path'
import * as logger from './logger'

export interface ProxyConfig {
  rule: string
  name: string
  email: string
}

const USER_HOME = process.env.HOME || process.env.USERPROFILE
const FILE_NAME = '.git-auto-config.config'

function getRepositoryUrl() {
  return exec('git config --get remote.origin.url').toString().trim()
}

function matchRepository(repository: string, rule: string) {
  return repository.includes(rule)
}

function writeFile(proxyConfig: ProxyConfig[]) {
  fs.writeFileSync(path.resolve(USER_HOME, FILE_NAME), JSON.stringify(proxyConfig))
}

export function getGitConfig(): ProxyConfig[] {
  if (fs.existsSync(path.resolve(USER_HOME, FILE_NAME)))
    return JSON.parse(fs.readFileSync(path.resolve(USER_HOME, FILE_NAME), 'utf-8'))
  else return []
}

export function showProxyConfig(rule?: string) {
  const proxyConfig = getGitConfig()
  if (!rule) {
    logger.info('\n' + JSON.stringify(proxyConfig, null, 2))
  }
  else {
    const config = proxyConfig.find(item => item.rule === rule)
    if (config)
      logger.info('\n' + JSON.stringify(config, null, 2))
    else logger.warn(`no proxy config found for rule: ${rule}`)
  }
}

/**
 * 解析用户名和邮箱
 */
export function parseAuthor(author: string) {
  try {
    const [name, email] = author.split('<')
    return {
      name: name.trim(),
      email: email.replace('>', '').trim()
    }
  }
  catch (e) {
    logger.error('parse author error, ensure your author is valid: \'xxxx <xxxx@xx.com>\'')
  }
}

export function storeProxyConfig(options: ProxyConfig, immediately = false) {
  if (!options.rule || (!options.name && !options.email)) {
    logger.error('Invalid options. rule is required. And name or email is required.')
    return
  }
  const proxyConfig = getGitConfig()
  const exsitConfig = proxyConfig.find(config => config.rule === options.rule)
  if (exsitConfig) {
    exsitConfig.email = options.email || exsitConfig.email
    exsitConfig.name = options.name || exsitConfig.name
  }
  else {
    proxyConfig.push({
      rule: options.rule,
      name: options.name,
      email: options.email
    })
  }
  writeFile(proxyConfig)
  if (immediately)
    execProxyConfig(proxyConfig)
}

export function delGitConfig(rules: string[], all = false) {
  if (all)
    writeFile([])

  const proxyConfig = getGitConfig()
  const newProxyConfig = proxyConfig.filter(config => !rules.includes(config.rule))
  if (newProxyConfig.length < proxyConfig.length)
    writeFile(newProxyConfig)

  logger.info('delete success')
}

export function execGitCommand(args: string[]) {
  spawn('git', args, { stdio: 'inherit' })

  if (args.length && args[0] === 'clone')
    execProxyConfig()
}

export function execProxyConfig(proxyConfig?: ProxyConfig[], repository?: string) {
  proxyConfig = proxyConfig && proxyConfig.length ? proxyConfig : getGitConfig()
  repository = repository || getRepositoryUrl()

  if (proxyConfig && proxyConfig.length > 0) {
    for (const { rule, name, email } of proxyConfig) {
      if (matchRepository(repository, rule)) {
        if (name)
          exec(`git config --local user.name '${name}'`)
        else
          logger.warn(' there has not set user.name for this repository, will use the global one.')
        if (email)
          exec(`git config --local user.email '${email}'`)
        else
          logger.warn(' there has not set user.email for this repository, will use the global one.')
        return
      }
    }
  }
}
