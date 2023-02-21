import db from '../db/index.js'
import date from '../date.js'

interface Person {
	addVisit(req: any, res: any): void
	queryVisitPv(req: any, res: any): void
	queryVisitUv(req: any, res: any): void
	queryPopularPv(req: any, res: any): void
	queryPopularUv(req: any, res: any): void
	addstay(req: any, res: any): void
	querystay(req: any, res: any): void
	queryAll(req: any, res: any): void
}

const pageVisit: Person = {
	addVisit(req, res) {
		const sql = 'SELECT id FROM project WHERE `key`=?'
		db.query(sql, req.body.key, (err, results_1) => {
			if (err) {
				return res.cc(err, 500)
			}
			if (results_1.length !== 1) {
				return res.cc('key值错误等!', 400)
			}

			const sql
				= 'SELECT count FROM visit_history WHERE day=? AND proj=? AND ip=? AND `from`=?'
			db.query(
				sql,
				[date(false), results_1[0].id, req.ip, req.body.from],
				(err, results_2) => {
					if (err) {
						return res.cc(err, 500)
					}
					if (results_2.length === 0) {
						const sql = 'INSERT INTO visit_history SET ?'
						db.query(
							sql,
							{
								proj: results_1[0].id,
								from: req.body.from,
								ip: req.ip,
								day: date(false),
								count: 1,
							},
							(err, results) => {
								if (err) {
									return res.cc(err, 500)
								}
								if (results.affectedRows !== 1) {
									return res.cc('插入失败！', 400)
								}
								res.cc('插入成功！', 200)
							},
						)
					} else {
						const sql
							= 'UPDATE visit_history SET count=? WHERE day=? AND proj=? AND ip=? AND `from`=? '
						db.query(
							sql,
							[
								++results_2[0].count,
								date(false),
								results_1[0].id,
								req.ip,
								req.body.from,
							],
							(err, results) => {
								if (err) {
									return res.cc(err, 500)
								}
								if (results.affectedRows !== 1) {
									return res.cc('插入失败！', 400)
								}
								res.cc('插入成功！', 200)
							},
						)
					}
				},
			)
		})
	},
	queryVisitPv(req, res) {
		const time = new Date()
		const startTime = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate() - 6}`
		const endTime = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`
		db.query('SELECT `day`,SUM(count) AS pv FROM visit_history WHERE `day` BETWEEN ? AND ? AND proj=? GROUP BY `day` ORDER BY `day` DESC',
			[startTime, endTime, req.query.id],
			(err, result) => {
				if (err) {
					return res.cc(err, 500)
				}
				const arr = []
				for (let t = new Date(startTime); t <= new Date(endTime); t = new Date(t.setDate(t.getDate() + 1))) {
					const s = result.find((d: any) => `${d.day.getFullYear()}-${d.day.getMonth() + 1}-${d.day.getDate() + 1}` === `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate() + 1}`)
					if (s) {
						arr.push(s.pv)
					} else {
						arr.push(0)
					}
				}
				res.send({
					code: 200,
					message: '查询PV成功！',
					data: arr,
				})
			})
	},
	queryVisitUv(req, res) {
		const time = new Date()
		const startTime = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate() - 6}`
		const endTime = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`
		db.query('SELECT `day`,count(*) AS uv FROM visit_history WHERE `day` BETWEEN ? AND ? AND proj=? GROUP BY `day` ORDER BY `day` DESC',
			[startTime, endTime, req.query.id],
			(err, result) => {
				if (err) {
					return res.cc(err, 500)
				}
				const arr = []
				for (let t = new Date(startTime); t <= new Date(endTime); t = new Date(t.setDate(t.getDate() + 1))) {
					const s = result.find((d: any) => `${d.day.getFullYear()}-${d.day.getMonth() + 1}-${d.day.getDate() + 1}` === `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate() + 1}`)
					if (s) {
						arr.push(s.uv)
					} else {
						arr.push(0)
					}
				}
				res.send({
					code: 200,
					message: '查询PV成功！',
					data: arr,
				})
			})
	},
	queryPopularPv(req, res) {
		const time = new Date()
		const startTime = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate() - 6}`
		const endTime = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate() + 1}`
		db.query('SELECT `from`,SUM(count) AS pv FROM visit_history WHERE `day` BETWEEN ? AND ? AND proj=? GROUP BY `from` ORDER BY pv DESC',
			[startTime, endTime, req.query.id], (err, results) => {
				if (err) {
					return res.cc(err, 500)
				}
				if (results.length === 0) {
					return res.cc('暂无数据！', 400)
				}
				res.send({
					code: 200,
					message: '查询PV成功！',
					data: results,
				})
			})
	},
	queryPopularUv(req, res) {
		const time = new Date()
		const startTime = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate() - 6}`
		const endTime = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate() + 1}`
		db.query('SELECT `from`,count(*) AS uv FROM visit_history WHERE `day` BETWEEN ? AND ? AND proj=? GROUP BY `from` ORDER BY uv DESC',
			[startTime, endTime, req.query.id], (err, results) => {
				if (err) {
					return res.cc(err, 500)
				}
				if (results.length === 0) {
					return res.cc('暂无数据！', 400)
				}
				res.send({
					code: 200,
					message: '查询UV成功！',
					data: results,
				})
			})
	},
	addstay(req, res) {
		const sql = 'SELECT id FROM project WHERE `key`=?'
		db.query(sql, req.body.key, (err, results) => {
			if (err) {
				return res.cc(err, 500)
			}
			if (results.length !== 1) {
				return res.cc('key值错误等!', 400)
			}
			const sql = 'INSERT INTO page_visit SET ? '
			const stay: {
				proj: number
				from: string
				time: any
				duration: number
			} = {
				proj: results[0].id,
				from: req.body.from,
				time: date(true),
				duration: req.body.duration,
			}
			db.query(sql, stay, (err, results) => {
				if (err) {
					return res.cc(err, 500)
				}
				if (results.affectedRows !== 1) {
					return res.cc('插入失败！', 400)
				}
				res.cc('插入成功！', 200)
			})
		})
	},
	querystay(req, res) {
		if (parseInt(req.query.list) === 1) {
			const max = req.query.limit || 20
			db.query('SELECT `from`, AVG(`duration`) AS duration FROM page_visit WHERE proj=? GROUP BY `from` ORDER BY duration DESC LIMIT ?',
				[req.params.id, max],
				(err, results) => {
					if (err) {
						return res.cc(err, 500)
					}
					if (results.length === 0) {
						return res.cc('暂无数据！', 400)
					}
					res.send({
						code: 200,
						message: '查询停留记录成功！',
						data: results,
					})
				})
		} else {
			db.query('SELECT AVG(`duration`) AS duration FROM page_visit WHERE proj=? ORDER BY duration DESC',
				req.params.id,
				(err, results) => {
					if (err) {
						return res.cc(err, 500)
					}
					if (results.length === 0) {
						return res.cc('暂无数据！', 400)
					}
					res.send({
						code: 200,
						message: '查询停留记录成功！',
						data: results[0].duration,
					})
				})
		}
	},
	queryAll(req, res) {
		const id = req.query.id
		db.query('SELECT SUM(count) AS pv FROM visit_history WHERE proj=?', [id], (err, r1) => {
			if (err) {
				return res.cc(err, 500)
			}
			const pv = r1[0].pv
			db.query('SELECT count(*) AS uv FROM visit_history WHERE proj=?', [id], (err, r2) => {
				if (err) {
					return res.cc(err, 500)
				}
				const uv = r2[0].uv
				db.query('SELECT AVG(duration) AS stay FROM page_visit WHERE proj=?', [id], (err, r3) => {
					if (err) {
						return res.cc(err, 500)
					}
					const stay = r3[0].stay
					res.send({
						code: 200,
						message: '查询停留记录成功！',
						data: { pv, uv, stay },
					})
				})
			})
		})
	},
}

export default pageVisit
