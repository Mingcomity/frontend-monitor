import express from 'express'
import expressJWt from 'express-jwt'
import expressJoi from '@escook/express-joi'
import perfDataHandler from '../router_handler/perf_data.js'
// 解析token
import config from '../config.js'

import {
	reg_addperfData_schema,
	req_querySegPerf_schema,
	req_queryperfData_schema,
} from '../schema/perf_data.js'

const router = express.Router()

// 添加性能数据
router.post(
	'/',
	expressJoi(reg_addperfData_schema),
	perfDataHandler.addperfData,
)

// 查询性能数据
router.get(
	'/',
	[
		expressJWt({ secret: config.jwtSecreKey, algorithms: ['HS256'] }),
		expressJoi(req_queryperfData_schema),
	],
	perfDataHandler.queryperfData,
)

// 查询性能数据分段
router.get(
	'/seg',
	[
		expressJWt({ secret: config.jwtSecreKey, algorithms: ['HS256'] }),
		expressJoi(req_querySegPerf_schema),
	],
	perfDataHandler.querySegPerf,
)

export default router
