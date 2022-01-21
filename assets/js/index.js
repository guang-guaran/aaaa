jQuery(function () {
  // 1. 获取用户信息并且渲染到页面上
  getUserInfo()
  // 2. 退出登录功能
  $('#logout').on('click', function () {
    layer.confirm('确认退出登录吗？', {
      icon: 3,
      title: '提示'
    }, function (index) {
      //do something
      // 销毁token 跳转到登录页面
      localStorage.removeItem('token')
      location.href = '/login.html'
      layer.close(index);
    });

  })
})

function getUserInfo() {
  axios({
    url: '/my/userinfo',
    // headers: {
    //   Authorization: localStorage.getItem('token')
    // }
  }).then(({
    data: res
  }) => {
    // console.log(res)
    // if (res.status !== 0) {
    //   return layer.msg(res.message)
    // }

    // 成功获取了用户的信息渲染到页面
    renderAvatar(res.data)
  });
}

function renderAvatar(res) {
  // 优先渲染昵称
  let name = res.nickname || res.username
  $('.welcome').html('欢迎！ ' + name)
  // 判断用户信息里是否有头像
  // 1.   如果有，隐藏文字头像，显示图片头像
  // 2. 如果没有，显示文字头像，隐藏图片头像
  if (res.user_pic) {
    // 1.   如果有，隐藏文字头像，显示图片头像
    $('.userText').hide()
    $('.layui-nav-img').show().prop('src', res.user_pic)
  } else {
    // 2. 如果没有，显示文字头像，隐藏图片头像
    $('.layui-nav-img').hide()
    // 获取用户名称首字母大写
    let frist = name[0].toUpperCase()
    $('.userText').show().html(frist)
  }
}