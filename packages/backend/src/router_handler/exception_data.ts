import date from '../date.js'
import db from '../db/index.js'

interface Person {
  addexceptionData(req: any, res: any): void
  queryexceptionData(req: any, res: any): void
  queryRecentExceptionData(req: any, res: any): void
}

const project: Person = {
  // 添加异常数据
  addexceptionData(req, res) {
    const sql = 'SELECT id FROM project WHERE `key`=?'
    db.query(sql, req.body.key, (err, results) => {
      if (err) {
        return res.cc(err, 500)
      }
      if (results.length !== 1) {
        return res.cc('key值错误等!', 400)
      }
      const sql = 'INSERT INTO exception_data SET ?'
      const data: {
        type: number
        proj: number
        msg: string
        position: string
        time: string
      } = {
        type: req.body.type,
        proj: results[0].id,
        msg: req.body.msg,
        position: req.body.position,
        time: date(true)
      }
      db.query(sql, data, (err, results) => {
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
  // 查询每日异常数据
  queryexceptionData: async (req, res) => {
    let type: { name: string }[] = []
    const queryType = async () => {
      await db.query('SELECT name FROM exception_type', (err, results) => {
        type = results
      })
    }
    await queryType()

    let sql =
      'SELECT DATA.msg,DATA.position,DATA.time,TYPE.name FROM exception_data as DATA JOIN exception_type as TYPE on DATA.type = TYPE.id WHERE DATA.proj = ?'
    const data = [req.query.id]
    if (req.query.type) {
      sql += 'AND DATA.type = ?'
      data.push(req.query.type)
    }
    db.query(sql, data, (err, results) => {
      if (err) {
        return res.cc(500, err)
      }
      class DataTime {
        // 开始时间
        readonly startTime: Date
        // 当前时间
        readonly endTime: Date
        // 数据
        readonly data: {
          msg: string
          position: string
          time: Date
          name: string
        }[]
        // 异常类型
        readonly type: { name: string }[]
        // 异常数据
        exceptionTypeData: any[]
        // 构造函数
        public constructor(
          start: string,
          data: {
            msg: string
            position: string
            time: Date
            name: string
          }[],
          type: { name: string }[]
        ) {
          this.startTime = this.getDate(start)
          this.endTime = new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
          )
          this.data = data
          this.type = type
          this.exceptionTypeData = this.dataList()
        }
        // 格式化时间函数
        private getDate(dateStr: string) {
          const temp = dateStr.split('-')
          const date = new Date(
            Number(temp[0]),
            Number(temp[1]) - 1,
            Number(temp[2])
          )
          return date
        }
        // 返回指定日期到今天之间的日期的数值
        public dataList() {
          let i = 0
          const Arr: [][] = []
          while (this.endTime.getTime() - this.startTime.getTime() >= 0) {
            const year = this.startTime.getFullYear()
            const month =
              (this.startTime.getMonth() + 1).toString().length == 1
                ? '0' + (this.startTime.getMonth() + 1).toString()
                : (this.startTime.getMonth() + 1).toString()
            const day =
              this.startTime.getDate().toString().length == 1
                ? '0' + this.startTime.getDate()
                : this.startTime.getDate()
            const arr: any[] = []
            this.type.forEach((val) => {
              const obj = [year + '-' + month + '-' + day, val.name, 0]
              arr.push(obj)
            })
            this.startTime.setDate(this.startTime.getDate() + 1)
            i += 1
            Arr.push(...arr)
          }
          return Arr
        }
        // 查找当前日期是否有与data中相符的
        public findDate() {
          for (let i = 0; i < this.data.length; i++) {
            const time = `${this.data[i].time.getFullYear()}-${
              (this.data[i].time.getMonth() + 1).toString().length == 1
                ? '0' + (this.data[i].time.getMonth() + 1).toString()
                : (this.data[i].time.getMonth() + 1).toString()
            }-${
              this.data[i].time.getDate().toString().length == 1
                ? '0' + this.data[i].time.getDate()
                : this.data[i].time.getDate()
            }`

            const type = this.data[i].name
            if (
              this.exceptionTypeData.find(
                (val) => val[0] === time && val[1] === type
              )
            ) {
              this.exceptionTypeData.find(
                (val) => val[0] === time && val[1] === type
              )[2]++
            }
          }
        }
      }
      const str = req.query.time.toString()
      const data = new DataTime(str, results, type)
      data.findDate()
      res.send({
        code: 200,
        message: '查询成功！',
        data: data.exceptionTypeData
      })
    })
  },
  // 查询异常数据列表
  queryRecentExceptionData(req, res) {
    let sql =
      'SELECT DATA.msg,DATA.position,DATA.time,TYPE.name FROM exception_data as DATA JOIN exception_type as TYPE on DATA.type = TYPE.id WHERE DATA.proj = ? order by time desc'
    const data = [req.query.id]
    db.query(sql, data, (err, result) => {
      if (err) res.cc(500, err)
      for (let i = 0; i < result.length; i++) {
        result[i].time = date(true, result[i].time)
      }
      res.send({
        code: 200,
        message: '查询异常数据成功！',
        data: result
      })
    })
  }
}
export default project
