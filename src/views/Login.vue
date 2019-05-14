<template>
  <div class="bg">
    <div class="login-form">
      <el-row type="flex">
        <el-col
          class="form-col"
          :xs="{ span: 18, offset: 3 }"
          :sm="{ span: 12, offset: 6 }"
          :md="{ span: 10, offset: 7 }"
          :lg="{ span: 8, offset: 8 }"
          :xl="{ span: 6, offset: 9 }"
        >
          <div class="company-info center">
            <div>
              <i class="logo el-icon-sunrise-1"></i>
            </div>
            <div class="company-name">
              Sunrise Industries
            </div>
          </div>

          <hr class="divider" />

          <div class="error-text" data-cy="text-error">
            <span>{{ error_text }}</span>
          </div>

          <div v-if="!success_login">
            <el-input
              class="margin-bottom-10"
              v-model="email"
              prefix-icon="el-icon-message"
              size="large"
              data-cy="input-email"
              placeholder="Email Address"
              :disabled="checking_password"
            />

            <el-input
              class="margin-bottom-10"
              v-model="password"
              prefix-icon="el-icon-lock"
              type="password"
              data-cy="input-password"
              size="large"
              placeholder="Password"
              :disabled="checking_password"
            />

            <div class="margin-top-10 center">
              <el-button
                class="padding-left-30 padding-right-30"
                size="large"
                type="primary"
                data-cy="button-login"
                :loading="checking_password"
                @click="check_password()"
              >
                Login
              </el-button>
            </div>

            <div class="register-upsell" data-cy="text-register">
              Don't have an account yet?<br />
              You should really
              <router-link to="/register">register</router-link>
            </div>
          </div>

          <div class="success" v-else data-cy="text-success">
            You have been successfully logged in! Our developers are hard at work implementing the rest of the features.

            <!--
              <img class="cat-image" src="../assets/cat.gif" />
            -->
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { Button, Col, Input, Row } from 'element-ui'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      checking_password: false,
      error_text: '',
      success_login: false
    }
  },
  components: {
    'el-button': Button,
    'el-col': Col,
    'el-input': Input,
    'el-row': Row
  },
  methods: {
    check_password() {
      this.checking_password = true

      setTimeout(() => {
        if (this.email.match(/.+@.+\..+/) === null) {
          this.error_text = 'Invalid email format'
        } else if (this.password.length === 0) {
          this.error_text = 'Must provide a password'
        } else if (this.email !== 'super@secret.com' || this.password !== '1234567890') {
          this.error_text = 'Invalid email or password'
        } else {
          this.error_text = ''
          this.success_login = true
        }

        this.checking_password = false
      }, 1000)
    }
  }
}
</script>

<style scoped>
.login-form {
  padding-top: 10vh;
}

.cat-image {
  width: 100%;
}

.company-info {
  margin-top: 15px;
}

.success {
  font-family: arial;
  text-align: center;
}

.margin-bottom-10 {
  margin-bottom: 10px;
}

.margin-top-10 {
  margin-top: 10px;
}

.padding-left-30 {
  padding-left: 30px;
}

.padding-right-30 {
  padding-right: 30px;
}

.register-upsell {
  margin-top: 30px;
  font-family: arial;
  font-size: 14px;
}

.error-text {
  height: 30px;
  color: red;
}

.center {
  text-align: center;
}

.logo {
  font-size: 120px;
  color: orange;
}

.company-name {
  font-size: 18px;
  font-family: arial;
}

.divider {
  line-height: 1em;
  position: relative;
  outline: 0;
  border: 0;
  color: black;
  text-align: center;
  height: 1.5em;
}

.divider:before {
  content: '';
  background: linear-gradient(to right, transparent, #818078, transparent);
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  height: 1px;
}

.divider:after {
  content: attr(data-content);
  position: relative;
  display: inline-block;
  color: black;
  padding: 0 0.5em;
  line-height: 1.5em;
  color: black;
  background-color: #eaeaea;
}

.form-col {
  border-radius: 15px;
  background-color: white;
  padding: 0px 50px 50px 50px;
  box-shadow: 2px 2px 20px 10px rgba(0, 0, 0, 0.25);
}

.bg {
  /* The image used */
  background-image: url('../assets/image_1.jpg');

  /* Full height */
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
