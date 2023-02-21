import joi from 'joi'

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */

// 项目名验证规则
const name = joi.string().max(255).required()

// id验证规则
const id = joi.number().required()

const reg_addProject_schema = {
	body: {
		name,
	},
}

const req_alterProject_schema = {
	body: {
		name,
		id,
	},
}

export { reg_addProject_schema, req_alterProject_schema }
