<template>
  <div class="container">
    <div class="content">
      <div class="top">
        <div class="header">
          <img alt="logo" class="logo" src="static/img/vue-antd-logo.png" />
          <span class="title">Vue Antd</span>
        </div>
        <div class="desc">Vue Antd 是西湖区最具影响力的 Web 设计规范</div>
      </div>
      <div class="login">
        <a-form @submit="onSubmit">
          <a-tabs size="large" style="text-align: center">
            <a-tab-pane tab="账户密码登录" key="1">
              <a-form-item>
                <a-input size="large" placeholder="admin/iczer" >
                  <a-icon slot="prefix" type="user" />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-input size="large" placeholder="888888/123456" type="password">
                  <a-icon slot="prefix" type="lock" />
                </a-input>
              </a-form-item>
            </a-tab-pane>
            <a-tab-pane tab="手机号登录" key="2">
              <a-form-item>
                <a-input size="large" placeholder="mobile number" >
                  <a-icon slot="prefix" type="mobile" />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-row style="margin: 0 -4px">
                  <a-col :span="16">
                    <a-input size="large" placeholder="captcha">
                    <a-icon slot="prefix" type="mail" />
                  </a-input>
                  </a-col>
                  <a-col :span="8" style="padding-left: 4px">
                    <a-button style="width: 100%" size="large">获取验证码</a-button>
                  </a-col>
                </a-row>
              </a-form-item>
            </a-tab-pane>
          </a-tabs>
          <div>
            <a-checkbox :checked="true" >自动登录</a-checkbox>
            <a style="float: right">忘记密码</a>
          </div>
          <a-form-item>
            <a-button style="width: 100%;margin-top: 24px" size="large" htmlType="submit" type="primary">登录</a-button>
          </a-form-item>
          <div>
            其他登录方式
            <a-icon class="icon" type="alipay-circle" />
            <a-icon class="icon" type="taobao-circle" />
            <a-icon class="icon" type="weibo-circle" />
            <router-link style="float: right" to="/" >注册账户</router-link>
          </div>
        </a-form>
      </div>
    </div>
    <gloabl-footer />
  </div>
</template>

<script>
import AForm from 'vue-antd-ui/es/form/Form'
import ATabs from 'vue-antd-ui/es/tabs'
import GloablFooter from '../layout/GloablFooter'
import AFormItem from 'vue-antd-ui/es/form/FormItem'
import AInput from 'vue-antd-ui/es/input/Input'
import AIcon from 'vue-antd-ui/es/icon/icon'
import AInputGroup from 'vue-antd-ui/es/input/Group'
import AButton from 'vue-antd-ui/es/button/button'
import ACol from 'vue-antd-ui/es/grid/Col'
import ACheckbox from 'vue-antd-ui/es/checkbox/Checkbox'

const ATabPane = ATabs.TabPane

export default {
  name: 'Login',
  components: {ACheckbox, ACol, AButton, AInputGroup, AIcon, AInput, AFormItem, GloablFooter, ATabPane, ATabs, AForm},
  methods: {
    onSubmit (e) {
      e.preventDefault()
      console.log('submit')
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;
    background: #f0f2f5 url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg') no-repeat center 110px;
    background-size: 100%;
    .content {
      padding: 32px 0;
      flex: 1;
      @media (min-width: 768px){
        padding: 112px 0 24px;
      }
      .top {
        text-align: center;
        .header {
          height: 44px;
          line-height: 44px;
          a {
            text-decoration: none;
          }
          .logo {
            height: 44px;
            vertical-align: top;
            margin-right: 16px;
          }
          .title {
            font-size: 33px;
            color: rgba(0,0,0,.85);
            font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
            font-weight: 600;
            position: relative;
            top: 2px;
          }
        }
        .desc {
          font-size: 14px;
          color: rgba(0,0,0,.45);
          margin-top: 12px;
          margin-bottom: 40px;
        }
      }
      .login{
        width: 368px;
        margin: 0 auto;
        .icon {
          font-size: 24px;
          color: rgba(0, 0, 0, 0.2);
          margin-left: 16px;
          vertical-align: middle;
          cursor: pointer;
          transition: color 0.3s;

          &:hover {
            color: #1890ff;
          }
        }
      }
    }
  }
</style>
