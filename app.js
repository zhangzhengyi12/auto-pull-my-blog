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
  const cd = spawn('cd', ['blog'])
  cd.stdout.on('close', () => {
    log.info(`cd close : ${nowTime()}`)
    const clone = spawn('git', ['pull'])
    clone.stdout.on('data', data => {
      log.info(`Pull Data :${data}: ${nowTime()}`)
    })
    clone.stdout.on('close', data => {
      log.info(`Pull result :${data}: ${nowTime()}`)
    })
  })
}

module.exports = { timer }
