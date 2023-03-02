import { defineStore } from 'pinia'
import { Names } from './store-namespace'
import {
  getUserInfoAPi,
  reviseUsernameApi,
  getProjectInfo,
  addProject,
  reviseProjectNameApi
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
    }
  }
})

interface ProjectList {
  theCurrentProject: number
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
    // 对数据进行存储
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
    // 获取信息
    getProjectInfo: async function () {
      try {
        const res = await getProjectInfo()
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
        const res = await addProject(data)
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
