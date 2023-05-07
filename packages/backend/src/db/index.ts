import mysql from 'mysql'
import dotenv from 'dotenv'

dotenv.config()

const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'frontend-monitor',
  password: 'admin123',
  database: 'frontend-monitor'
})

export default db
