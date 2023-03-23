<template>
  <div>
    <el-descriptions class="margin-top" title="用户信息" :column="1" border>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon class="icon">
              <IEpuser />
            </el-icon>
            Username
          </div>
        </template>
        <div class="valueContainer">
          <span>{{ userInfo.username }}</span>
          <el-button type="primary" @click="reviseUsername">修改</el-button>
        </div>
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon class="icon">
              <IEptickets />
            </el-icon>
            Password
          </div>
        </template>
        <div class="valueContainer">
          <span>********</span>
          <el-button type="primary" @click="dialogFormVisible = true">
            修改
          </el-button>

          <el-dialog v-model="dialogFormVisible" title="修改密码">
            <el-form ref="ruleFormRef" :model="password" :rules="rules">
              <el-form-item label="原始密码:" prop="oldPwd">
                <el-input
                  v-model.trim="password.oldPwd"
                  autocomplete="off"
                  type="password"
                />
              </el-form-item>
              <el-form-item label="新的密码:" prop="newPwd">
                <el-input
                  v-model.trim="password.newPwd"
                  autocomplete="off"
                  type="password"
                />
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="resetForm(ruleFormRef)">取消</el-button>
                <el-button type="primary" @click="reviesPassword()">
                  确定
                </el-button>
              </span>
            </template>
          </el-dialog>
        </div>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useUserStore } from '@/stores/index.js'
import { revisePwdApi } from '@/api/api'
import type { FormInstance } from 'element-plus'

const ruleFormRef = ref<FormInstance>()
const userInfo = useUserStore()
const dialogFormVisible = ref(false)
const password = reactive<{
  oldPwd: string
  newPwd: string
}>({
  oldPwd: '',
  newPwd: ''
})
// 修改用户名
const reviseUsername = async () => {
  try {
    //@ts-ignore
    const value = await ElMessageBox.prompt('请输入新的用户名', '修改用户名', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputErrorMessage: '数字、26个英文字母或者下划线组成',
      inputPattern: /^\w{3,20}$/,
      inputValidator: (value: string) => {
        if (value.trim() === '') return false
        return true
      }
    })

    const data: UserInfo = {
      id: userInfo.id,
      username: value.value.trim()
    }
    await userInfo.reviseUsername(data)
  } catch (error) {
    //@ts-ignore
    ElMessage({
      type: 'info',
      message: '取消输入'
    })
  }
}

// 登录时密码验证
const verifyPasswordLogin = (
  rule: unknown,
  value: string,
  callback: (msg?: string) => void
) => {
  if (!value) {
    return callback('请输入密码')
  } else {
    callback()
  }
}
// 注册时密码验证
const verifyPasswordRegister = (
  rule: unknown,
  value: string,
  callback: (msg?: string) => void
) => {
  const z = /^[a-zA-Z]\w{5,17}$/
  if (!value) {
    return callback('请输入密码')
  } else if (!z.exec(value)) {
    return callback('字母开头,长度6-18,只能包含字母、数字和下划线')
  } else {
    callback()
  }
}
const rules = reactive({
  oldPwd: [{ validator: verifyPasswordLogin, trigger: 'blur' }],
  newPwd: [{ validator: verifyPasswordRegister, trigger: 'blur' }]
})
// 重置
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  dialogFormVisible.value = false
}
// 修改密码
const reviesPassword = async () => {
  try {
    dialogFormVisible.value = false
    const data: RevisePwd = {
      id: userInfo.id,
      ...password
    }
    const res = await revisePwdApi(data)
    password.newPwd = ''
    password.oldPwd = ''
    if (res.data.code === 200) {
      //@ts-ignore
      ElMessage({
        type: 'success',
        message: res.data.message
      })
    } else {
      //@ts-ignore
      ElMessage(res.data.message)
    }
  } catch (error) {
    console.error(error)
  }
}
</script>
<style scoped>
.cell-item {
  display: flex;
  align-items: center;
}
.icon {
  margin-right: 10px;
}
:deep(.el-descriptions__label) {
  width: 200px;
}
.valueContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
:deep(.el-dialog) {
  width: 400px;
  border-radius: 4px;
}
:deep(.el-dialog__body) {
  padding-bottom: 10px;
}
</style>
