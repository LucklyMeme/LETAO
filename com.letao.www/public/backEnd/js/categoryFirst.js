$(function () {
    // 页面载入显示数据
    var getFirstData = function (pageNum) {
        $.ajax({
            type: 'get',
            url: ' /category/queryTopCategoryPaging',
            data: {
                page: pageNum || 1,
                pageSize: 5
            },
            dataType: 'json',
            success: function (data) {
                // console.log(data);
                var categoryFirst = template('categoryFirst-template', data);
                $('table tbody').html(categoryFirst);
                // 分页
                $('.pagination').bootstrapPaginator({
                    // 当前使用的版本bootstrap
                    bootstrapMajorVersion: 3,
                    // 配置的字体大小
                    size: 'small',
                    // 当前页
                    currentPages: data.page,
                    // 一共多少页  总页数= 数据总条数/每页显示的条数
                    totalPage: Math.ceil(data.total / data.size),
                    // 点击页面的事件
                    onPageClicked: function (event, originalEvent, type, page) {
                        //改变当前页在渲染page 当前惦记的按钮的页面
                        getFirstData(page);
                    }
                });
                // 添加校验
               
                $('#first-modal').bootstrapValidator({
                    feedbackIcons: {
                        valid: 'glyphicon glyphicon-ok',
                        invalid: 'glyphicon glyphicon-remove',
                        validating: 'glyphicon glyphicon-refresh'
                    },
                    fields: {
                        //字段名是name属性的值
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
                    // console.log($form.serialize());//键值对
                    // Get the BootstrapValidator instance
                    // var bv = $form.data('bootstrapValidator');
                    // 使用 Ajax 提交数据
                    // serialize()  序列化 
                    // send() 对象-> 机子传的
                    // http 协议要的是什么，key-value
                    // 
                   
                   
                });
                $('#first-modal').on('click', '#save', function () {
                    var a = $('#first-form').serialize();
                    // console.log(a);  
                     $.ajax({
                        url: '/category/addTopCategory',
                        type: 'post',
                        data:a,
                        dataType: 'json',
                        success: function (data) {
                            // console.log(data);
                            // getFirstData();
                            if(data.success==true){
                                $('#first-modal').modal('hide');
                                getFirstData();
                            }

                        }
                    })
                })
               

            }
        })
    }
    getFirstData();


})