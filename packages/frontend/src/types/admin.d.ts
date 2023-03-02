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
