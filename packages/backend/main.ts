import express from 'express'
import dotenv from 'dotenv'

// cors 跨域
import cors from 'cors'

// 验证失败信息响应模块
import joi from 'joi'

// 用户路由模块
import userRouter from './src/router/user.js'

// 项目路由模块
import projectRouter from './src/router/project.js'

// 用户行为路由模块
import pageRouter from './src/router/visit.js'

// 性能数据路由模块
import perfRouter from './src/router/perf_data.js'

// 异常数据路由模块
import exceptionRouter from './src/router/exception_data.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT

// 跨域处理中间件
app.use(cors())

// 响应数据的中间件
app.use((req, res: any, next): any => {
	res.cc = function (err: any, code: number): any {
		res.send({
			// 状态
			code,
			message: err instanceof Error ? err.message : err,
		})
	}
	next()
})

// 解析x-www-form-urlencoded数据中间件
app.use(express.urlencoded({ extended: false }))

app.use('/user', userRouter)

app.use('/project', projectRouter)

app.use('/behavior', pageRouter)

app.use('/perf', perfRouter)

app.use('/exception', exceptionRouter)

// 错误中间件
app.use((err: any, req: any, res: any, _next: any): any => {
	// 数据验证错误
	if (err instanceof joi.ValidationError) { return res.cc(err, 400) }
	// 捕获身份认证失败
	if (err.name === 'UnauthorizedError') { return res.cc('身份认证失败！', 400) }
	// 未知错误
	res.cc(err, 500)
})

app.listen(PORT, () => {
	console.log('Server started')
})
