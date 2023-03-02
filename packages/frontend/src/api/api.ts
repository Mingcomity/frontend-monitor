import request from './request'

type PromiseRes<T = {}> = Promise<ApiRes<T>>

// res样式
interface ApiRes<T = {}> {
  data: ApiResult<T>
}
// Api返回样式
interface ApiResult<T = {}> {
  code: number
  message: string
  data?: T
}

// Api返回样式————token
interface Usertoken extends ApiResult {
  token: string
}

// 登录后返回token
export const adminLoginApi = (data: AdminLogin): Promise<{ data: Usertoken }> =>
  request.post('/user/login', data)

// 注册接口
export const adminRegisterApi = (data: AdminLogin): PromiseRes =>
  request.post('/user/register', data)

// 返回用户信息接口
export const getUserInfoAPi = (): PromiseRes<UserInfo> =>
  request.get('/user/info')

// 修改用户名
export const reviseUsernameApi = (data: UserInfo): PromiseRes =>
  request.post('/user/info', data)

// 修改密码
export const revisePwdApi = (data: RevisePwd): PromiseRes =>
  request.post('/user/pwd', data)

// 获取项目信息
export const getProjectInfo = (): PromiseRes<Project[]> =>
  request.get('/project')

// 添加项目
export const addProject = (data: AddProject): PromiseRes =>
  request.post('/project', data)

// 修改项目名称
export const reviseProjectNameApi = (data: AddProject): PromiseRes =>
  request.put('/project', data)
