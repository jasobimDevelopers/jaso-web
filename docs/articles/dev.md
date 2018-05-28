# 开发流程

> 这里把项目本地开发和服务器部署讲一下

1.目前项目采用前后端分离开发，服务器jasobim.com的8080作为后端测试服，3000端口作为客户端的[测试端口](http://www.jasobim.com:3000)。
跨域的解决方案则是本地作代理服务，查看config/index.js的proxyTable配置，服务器端用nginx做代理，以/api开头的路由转向后端服务，其他则
由前端路由控制。

2.前端是由[vue-cli](https://github.com/vuejs/vue-cli)初始化开发的，关于权限路由访问的实现，借鉴了项目[vue-element-admin](vue-element-admin)，
是一个不错的解决方案，如果看明白了它这个项目，那么本项目也应该很容易理解。

3.上面的理解后，本地开发npm run dev。关于本项目的设计图，放在·E:\work\Docs\pc设计·本地目录里,sketch导出的设计网页。

4.开发完成后，提交代码到git，git commit的时候最好用npm run commit，这里有用commit message的工具，可以让message更加规范化，简单易懂。

5.服务器部署，目前是手动部署的，链接服务器，项目放在D盘里面，npm run build就可以了。
