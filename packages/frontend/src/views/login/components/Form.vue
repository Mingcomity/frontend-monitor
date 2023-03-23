<template>
  <el-form
    :class="className"
    ref="ruleFormRef"
    status-icon
    :model="inputContent"
    :rules="rules"
    show-message
  >
    <h2 class="title">
      <slot name="title"></slot>
    </h2>
    <el-form-item prop="username">
      <el-input
        placeholder="username"
        type="text"
        v-model.trim="inputContent.username"
      />
    </el-form-item>

    <el-form-item prop="pwd">
      <el-input
        placeholder="password"
        type="password"
        v-model.trim="inputContent.pwd"
      />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="api(ruleFormRef, inputContent)">
        <slot name="btn"></slot>
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import Cookie from 'js-cookie'
import type { FormInstance, FormRules } from 'element-plus'
import { adminLoginApi, adminRegisterApi } from '../../../api/api'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = withDefaults(
  defineProps<{
    type: string
  }>(),
  {
    type: 'login'
  }
)
const className = computed<string>(() => {
  if (props.type === 'login') {
    return 'sign-in-form'
  } else {
    return 'sign-up-form'
  }
})

const ruleFormRef = ref<FormInstance>()

const inputContent = reactive<AdminLogin>({
  username: '',
  pwd: ''
})
// 用户名验证
const verifyUsername = (
  rule: unknown,
  value: string,
  callback: (msg?: string) => void
) => {
  const z = /^\w{3,20}$/
  if (!value) {
    return callback('请输入用户名')
  } else if (!z.exec(value)) {
    return callback('数字、26个英文字母或者下划线组成')
  } else {
    callback()
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
const rules = reactive<FormRules>({
  username: [{ validator: verifyUsername, trigger: 'blur' }],
  pwd: [
    {
      validator:
        props.type === 'login' ? verifyPasswordLogin : verifyPasswordRegister,
      trigger: 'blur'
    }
  ]
})
// 重置按钮
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

// 登录按钮
const loginApi = async (data: AdminLogin) => {
  try {
    const res = await adminLoginApi(data)
    if (res.data.code === 200) {
      // 12 小时失效
      const inHalfADay = 0.5
      Cookie.set('token', res.data.token, {
        expires: inHalfADay
      })
      router.push('/home')
      //@ts-ignore
      ElMessage.success(res.data.message)
    } else {
      //@ts-ignore
      ElMessage({
        message: res.data.message,
        type: 'warning'
      })
    }
  } catch (error: any) {
    //@ts-ignore
    ElMessage.error(error.message)
  }
}
// 注册按钮
const registerApi = async (data: AdminLogin) => {
  try {
    const res = await adminRegisterApi(data)
    if (res.data.code === 200) {
      //@ts-ignore
      ElMessage.success(res.data.message)
    } else {
      //@ts-ignore
      ElMessage({
        message: res.data.message,
        type: 'warning'
      })
    }
  } catch (error) {
    //@ts-ignore
    ElMessage.error(error.message)
  }
}
const api = (formEl: FormInstance | undefined, data: AdminLogin) => {
  if (!formEl) return
  // 表单验证
  formEl
    .validate()
    .then(
      () => {
        if (props.type === 'login') {
          loginApi(data)
        } else {
          registerApi(data)
        }
      },
      () => {
        return
      }
    )
    .catch((error) => {
      //@ts-ignore
      ElMessage.error(error.message)
    })
}
</script>
<style scoped></style>
