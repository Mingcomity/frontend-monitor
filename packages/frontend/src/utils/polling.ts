export class Polling {
  funArr: any
  pollingST: any
  constructor(params: any[]) {
    this.funArr = params
    this.pollingST = null
  }
  // 轮询函数
  polling(arr: any) {
    this.pollingST = setTimeout(() => {
      clearTimeout(this.pollingST)
      this.funArr.forEach((val: any) => val())
      this.polling(arr)
    }, 10000)
  }
  // 开始轮询
  created() {
    // 调用轮询
    this.polling(this.funArr)
  }
  // 停止轮询
  destroyed() {
    clearTimeout(this.pollingST)
  }
}

// export const polling = (pollingST: any, fun: any) => {
//   pollingST = setTimeout(() => {
//     clearTimeout(pollingST)
//     fun()
//     polling(pollingST, fun)
//   }, 5000)
// }
