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

// 查询PVUV记录返回值
interface PvUvRecording {
  from: string
  pv?: number
  uv?: number
}

// 查询停留时间返回值
interface Browse {
  from: string
  duration: number
}

// 查询每日异常数据总和
interface getException {
  params: {
    id: number
    time: string
  }
}
// 返回异常数据列表
interface ExceptionList {
  msg: string
  position: string
  time: string
  name: string
}
