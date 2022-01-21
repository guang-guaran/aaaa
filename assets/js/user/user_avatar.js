jQuery(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  // 2. 上传文件
  $('#uploadBtn').on('click', function () {
    $('#imgFile').click()
  })

  // 3. 听说 file表单和change事件搭配更佳哦~
  $('#imgFile').on('change', function () {
    // 3.1 获取是文件对象
    let file = this.files[0]
    // 3.2 判断时候有图片
    if (!file) {
      return layer.msg('上传头像，不能为空')
    }

    // 把图片文件对象转换为路径
    let url = URL.createObjectURL(file)
    // 3.3 获取图片路径 修改选择的图片
    //     销毁旧的裁剪区域  // 销毁旧的裁剪区域   // 重新初始化裁剪区域
    $image.cropper('destroy').attr('src', url).cropper(options)
  })

  // 4. 确认图片渲染到页面
  $('#cfmBtn').on('click', function () {
    // 4.1 转换64格式的字符串
    var dataURL = $image.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
      width: 100,
      height: 100
    }).toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

    // 4.2 发送ajax请求 渲染到页面
    axios({
      url: '/my/update/avatar',
      method: 'POST',
      data: 'avatar=' + encodeURIComponent(dataURL)
    }).then(({
      data: res
    }) => {
      // console.log(res)
      // if (res.status !== 0) {
      //   return layer.msg(res.message)
      // }
      layer.msg('恭喜您！上传头像成功')
      window.parent.getUserInfo()
    });
  })
})