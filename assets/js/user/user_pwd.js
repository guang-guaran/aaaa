jQuery(function () {
  // 1. 自定义校验规则
  // console.log(111)
  form.verify({
    pwd: [
      /^[\S]{6,15}$/,
      '密码的必须是6-15位的非空字符'
    ],
    newPwd: function (value) {
      let v1 = $('[name="oldPwd"]').val()
      if (v1 === value) {
        return '新旧密码不能相同！'
      }
    },
    cfmPwd: function (value) {
      let v2 = $('[name="newPwd"]').val()
      if (v2 !== value) {
        return '两次新密码不一致!'
      }
    }
  })

  // 2. 修改密码
  $('#cfmPwdForm').on('submit', function (e) {
    e.preventDefault()
    axios({
      url: '/my/updatepwd',
      method: 'POST',
      data: $(this).serialize()
    }).then(({
      data: res
    }) => {
      // console.log(res)
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg('恭喜您！密码修改成功')
      $('#cfmPwdForm')[0].reset()
      // 销毁token 跳转到登录页面
      localStorage.removeItem('token')
      setTimeout(() => {
        // 登录成功,跳转至主页
        window.parent.location.href = '/login.html'
      }, 1000);

    });

  })
})