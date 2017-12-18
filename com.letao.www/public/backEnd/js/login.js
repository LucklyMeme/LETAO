// 进行表单验证插件 bootstrap-validator 按照现在的情况，已经被废弃
// https://www.cnblogs.com/nele/p/5493414.html
$(function(){
    $('#login-form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            //字段名是name属性的值
            username: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    stringLength: {
                        min: 1,
                        max: 16,
                        message: '用户名长度在1到16位之间'
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
                    callback:{
                        message:'密码错误'
                    },
                }
            }
        }
    }).on('success.form.bv', function (e) {
        // Prevent form submission
        e.preventDefault();
        // Get the form instance
        var $form = $(e.target);
        // console.log($form.serialize());//键值对
        // Get the BootstrapValidator instance
        var bv = $form.data('bootstrapValidator');
        // 使用 Ajax 提交数据
        // serialize()  序列化 
        // send() 对象-> 机子传的
        // http 协议要的是什么，key-value
        // 
        $.ajax({
            url: '/employee/employeeLogin',
            type: 'post',
            data:$form.serialize(),
            dataType:'json',
            success: function (data) {
                // console.log(data);
                if(data.success == true){
                    location.href='./index.html';
                }else if(data.error == 1001){
                    // "密码错误"
                    $('#login-form').data('bootstrapValidator').updateStatus('password','INVALID','callback');
                }else if(data.error ==1000){
                    // 用户名不存在
                    $('#login-form').data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');
                }
                
            }
        })
    });
})