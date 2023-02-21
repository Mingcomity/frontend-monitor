import joi from 'joi'

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */

// 用户名验证规则
const username = joi.string().max(255).required()

// 密码验证规则
const pwd: any = joi.string().max(255).required()

const reg_register_schema = {
	body: {
		username,
		pwd,
	},
}

const reg_login_schema = {
	body: {
		username,
		pwd,
	},
}

const req_alterinfo_schema = {
	body: {
		username,
	},
}

const req_alterpwd_schema = {
	body: {
		oldPwd: pwd,
		newPwd: pwd,
	},
}

export {
	reg_register_schema,
	reg_login_schema,
	req_alterinfo_schema,
	req_alterpwd_schema,
}
