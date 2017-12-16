$(function () {
  // 页面载入显示数据
  var getFirstData = function (pageNum) {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: pageNum || 1,
        pageSize: 5
      },
      dataType: 'json',
      success: function (data) {
        console.log(data);
        var firstResult = template('first-template', data);

        $('tbody').html(firstResult);
        // 分页
        $('.pagination').bootstrapPaginator({
          /*当前使用的是3版本的bootstrap*/
          bootstrapMajorVersion: 3,
          /*配置的字体大小是小号*/
          size: 'small',
          /*当前页*/
          currentPage: data.page,
          /*一共多少页*/
          // 总页数=数据的总数/每页显示多少条数据
          totalPages: Math.ceil(data.total / data.size),
          /*点击页面事件*/
          onPageClicked: function (event, originalEvent, type, page) {
            /*改变当前页再渲染 page当前点击的按钮的页面*/
            getFirstData(page);
          }
        });
      }
    })
  }

  getFirstData();


  // 添加--校验

  // http://blog.csdn.net/u013938465/article/details/53507109
  $('#first-form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      // 字段名是name属性的值
      categoryName: {
        validators: {
          notEmpty: {
            message: '一级分类名称不能为空'
          }
        }
      }
    }
  }).on('success.form.bv', function (e) {
    // Prevent form submission
    e.preventDefault();
    // Get the form instance
    // var $form = $(e.target);
    // console.log($form.serialize());
    // console.log($form); 
    // serialize(); 序列化 
    // send() 对象-- 这是自己传
    // http协议要的是什么 键值对  key=value&key1=value1
    // Get the BootstrapValidator instance
    // var bv = $form.data('bootstrapValidator');
    // 使用ajax提交表单数据

  });

  $('#first-modal').on('click','#save',function(){
    // console.log(1);
   var formData= $('#first-form').serialize();
  //  console.log(cc);
    $.ajax({
      type: 'post',
      url: '/category/addTopCategory',
      data: formData,
      dataType: 'json',
      success:function(data){
        // console.log(data);
        // getFirstData();
        if(data.success == true) {
          $('#first-modal').modal('hide');
          getFirstData();
        }
      }
    })
  })
})