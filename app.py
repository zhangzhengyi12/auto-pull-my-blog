import os
import threading
import logging

logging.basicConfig(filemode='w', filename='app.log')


class blog:
    blogURL = 'git@github.com:zhangzhengyi12/zhangzhengyi12.github.io.git'
    blogBranch = 'master'
    fileName = 'blog'
    time = 60 * 10

    def __init__(self):
        cm = 'git clone -b ' + self.blogBranch + ' ' + \
            {self.blogURL} + '  ' + {self.fileName}
        os.system(cm)

    def start(self):
        self.refresh()
        threading.Timer(self.start, self.refresh)

    def refresh(self):
        os.chdir('./blog')
        os.system('git pull')


myBlog = blog()
myBlog.start()
