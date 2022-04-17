import Router  from 'koa-router'
import SqlTestController from "../api/sqlTestController"

const router = new Router();
router.prefix('/api')
router.get("/sqlDemo", SqlTestController.demo)

export default router
