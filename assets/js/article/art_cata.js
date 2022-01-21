jQuery(function () {
  // 1. 渲染分类列表到页面
  // 封装函数
  renderArtCata()

  function renderArtCata() {
    axios({
      url: '/my/article/cates',
    }).then(({
      data: res
    }) => {
      // console.log(res)
      let htmlArr = []
      res.data.forEach(item => {
        htmlArr.push(`
          <tr>
            <td>${item.Id}</td>
            <td>${item.name}</td>
            <td>${item.alias}</td>
            <td>
              <button data-id="${item.Id}" type="button" class="editBtn layui-btn layui-btn-xs ">修改</button>
              <button data-id="${item.Id}" type="button" class="delBtn layui-btn layui-btn-xs layui-btn-danger">删除</button>
            </td>
          </tr>
        `)
      })
      $('tbody').empty().html(htmlArr.join(''))
    });
  }

  // 2. 新增弹出表单
  let indexAdd = 0
  $('#addArt').on('click', function () {
    indexAdd = layer.open({
      title: '添加文章分类',
      type: 1,
      area: ['500px', '260px'],
      content: `
        <form id="addForm" class="layui-form" action="">
          <!-- 1. 分类名称 -->
          <div class="layui-form-item">
            <label class="layui-form-label">分类名称</label>
            <div class="layui-input-block">
              <input type="text" name="name" required lay-verify="required" placeholder="请输入分类名称" autocomplete="off"
                class="layui-input">
            </div>
          </div>
          <!-- 2. 分类别名 -->
          <div class="layui-form-item">
            <label class="layui-form-label">分类别名</label>
            <div class="layui-input-block">
              <input type="text" name="alias" required lay-verify="required" placeholder="请输入分类别名" autocomplete="off"
                class="layui-input">
            </div>
          </div>
          <!-- 3. 添加重置按钮 -->
          <div class="layui-form-item">
            <div class="layui-input-block">
              <button class="layui-btn" lay-submit lay-filter="formDemo">确认添加</button>
              <button type="reset" class="layui-btn layui-btn-primary">重置</button>
            </div>
          </div>
        </form>
      `
    });
  })

  // 3. 新增文章分类列表
  $('body').on('submit', '#addForm', function (e) {
    e.preventDefault()
    axios({
      url: '/my/article/addcates',
      method: 'POST',
      data: $(this).serialize()
    }).then(({
      data: res
    }) => {
      // console.log(res)
      layer.msg('恭喜您！添加成功')
      renderArtCata()
      // 清空表单
      // $('#addForm')[0].reset()
      // 关闭form添加框
      // layer.close(indexAdd)
    });
  })

  // 4. 修改内容的弹窗
  let indexEdit = 0
  $('tbody').on('click', '.editBtn', function () {
    indexEdit = layer.open({
      title: '修改文章分类',
      type: 1,
      area: ['500px', '260px'],
      content: `
        <form id="editForm" lay-filter="editForm" class="layui-form" action="">
          <!-- 0. 隐藏域获取Id 用来修改所需的参数 -->
          <input type="hidden" name="Id"> 
          <!-- 1. 分类名称 -->
          <div class="layui-form-item">
            <label class="layui-form-label">分类名称</label>
            <div class="layui-input-block">
              <input type="text" name="name" required lay-verify="required" placeholder="请输入分类名称" autocomplete="off"
                class="layui-input">
            </div>
          </div>
          <!-- 2. 分类别名 -->
          <div class="layui-form-item">
            <label class="layui-form-label">分类别名</label>
            <div class="layui-input-block">
              <input type="text" name="alias" required lay-verify="required" placeholder="请输入分类别名" autocomplete="off"
                class="layui-input">
            </div>
          </div>
          <!-- 3. 修改重置按钮 -->
          <div class="layui-form-item">
            <div class="layui-input-block">
              <button class="layui-btn" lay-submit lay-filter="formDemo">确认修改</button>
              <button type="reset" class="layui-btn layui-btn-primary">重置</button>
            </div>
          </div>
        </form>
      `
    });

    // 4.1 首先获取当前点击的列表修改内容
    let id = this.dataset.id
    axios({
      url: '/my/article/cates/' + id,
      method: 'GET',
    }).then(({
      data: res
    }) => {
      // console.log(res)
      form.val('editForm', res.data)
    });

  })

  // 5. 修改文章分类列表
  $('body').on('submit', '#editForm', function (e) {
    e.preventDefault()
    axios({
      url: '/my/article/updatecate',
      method: 'POST',
      data: $(this).serialize()
    }).then(({
      data: res
    }) => {
      // console.log(res)
      layer.msg('恭喜您！添加成功')
      renderArtCata()
      // 清空表单
      $('#editForm')[0].reset()
      // 关闭form添加框
      layer.close(indexEdit)
    });
  })

  // 6. 删除列表
  $('tbody').on('click', '.delBtn', function () {
    let id = this.dataset.id
    axios({
      url: '/my/article/deletecate/' + id,
      method: 'GET',
    }).then(({
      data: res
    }) => {
      // console.log(res)
      layer.msg('恭喜您！删除成功')
      renderArtCata()
    });

    /* layer.confirm('确认删除吗?', {
      icon: 3,
      title: '提示'
    }, function (index) {
      //do something
      layer.close(index);
    }); */

  })
})