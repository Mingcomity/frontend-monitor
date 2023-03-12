interface AdminLogin {
  username: string
  pwd?: string
}
interface UserInfo {
  id: number
  username: string
}
interface RevisePwd {
  id: number
  oldPwd: string
  newPwd: string
}
interface Project {
  id: number
  name: string
  key: string
}

interface AddProject {
  id: number
  name: string
}
// 获取项目性能
interface GetPerformance {
  params: {
    id: number
    type: number
    page: number
    limit: number
  }
}
// 获取项目分段性能
interface GetPerSublevel {
  params: {
    id: number
    type: number
    seg: string
    day: number
  }
}
// 项目性能返回值
interface Performance {
  avg: number
  list: {
    from: string
    value: number
  }[]
}
