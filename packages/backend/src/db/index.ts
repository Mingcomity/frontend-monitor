import mysql from 'mysql'
import dotenv from 'dotenv'

dotenv.config()

const db = mysql.createPool({
	host: process.env.MYSQL_HOST || 'localhost',
	user: process.env.MYSQL_USER || 'root',
	port: parseInt(process.env.MYSQL_PORT || '3306'),
	password: process.env.MYSQL_PWD,
	database: process.env.MYSQL_DB || 'monitor',
})

export default db
