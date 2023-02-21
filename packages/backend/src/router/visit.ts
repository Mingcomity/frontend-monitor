import express from 'express'
import expressJWt from 'express-jwt'
import expressJoi from '@escook/express-joi'
import pageVisitHandler from '../router_handler/visit.js'
// 解析token
import config from '../config.js'
import {
	reg_addVisit_schema,
	req_addstay_schema,
	req_queryPopularPv,
	req_queryPopularUv,
	req_queryVisit_schema,
	req_queryall,
	req_querystay_schema,
} from '../schema/visit.js'

const router = express.Router()

// 用户页面访问
router.post(
	'/visit',
	expressJoi(reg_addVisit_schema),
	pageVisitHandler.addVisit,
)

// 查询访问记录PV
router.get(
	'/visit/pv',
	[
		expressJWt({ secret: config.jwtSecreKey, algorithms: ['HS256'] }),
		expressJoi(req_queryVisit_schema),
	],
	pageVisitHandler.queryVisitPv,
)
// 查询访问记录UV
router.get(
	'/visit/uv',
	[
		expressJWt({ secret: config.jwtSecreKey, algorithms: ['HS256'] }),
		expressJoi(req_queryVisit_schema),
	],
	pageVisitHandler.queryVisitUv,
)

// 查询PV最高页面
router.get(
	'/popular/pv',
	[
		expressJWt({ secret: config.jwtSecreKey, algorithms: ['HS256'] }),
		expressJoi(req_queryPopularPv),
	],
	pageVisitHandler.queryPopularPv,
)
// 查询UV最高页面
router.get(
	'/popular/uv',
	[
		expressJWt({ secret: config.jwtSecreKey, algorithms: ['HS256'] }),
		expressJoi(req_queryPopularUv),
	],
	pageVisitHandler.queryPopularUv,
)

// 用户停留时间
router.post('/stay', expressJoi(req_addstay_schema), pageVisitHandler.addstay)

// 查询用户停留记录
router.get(
	'/stay/:id',
	[
		expressJWt({ secret: config.jwtSecreKey, algorithms: ['HS256'] }),
		expressJoi(req_querystay_schema),
	],
	pageVisitHandler.querystay,
)

// 查询用户停留记录
router.get(
	'/',
	[
		expressJWt({ secret: config.jwtSecreKey, algorithms: ['HS256'] }),
		expressJoi(req_queryall),
	],
	pageVisitHandler.queryAll,
)

export default router
