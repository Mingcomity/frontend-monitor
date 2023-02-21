import db from '../db/index.js'

interface Person {
	addperfData(req: any, res: any): void
	queryperfData(req: any, res: any): void
	querySegPerf(req: any, res: any): void
}

const project: Person = {
	addperfData(req, res) {
		const sql = 'SELECT id FROM project WHERE `key`=?'
		db.query(sql, req.body.key, (err, results) => {
			if (err) {
				return res.cc(err, 500)
			}
			if (results.length !== 1) {
				return res.cc('key值错误等!', 400)
			}
			const sql = 'INSERT INTO perf_data SET ?'
			db.query(sql, {
				type: req.body.type,
				proj: results[0].id,
				from: req.body.from,
				time: new Date(),
				value: req.body.value,
			}, (err, results) => {
				if (err) {
					return res.cc(err, 500)
				}
				if (results.affectedRows !== 1) {
					return res.cc('插入失败!', 400)
				}
				res.cc('插入成功！', 200)
			})
		})
	},
	queryperfData(req, res) {
		const sql = ' SELECT `from`, value FROM perf_data  WHERE proj=? AND type=? ORDER BY value DESC LIMIT ?,? '
		db.query(
			sql,
			[
				req.query.id,
				req.query.type,
				(req.query.page + 1 - 1) * req.query.limit,
				req.query.limit,
			],
			(err, results1) => {
				if (err) {
					return res.cc(err, 500)
				}
				if (results1.length === 0) {
					return res.cc('暂无数据！', 400)
				}
				const sql = 'SELECT value FROM perf_data WHERE proj=? AND type=?'
				let avg = 0
				db.query(sql, [req.query.id, req.query.type], (err, results) => {
					if (err) {
						return res.cc(err, 500)
					}
					if (results.length !== 0) {
						let add = 0
						for (let i = 0; i < results.length; i++) {
							add += results[i].value
						}
						avg = add / results.length
						res.send({
							code: 200,
							message: '查询性能数据成功！',
							data: {
								avg,
								list: results1,
							},
						})
					}
				})
			},
		)
	},
	querySegPerf(req, res) {
		const { id, type, day = 7, seg } = req.query
		const segs = (seg as string).split(',').map((str: string) => parseInt(str))
		let sql = 'SELECT '
		const arr: any[] = []
		segs.forEach((seg, index, array) => {
			if (index === 0) {
				sql += '\n SUM(CASE WHEN `value`<? THEN 1 ELSE 0 END) AS ?, '
				arr.push(seg, `c${index}`)
			} else {
				sql += '\n SUM(CASE WHEN `value`>=? AND `value`<? THEN 1 ELSE 0 END) AS ?, '
				arr.push(array[index - 1], seg, `c${index}`)
			}
		})
		sql += '\n SUM(CASE WHEN `value`>=? THEN 1 ELSE 0 END) AS ? '
		arr.push(segs[segs.length - 1], `c${segs.length}`)
		const time = new Date()
		const startTime = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate() - day + 1} 00:00:00`
		const endTime = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} 23:59:59`
		sql += '\n FROM perf_data WHERE proj=? AND type=? AND time BETWEEN ? AND ? '
		arr.push(id, type, startTime, endTime)
		console.log(sql)
		console.log(arr)
		db.query(sql, arr, (err, result) => {
			if (err) {
				return res.cc(err, 500)
			}
			const arr: any[] = []
			result = result[0]
			console.log(result)
			for (let i = 0; i <= segs.length; i++) {
				arr.push(result[`c${i}`])
			}
			res.send({
				code: 200,
				message: '查询性能数据成功！',
				data: arr,
			})
		})
	},
}
export default project
