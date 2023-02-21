// 传入ture返回格式为 xxxx-xx-xx xx:xx:xx
// 传入false返回格式为 xxxx-xx-xx
const date = function (format: boolean) {
	const current = new Date()
	const year = current.getFullYear()
	const month = current.getMonth() + 1
	const day = current.getDate()
	const hour
		= current.getHours() < 10 ? `0${current.getHours()}` : current.getHours()
	const min
		= current.getMinutes() < 10
			? `0${current.getMinutes()}`
			: current.getMinutes()
	const s
		= current.getSeconds() < 10
			? `0${current.getSeconds()}`
			: current.getSeconds()
	if (format) {
		const str
			= `${year}-${month}-${day} ${hour}:${min}:${s}`
		return str
	} else {
		const str = `${year}-${month}-${day}`
		return str
	}
}
export default date
