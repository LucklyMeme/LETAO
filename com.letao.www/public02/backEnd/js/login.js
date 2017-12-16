$(function () {

  // 1.进行表单验证 --bootstrap-validator 按照现在的情况 是已经废弃了
  // http://blog.csdn.net/u013938465/article/details/53507109
  $('#login-form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      // 字段名是name属性的值
      username: {
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          },
          stringLength: {
            min: 4,
            max: 16,
            message: '用户名长度在1到16位之间'
          },
          callback: {
            message: '用户名不存在'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: '密码不能为空'
          },
          stringLength: {
            min: 6,
            max: 16,
            message: '密码长度在6到16之间'
          },
          different: {
            field: 'username',
            message: '密码不能和用户名相同'
          },
          callback: {
            message: '密码错误'
          }
        }
      }
    }
  }).on('success.form.bv', function (e) {
    // Prevent form submission
    e.preventDefault();
    // Get the form instance
    var $form = $(e.target);
    // console.log($form.serialize());
    // console.log($form); 
    // serialize(); 序列化 
    // send() 对象-- 这是自己传
    // http协议要的是什么 键值对  key=value&key1=value1
    // Get the BootstrapValidator instance
    var bv = $form.data('bootstrapValidator');
    // 使用ajax提交表单数据
    $.ajax({
      type: 'post',
      url: '/employee/employeeLogin',
      data: $form.serialize(),
      dataType: 'json',
      success: function (data) {
        // console.log(data);
        if (data.success == true) {
          location.href = './index.html';
        } else if (data.error == 1001) {
          // 密码错误
          $('#login-form').data("bootstrapValidator").updateStatus("password", "INVALID", 'callback');
        } else if (data.error == 1000) {
          // 用户名不存在
          $('#login-form').data("bootstrapValidator").updateStatus("username", "INVALID", 'callback');
        }
      }
    })
  });
})