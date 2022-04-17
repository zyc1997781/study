// const combineRoutes = require('koa-combine-routers');// 整合koa的路由
import combineRoutes from "koa-combine-routers"
import demoRouter from "./route/demoRouter"
import sqlTestRouter from "./route/sqlTestRouter"

// export default demoRouter.routes()
export default  combineRoutes(demoRouter,sqlTestRouter)
