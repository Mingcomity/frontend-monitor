import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db/index.js'
import config from '../config.js'

interface Person {
	regUser(req: any, res: any): void
	login(req: any, res: any): void
	gaininfo(req: any, res: any): void
	alterinfo(req: any, res: any): void
	alterpwd(req: any, res: any): void
}

const user: Person = {
	regUser(req, res) {
		const userinfo: any = req.body
		const sql = 'SELECT * FROM user WHERE username=?'
		db.query(sql, userinfo.username, (err, results) => {
			if (err) {
				return res.cc(err, 500)
			}
			if (results.length > 0) {
				return res.cc('用户名被占用，请更换其它用户名！', 400)
			}
			userinfo.pwd = bcrypt.hashSync(userinfo.pwd, 10)
			const sql = 'INSERT INTO user SET ?'
			db.query(sql, userinfo, (err, results) => {
				if (err) {
					return res.cc(err, 500)
				}
				if (results.affectedRows !== 1) {
					return res.cc('注册新用户失败，请稍后再试！', 500)
				}
				res.cc('注册新用户成功！', 200)
			})
		})
	},
	login(req, res) {
		const userinfo: any = req.body
		const sql = 'SELECT * FROM user WHERE username=?'
		db.query(sql, userinfo.username, (err, results) => {
			if (err) {
				return res.cc(err, 500)
			}
			if (results.length !== 1) {
				return res.cc('用户不存在！', 400)
			}
			// 查询密码是否正确
			const compareResult: boolean = bcrypt.compareSync(
				userinfo.pwd,
				results[0].pwd,
			)
			if (!compareResult) {
				return res.cc('密码错误！', 400)
			}
			const user: Object = { ...results[0], pwd: '' }
			const tokenStr: string = jwt.sign(user, config.jwtSecreKey, {
				expiresIn: '12h',
			})
			res.send({
				code: 200,
				message: '登录成功！',
				token: `Bearer ${tokenStr}`,
			})
		})
	},
	gaininfo(req, res) {
		const sql = 'SELECT id, username FROM user WHERE id=? '
		db.query(sql, req.user.id, (err, results) => {
			if (err) {
				return res.cc(err, 500)
			}
			if (results.length !== 1) {
				return res.cc('获取失败！', 400)
			}
			res.send({
				code: 200,
				message: '获取用户基本信息成功！',
				data: results[0],
			})
		})
	},
	alterinfo(req, res) {
		const sql = 'UPDATE user SET username=? WHERE id=? '
		db.query(sql, [req.body.username, req.user.id], (err, results) => {
			if (err) {
				return res.cc(err, 500)
			}
			if (results.affectedRows !== 1) {
				return res.cc('修改用户名失败！', 400)
			}
			res.cc('修改用户名成功！', 200)
		})
	},
	alterpwd(req, res) {
		const userinfo = req.body
		const sql = 'SELECT pwd FROM user WHERE id=?'
		db.query(sql, req.user.id, (err, results) => {
			if (err) {
				return res.cc(err, 500)
			}
			if (results.length !== 1) {
				return res.cc('修改密码失败,未查询到该用户！', 400)
			}
			// 查询原密码是否正确
			const compareResult: boolean = bcrypt.compareSync(
				userinfo.oldPwd,
				results[0].pwd,
			)
			if (!compareResult) {
				return res.cc('原密码错误！', 400)
			}
			const sql = 'UPDATE user SET pwd=? WHERE id=?'
			userinfo.newPwd = bcrypt.hashSync(req.body.newPwd, 10)
			db.query(sql, [userinfo.newPwd, req.user.id], (err, results) => {
				if (err) {
					return res.cc(err, 500)
				}
				if (results.affectedRows !== 1) {
					return res.cc('修改密码失败！', 400)
				}
				return res.cc('修改密码成功！', 200)
			})
		})
	},
}
export default user
