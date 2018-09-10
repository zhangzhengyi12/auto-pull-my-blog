const bunyan = require('bunyan')
const nowTime = require('./util.js').nowTime

const log = bunyan.createLogger({
  name: 'autoPullLog',
  streams: [
    {
      path: './app.log'
    }
  ]
})
const spawn = require('child_process').spawn
const pullTime = 1000 * 5
let timer
log.info('AUTO SERVER STATR  :' + nowTime())

autoStart()

function autoStart() {
  cloneBlogForGit()
  timer = setInterval(pullBlogForGit, pullTime)
}

function cloneBlogForGit() {
  log.info(`Start Once clone Blog :${nowTime()}`)
  const clone = spawn('git', [
    'clone',
    '-b',
    'master',
    'git@github.com:zhangzhengyi12/zhangzhengyi12.github.io.git',
    'blog'
  ])
}

function pullBlogForGit() {
  log.info(`Start Once Pull Blog :${nowTime()}`)
  const pull = spawn('git', ['pull', 'cwd', './blog'])
  pull.stdout.on('data', data => {
    log.info(`Pull Data :${data}: ${nowTime()}`)
  })
  pull.stdout.on('close', data => {
    log.info(`Pull result :${data}: ${nowTime()}`)
  })
}

module.exports = { timer }
