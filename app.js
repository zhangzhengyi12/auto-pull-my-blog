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
const pullTime = 60 * 1000 * 60
log.info('AUTO SERVER STATR  :' + nowTime())

autoStart()

function autoStart() {
  pullBlogForGit()
  const timer = setInterval(pullBlogForGit, pullTime)
}

function pullBlogForGit() {
  log.info(`Start Once Pull Blog :${nowTime()}`)
  const clone = spawn('git', [
    'clone',
    '-b',
    'master',
    'git@github.com:zhangzhengyi12/zhangzhengyi12.github.io.git',
    'blog'
  ])
  clone.stdout.on('data', data => {
    log.info(`Pull Data :${data}: ${nowTime()}`)
  })
  clone.stdout.on('close', data => {
    log.info(`Pull result :${data}: ${nowTime()}`)
  })
}
