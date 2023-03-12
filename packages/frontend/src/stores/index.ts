import { defineStore } from 'pinia'
import { Names } from './store-namespace'
import {
  getUserInfoAPi,
  reviseUsernameApi,
  getProjectInfoApi,
  addProjectApi,
  reviseProjectNameApi,
  getPerformanceApi,
  getSublevel
} from '@/api/api.js'

// 用户信息
export const useUserStore = defineStore(Names.User, {
  state: (): UserInfo => {
    return {
      id: 0,
      username: ''
    }
  },
  // 类似于 computed
  getters: {},
  // 类似于 methods 同步异步都可
  actions: {
    updateUserInfo(data: UserInfo) {
      this.id = data.id
      this.username = data.username
    },
    // 获取用户信息
    getUserInfoAPi: async function () {
      try {
        const res = await getUserInfoAPi()
        if (res.data.code === 200) {
          this.updateUserInfo(res.data.data as UserInfo)
        } else {
          //@ts-ignore
          ElMessage(res.data.message)
        }
      } catch (error) {
        console.error(error)
      }
    },
    // 更新用户名
    reviseUsername: async function (data: UserInfo) {
      try {
        const res = await reviseUsernameApi(data)
        if (res.data.code === 200) {
          // 重新获取用户信息
          await this.getUserInfoAPi()
          //@ts-ignore
          ElMessage({
            type: 'success',
            message: `Your name is:${data.username}`
          })
        } else {
          //@ts-ignore
          ElMessage(res.data.message)
        }
      } catch (error) {
        console.error(error)
      }
    },
    // 更新项目信息
    updatedProjectData: async function () {
      // 性能数据获取
      const performance = usePerformance()
      await performance.getPerformance()
    }
  }
})

interface ProjectList {
  // 当前项目
  theCurrentProject: number
  // 项目列表
  projectArr?: {
    id: number
    numbering: number
    name: string
    SdkScript: string
  }[]
}

