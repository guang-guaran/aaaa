jQuery(function () {
  // 1. 点击去注册  显示注册页面 隐藏登录页面
  $('.login-box a').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 2. 点击去登录  显示登录页面 隐藏注册页面
  $('.reg-box a').on('click', function () {
    $('.reg-box').hide()
    $('.login-box').show()
  })

  // 3. 表单验证
  let form = layui.form
  form.verify({
    username: [
      /^[\w]{1,10}$/,
      '用户名必须是1-10位字母和数字'
    ],
    pwd: [
      /^[\S]{6,15}$/,
      '密码长度必须是6-15位的非空字符串'
    ],
    regpwd: function (value) {
      // 获取输入过的密码  必须获取注册页面里的密码
      let pwd = $('.reg-box [name="password"]').val()
      if (pwd !== value) {
        return '两次密码输入不一致'
      }
    }
  })

  // 4. 发送ajax注册账号
  $('#regForm').on('submit', function (e) {
    e.preventDefault()
    axios({
      url: '/api/reguser',
      method: 'POST',
      data: $(this).serialize()
    }).then(({
      data: res
    }) => {
      // console.log(res)
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg('恭喜您！用户注册成功')
      $('.reg-box a').click()
      $('#regForm')[0].reset()
    });
  })

  // 5. 发送ajax登录账号
  $('#loginForm').on('submit', function (e) {
    e.preventDefault()
    axios({
      url: '/api/login',
      method: 'POST',
      data: $(this).serialize()
    }).then(({
      data: res
    }) => {
      // console.log(res.token)
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg('恭喜您！登录成功')
      // 保存登录令牌
      localStorage.setItem('token', res.token)
      // 登录成功,跳转至主页
      location.href = '/index.html'
    });
  })

})