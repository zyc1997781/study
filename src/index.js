// const Koa = require('koa')
import Koa from 'koa';
import path from 'path'
// const path = require('path')// nodejs  path模块
const jsonUtil = require('koa-json');
const koaBody = require('koa-body')
const helmet = require('koa-helmet')// 配置安全头部header信息
const statics = require('koa-static')//对于静态文件的访问服务  静态资源服务器
import cors from '@koa/cors';
import compose from 'koa-compose'// 整合中间件
import compress from "koa-compress"

import router from "./routes"
const isDevMode = process.env.NODE_ENV === "production" ? false : true

const app = new Koa();
const middleware = compose([
    koaBody(),
    statics(path.join(__dirname, '../public')),
    cors(),
    jsonUtil({}),
    helmet(),
])

if(!isDevMode){
    app.use(compress())
}
app.use(middleware);
app.use(router())// 使用combineRoutes 合并路由之后  需要传入的是router()   传入router则是合并的路由方法，并没有真执行所需要的路由，所以当前路由是404状态
app.listen(3000);
