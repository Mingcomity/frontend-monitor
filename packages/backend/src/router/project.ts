import express from 'express'
import expressJWt from 'express-jwt'
import expressJoi from '@escook/express-joi'
import projectHandler from '../router_handler/project.js'
// 解析token
import config from '../config.js'

import {
	reg_addProject_schema,
	req_alterProject_schema,
} from '../schema/project.js'

const router = express.Router()

// 添加项目
router.post(
	'/',
	[
		expressJWt({ secret: config.jwtSecreKey, algorithms: ['HS256'] }),
		expressJoi(reg_addProject_schema),
	],
	projectHandler.addProject,
)

// 获取项目信息
router.get(
	'/',
	[expressJWt({ secret: config.jwtSecreKey, algorithms: ['HS256'] })],
	projectHandler.queryProject,
)

// 修改项目信息
router.put(
	'/',
	[
		expressJWt({ secret: config.jwtSecreKey, algorithms: ['HS256'] }),
		expressJoi(req_alterProject_schema),
	],
	projectHandler.alterProject,
)

export default router
