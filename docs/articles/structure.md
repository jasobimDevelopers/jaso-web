# 项目目录

> 最好可以用vue-cli初始化一个空目录对比一下

```
build                                                               vue-cli初始化
config                                                              vue-cli初始化
docs                                                                docsify github搜一下看文档
src
  api                                                               接口路由配置都放在这里面
  assets                                                            一些资源文件，比如图片
  components                                                        项目的基础共用组建
  filters                                                           项目里面的filters，也有些静态数据配置
  icons                                                             图标，主要用于svg-icon组件
  lang                                                              国际化配置，刚开始每个页面都有用，但后面时间问题，就没有配置了，后面看需求更改
  router                                                            路由配置，这里需要注意，目前改成后端返回路由让前端配置，可以查看Sidebar怎么配置的
  store                                                             数据状态管理
  styles                                                            项目样式，有重写element-ui的一些变量
  utils                                                             一些工具函数，其中有些用在了mixin里面
  views                                                             页面组件
  App.vue                                                           根组件
  main.js                                                           入口函数
  permission.js                                                     权限控制
```

这里建议大概明白每个文件的用途就可以了，可根据自己需求更改。看了后，要明白这个项目大概是由这些工具构成：

Vue + Vue-Router + Vuex + element-ui + axios + vue-i18n

其他package.json里面的工具都是由一些需求添加的，比如md5,qrcode,g2等等。
