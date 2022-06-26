import colors from 'picocolors'

const LOG_NAME = '[git-auto-config]'

export function info(msg: string) {
  console.log(colors.cyan(colors.bold(`${LOG_NAME} `)) + colors.green(msg))
}

export function warn(msg: string) {
  console.log(colors.yellow(colors.bold(`${LOG_NAME} WARNING: `)) + msg)
}

export function error(msg: string) {
  console.log(colors.red(colors.bold(`${LOG_NAME} ERROR: `)) + msg)
}
