//引入express框架 
const express = require('express');

//创建博客展览首页路由
const admin = express.Router();

//模板文件中的外链资源 的相对路径是相对于浏览器中的地址请求的！比如页面中的css，js文件等,/代表绝对路径
//创建二级路由0
//渲染登录页面
admin.get('/login', require('./admin/loginPage'));

//实现登录功能
admin.post('/login', require('./admin/login'));

//创建用户列表路由
admin.get('/user', require('./admin/userPage'));

//实现退出功能
admin.get('/logout', require('./admin/logout'));

//创建用户编辑页面功能
admin.get('/user-edit', require('./admin/user-edit'));

//创建实现用户添加功能路由
admin.post('/user-edit', require('./admin/user-edit-fn'));

//修改用户信息功能路由
admin.post('/user-modify', require('./admin/user-modify'));

//删除用户路由
admin.get('/delete', require('./admin/user-delete'));

//文章列表页面路由
admin.get('/article', require('./admin/article'));

//文章编辑页面路由
admin.get('/article-edit', require('./admin/article-edit'));

//实现文章添加功能路由
admin.post('/article-add', require('./admin/article-add'));

//将路由对象作为模块成员进行导出
module.exports = admin;