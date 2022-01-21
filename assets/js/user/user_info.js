jQuery(function () {
  // 1. 验证昵称
  // // 声明layer方法
  // let layer = layui.layer
  // // 声明form方法
  // let form = layui.form
  form.verify({
    nickname: [
      /^[\S]{1,10}$/,
      '昵称的长度为1-10的非空字符串'
    ]
  })
  // 2. 渲染用户信息
  initUserInfo()

  function initUserInfo() {
    axios({
      url: '/my/userinfo',
    }).then(({
      data: res
    }) => {
      // console.log(res)
      // if (res.status !== 0) {
      //   return layer.msg(res.message)
      // }
      // 获取用户的信息赋值给form表单  layui的赋值方法 form.val('lay-filter="form表单这个属性值", 赋值内容')
      form.val('userinfoForm', res.data)
    });
  }

  // 3. 重置按钮
  $('#btnReset').on('click', function (e) {
    e.preventDefault()
    initUserInfo()
  })

  // 4. 修改用户信息
  $('form').on('submit', function (e) {
    e.preventDefault()
    axios({
      url: '/my/userinfo',
      method: 'POST',
      data: $(this).serialize()
    }).then(({
      data: res
    }) => {
      // console.log(res)
      // if (res.status !== 0) {
      //   return layer.msg(res.message)
      // }
      // window 为当前user页面 .parent才能找到父元素index里的getUserInfo方法
      window.parent.getUserInfo()
    });
  })
})