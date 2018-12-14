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
const exec = require('child_process').exec
const pullTime = 1000 * 60 * 10
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
const rmall = exec('rm -rf blog')
rmall.stdout.on("close",()=>{
  cloneBlogForGit()
})
}

module.exports = { timer }

