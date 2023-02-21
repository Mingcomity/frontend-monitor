import db from '../db/index.js'
import hash from '../randomHash.js'

interface Person {
	addProject(req: any, res: any): void
	queryProject(req: any, res: any): void
	alterProject(req: any, res: any): void
}

const project: Person = {
	addProject(req, res) {
		const sql = 'SELECT * FROM project WHERE name=? AND user=? '
		db.query(sql, [req.body.name, req.user.id], (err, results) => {
			if (err) {
				return res.cc(err, 500)
			}
			if (results.length === 1) {
				return res.cc('项目名重复！', 400)
			}
			const sql = 'INSERT INTO project SET ? '
			db.query(
				sql,
				{
					user: req.user.id,
					name: req.body.name,
					key: hash(),
				},
				(err, results) => {
					if (err) {
						return res.cc(err, 500)
					}
					if (results.affectedRows !== 1) {
						return res.cc('添加项目信息失败！', 400)
					}
					res.cc('添加项目信息成功！', 200)
				},
			)
		})
	},
	queryProject(req, res) {
		const sql = 'SELECT id,name,`key` FROM project WHERE user=?'
		db.query(sql, req.user.id, (err, results) => {
			if (err) {
				return res.cc(err, 500)
			}
			if (results.length === 0) {
				return res.cc('暂无项目信息！', 400)
			}
			res.send({
				code: 200,
				message: '获取项目信息成功！',
				data: results,
			})
		})
	},
	alterProject(req, res) {
		const sql = 'SELECT * FROM project WHERE name=? AND user=?'
		db.query(sql, [req.body.name, req.user.id], (err, results) => {
			if (err) {
				return res.cc(err, 500)
			}
			if (results.length === 1) {
				return res.cc('新项目名称存在与旧项目名称或其它项目名称重复！', 400)
			}
			const sql = 'UPDATE project SET name=? WHERE id=? AND user=? '
			db.query(
				sql,
				[req.body.name, req.body.id, req.user.id],
				(err, results) => {
					if (err) {
						return res.cc(err, 500)
					}
					if (results.affectedRows !== 1) {
						return res.cc('更新项目名称失败！', 400)
					}
					res.cc('更新项目名称成功！', 200)
				},
			)
		})
	},
}
export default project