// 项目信息
export const useProjectStore = defineStore(Names.Project, {
  state: (): ProjectList => {
    return {
      theCurrentProject: 0,
      projectArr: []
    }
  },
  // 类似于 computed
  getters: {},
  // 类似于 methods 同步异步都可
  actions: {
    // 对项目列表数据进行存储
    updatedProjectInfo(data: Project[]) {
      this.projectArr = []
      for (let i = 0; i < data.length; i++) {
        if (i === 0) this.theCurrentProject = data[i].id
        this.projectArr.push({
          id: data[i].id,
          numbering: i + 1,
          name: data[i].name,
          SdkScript: `<script crossorigin report="http://120.79.27.173:2336" src="http://120.79.27.173:2349/index.js" id="__monitor" key="${data[i].key}"></script>`
        })
      }
    },
    // 获取项目信息
    getProjectInfo: async function () {
      try {
        const res = await getProjectInfoApi()
        if (res.data.code === 200) {
          this.updatedProjectInfo(res.data.data as Project[])
        } else if (res.data.code === 400) {
          // 清除项目数据
          this.projectArr = []
          //@ts-ignore
          ElMessage(res.data.message)
        } else {
          //@ts-ignore
          ElMessage(res.data.message)
        }
      } catch (error) {
        console.error(error)
      }
    },
    // 添加项目
    addProject: async function (data: AddProject) {
      try {
        const res = await addProjectApi(data)
        if (res.data.code === 200) {
          // 重新获取项目信息
          await this.getProjectInfo()
          //@ts-ignore
          ElMessage({
            type: 'success',
            message: `添加成功`
          })
        } else {
          //@ts-ignore
          ElMessage(res.data.message)
        }
      } catch (error) {}
    },
    // 修改项目名称
    reviseProjectName: async function (data: AddProject) {
      try {
        const res = await reviseProjectNameApi(data)
        if (res.data.code === 200) {
          // 重新获取项目信息
          await this.getProjectInfo()
          //@ts-ignore
          ElMessage({
            type: 'success',
            message: `修改成功`
          })
        } else {
          //@ts-ignore
          ElMessage(res.data.message)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
})

interface Performance {
  type: number
  average: number
  page: number
  list: {
    from: string
    value: number
  }[]
  sublevel: number[]
  enable: boolean
}

// 项目性能
export const usePerformance = defineStore(Names.Performance, {
  state: (): {
    type: Map<number, string>
    sublevelDate: Map<number, number[]>
    performance: Performance[]
  } => {
    return {
      type: new Map([
        [1, 'FP'],
        [2, 'FCP'],
        [3, 'DOM Ready'],
        [4, 'DNS'],
        [5, 'DOM Complete'],
        [6, 'DOM Interactive'],
        [7, 'LCP']
      ]),
      sublevelDate: new Map([
        [1, [10, 50, 100, 500]],
        [2, [10, 50, 100, 500]],
        [3, [100, 500, 1000, 1500]],
        [4, [10, 50, 100, 500]],
        [5, [10, 50, 100, 500]],
        [6, [100, 500, 1500, 2000]],
        [7, [100, 500, 1500, 2000]]
      ]),
      performance: []
    }
  },
  getters: {
    // 返回平均数据
    getAvg() {
      const arr: {
        typeNum: number
        type: string
        avg: string
      }[] = []
      this.performance.map((val) => {
        if (val.enable) {
          const data = {
            typeNum: val.type,
            type: `平均 ${this.type.get(val.type)}`,
            avg: val.average.toFixed(2)
          }
          arr.push(data)
        }
      })
      return arr
    },
    // 返回性能数据
    getfrom() {
      const arr: {
        typeNum: number
        type: string
        list: { from: string; value: number }[]
        page: number
      }[] = []
      this.performance.forEach((val) => {
        if (val.enable) {
          const data = {
            typeNum: val.type,
            type: this.type.get(val.type) as string,
            list: val.list,
            page: val.page
          }
          arr.push(data)
        }
      })
      return arr
    },
    // 返回数据分段文本
    getSublevelText() {
      const sublevelTextArr: {
        type: number
        interval: {
          text: string
          number: number[]
        }[]
      }[] = []
      this.sublevelDate.forEach((val, idx, map) => {
        if (this.performance.find((value) => value.type == idx)?.enable) {
          const lastIdx = val.length
          const interval: { text: string; number: number[] }[] = []
          for (let i = 0; i <= val.length; i++) {
            let text: string = ''
            let number: number[] = []
            let beforeNum, endNum
            let beforeText, endText
            switch (i) {
              case 0:
                beforeNum = 0
                endNum = val[i]
                beforeText = '0-'
                endText =
                  val[i] < 1000
                    ? `${val[i].toString()}ms`
                    : `${(val[i] / 1000).toFixed(1)}s`
                break
              case lastIdx:
                beforeNum = val[i]
                endNum = Number.MAX_SAFE_INTEGER
                beforeText = ''
                endText =
                  val[i] < 1000
                    ? `>${val[i - 1].toString()}ms`
                    : `>${(val[i - 1] / 1000).toFixed(1)}s`
                break
              default:
                beforeNum = val[i - 1]
                endNum = val[i]
                beforeText =
                  val[i - 1] < 1000
                    ? `${val[i - 1].toString()}-`
                    : `${(val[i - 1] / 1000).toFixed(1)}-`
                endText =
                  val[i] < 1000
                    ? `${val[i].toString()}ms`
                    : `${(val[i] / 1000).toFixed(1)}s`
                break
            }
            text = `${beforeText}${endText}`
            number = [beforeNum, endNum]
            interval.push({ text, number })
          }
          const sublevelText = {
            type: idx,
            interval
          }
          sublevelTextArr.push(sublevelText)
        }
      })
      return sublevelTextArr
    },
    // 返回轮播饼图数据
    getcarouselPieChart() {
      const arr: {
        type: number
        typeText: string
        data: {
          textArr: string[]
          valueArr: {
            value: number
            name: string
          }[]
        }
      }[] = []
      this.performance.forEach((val) => {
        if (val.enable) {
          const textArr: string[] = []
          const valueArr: {
            value: number
            name: string
          }[] = []
          this.getSublevelText
            .find((value) => value.type === val.type)
            ?.interval.forEach((value, index) => {
              textArr.push(value.text)
              valueArr.push({
                value: val.sublevel[index],
                name: value.text
              })
            })
          const obj: {
            type: number
            typeText: string
            data: {
              textArr: string[]
              valueArr: {
                value: number
                name: string
              }[]
            }
          } = {
            type: val.type,
            typeText: this.type.get(val.type) as string,
            data: { textArr, valueArr }
          }
          arr.push(obj)
        }
      })
      return arr
    }
  },
  actions: {
    // 获取性能数据
    getPerformance: async function (data?: GetPerformance) {
      const arr: Performance[] = []
      try {
        const project = useProjectStore()
        if (data) {
          const res = await getPerformanceApi(data)
          if (res.data.code === 200) {
            const performance = this.performance.find(
              (val) => val.type === data.params.type
            )
            if (performance && res.data.data) {
              performance.page = data.params.page
              performance.list = res.data.data.list
            }
          } else {
            //@ts-ignore
            ElMessage(val.data.message)
          }
        } else {
          // 请求参数列表
          const parameterList: GetPerformance[] = []
          for (let i = 1; i <= 7; i++) {
            const params = {
              params: {
                id: project.theCurrentProject,
                type: i,
                page: 0,
                limit: 100000
              }
            }
            parameterList.push(params)
          }
          // 并发请求
          const resArr = await Promise.all([
            getPerformanceApi(parameterList[0]),
            getPerformanceApi(parameterList[1]),
            getPerformanceApi(parameterList[2]),
            getPerformanceApi(parameterList[3]),
            getPerformanceApi(parameterList[4]),
            getPerformanceApi(parameterList[5]),
            getPerformanceApi(parameterList[6])
          ])
          // 请求结果处理
          resArr.forEach((val, index) => {
            if (val.data.code === 200) {
              if (val.data.data) {
                const res: Performance = {
                  type: index + 1,
                  average: val.data.data.avg,
                  page: 0,
                  list: val.data.data.list,
                  sublevel: [0, 0, 0, 0, 0],
                  enable: index + 1 === 4 ? false : true
                }
                arr.push(res)
              }
            } else if (val.data.code === 400) {
              arr.push({
                type: index + 1,
                average: 0,
                page: 0,
                list: [],
                sublevel: [],
                enable: index + 1 === 4 ? false : true
              })
            } else {
              //@ts-ignore
              ElMessage(val.data.message)
            }
          })
          await this.getSublevel(arr)
          this.performance = arr
        }
      } catch (error) {
        console.error(error)
      }
    },
    // 获取分段数据
    getSublevel: async function (carrier: Performance[]): Promise<void> {
      try {
        const project = useProjectStore()
        const queryArr: GetPerSublevel[] = []
        // 创建请求列表
        for (let i = 1; i <= 7; i++) {
          const query: GetPerSublevel = {
            params: {
              id: project.theCurrentProject,
              day: 1000,
              type: i,
              seg: this.sublevelDate.get(i)?.join(',') as string
            }
          }
          queryArr.push(query)
        }
        // 并发请求
        const resArr = await Promise.all([
          getSublevel(queryArr[0]),
          getSublevel(queryArr[1]),
          getSublevel(queryArr[2]),
          getSublevel(queryArr[3]),
          getSublevel(queryArr[4]),
          getSublevel(queryArr[5]),
          getSublevel(queryArr[6])
        ])
        // 处理请求后的结果
        resArr.forEach((val, index) => {
          if (val.data.code === 200) {
            const performance = carrier.find((val) => val.type === index + 1)
            if (performance && val.data.data) {
              if (val.data.data[0] === null) {
                performance.sublevel = [0, 0, 0, 0, 0]
              } else {
                performance.sublevel = val.data.data as number[]
              }
            }
          } else {
            //@ts-ignore
            ElMessage(val.data.message)
          }
        })
      } catch (error) {}
    }
  }
})
