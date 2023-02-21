import joi from 'joi'

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */

// 项目标识符验证规则
const key = joi.string().max(255).required()

// 性能类型验证规则
const type = joi.number().valid(1, 2, 3, 4).required()

// 异常信息
const msg = joi.string().max(511).required()

// 异常位置
const position = joi.string().max(255).required()
// 查询id
const value = joi.number().required()

const reg_addexceptionData_schema = {
	body: {
		key,
		type,
		msg,
		position,
	},
}

const req_queryexceptionData_schema = {
	query: {
		id: joi.number().required(),
		type: joi.number().valid(1, 2, 3, 4),
		page: joi.number(),
		limit: joi.number(),
	},
}

const req_queryRecentExceptionData_schema = {
	query: {
		id: joi.number().required(),
		type: joi.number().valid(1, 2, 3, 4),
	},
}

export { reg_addexceptionData_schema, req_queryexceptionData_schema, req_queryRecentExceptionData_schema }
