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

// 请求ip验证规则
const ip = joi.string().max(255).required()

// 请求页面来源URL
const from = joi.string().required()

// 查询id
const id = joi.number().min(1).required()

const reg_addVisit_schema = {
	body: {
		key,
		from,
	},
}

const req_addstay_schema = {
	body: {
		key,
		from,
		duration: id,
	},
}

const req_queryVisit_schema = {
	query: {
		id,
		day: joi.number(),
	},
}

const req_querystay_schema = {
	params: {
		id,
	},
}

const req_queryall = {
	query: {
		id,
	},
}

const req_queryPopularUv = {
	query: {
		id,
	},
}

const req_queryPopularPv = {
	query: {
		id,
	},
}

export {
	reg_addVisit_schema,
	req_addstay_schema,
	req_queryVisit_schema,
	req_querystay_schema,
	req_queryall,
	req_queryPopularPv,
	req_queryPopularUv,
}
