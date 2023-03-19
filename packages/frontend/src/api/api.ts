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
export const getProjectInfoApi = (): PromiseRes<Project[]> =>
  request.get('/project')

// 添加项目
export const addProjectApi = (data: AddProject): PromiseRes =>
  request.post('/project', data)

// 修改项目名称
export const reviseProjectNameApi = (data: AddProject): PromiseRes =>
  request.put('/project', data)

// 查询项目性能
export const getPerformanceApi = (
  data: GetPerformance
): PromiseRes<Performance> => request.get('/perf', data)

// 查询分段数据
export const getSublevelApi = (
  data: GetPerSublevel
): PromiseRes<number[] | null[]> => request.get('/perf/seg', data)

// 查询PV最近七天数据
export const getPvDataApi = (data: {
  params: { id: number }
}): PromiseRes<number[]> => request.get('/behavior/visit/pv', data)
// 查询PV记录
export const getPvRecordingApi = (data: {
  params: { id: number }
}): PromiseRes<PvUvRecording[]> => request.get('/behavior/popular/pv', data)

// 查询UV最近七天数据
export const getUvDataApi = (data: {
  params: { id: number }
}): PromiseRes<number[]> => request.get('/behavior/visit/uv', data)
// 查询UV记录
export const getUvRecordingApi = (data: {
  params: { id: number }
}): PromiseRes<PvUvRecording[]> => request.get('/behavior/popular/uv', data)

// 查询平均停留时间
export const getResidenceTimeApi = (data: { id: number }): PromiseRes<number> =>
  request.get(`/behavior/stay/${data.id}`)
// 查询停留时间记录
export const getResidenceRecordingApi = (data: {
  id: number
}): PromiseRes<Browse[]> => request.get(`/behavior/stay/${data.id}?list=1`)

// 查询每日异常数据总和
export const getDailyExceptionApi = (data: getException): PromiseRes<any[]> =>
  request.get('/exception', data)
// 查询异常数据列表
export const getExceptionListApi = (data: {
  params: {
    id: number
  }
}): PromiseRes<ExceptionList[]> => request.get('/exception/recent', data)
