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
const type = joi.number().valid(1, 2, 3, 4, 5, 6, 7).required()

// 请求页面来源URL
const from = joi.string().required()

// 查询id
const value = joi.number().required()

const reg_addperfData_schema = {
	body: {
		key,
		type,
		from,
		value,
	},
}

const req_queryperfData_schema = {
	query: {
		id: joi.number().required(),
		type,
		page: joi.number().required(),
		limit: joi.number().required(),
	},
}

const req_querySegPerf_schema = {
	query: {
		id: joi.number().required(),
		type,
		day: joi.number(),
		seg: joi.required(),
	},
}

export {
	reg_addperfData_schema,
	req_queryperfData_schema,
	req_querySegPerf_schema,
}
