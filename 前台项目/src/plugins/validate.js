/* 
使用vee-validate进行表单验证
*/
import Vue from 'vue'
import VeeValidate from "vee-validate";
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate);

VeeValidate.Validator.localize('zh_CN', {
    messages: {
    ...zh_CN.messages,
    is: (field) => `${field}必须与密码相同` // 修改内置规则的 message，让确认密码和密码相同
    },
    attributes: { // 给校验的 field 属性名映射中文名称
    phone: '手机号',
    code: '验证码',
    password:'密码',
    password1:'确认密码',
    agree:'协议'
    }
    })


VeeValidate.Validator.extend('tongyi', {
    validate: value => {
    return value
    },
    getMessage: field => field + '必须同意'
    })

/* 
https://github.com/logaretm/vee-validate 基本使用
https://logaretm.github.io/vee-validate/guide/rules.html#importing-the-rules  注册所有校验规则
https://logaretm.github.io/vee-validate/guide/state.html#css-classes 校验失败的样式类名
https://logaretm.github.io/vee-validate/guide/forms.html#basic-example 提交表单时统一校验
https://logaretm.github.io/vee-validate/guide/localization.html 指定本地(中文)提示信息
*/