$(function () {
    //获取呈现数据
    var getUserManageData = function (pageNum) {
        $.ajax({
            url: '/user/queryUser',
            type: 'get',
            data: {
                page: pageNum || 1,
                pageSize: 10
            },
            success: function (data) {
                // console.log(data);
                var userManageList = template('userManage-template', data);
                //吧哪到的数据插入发到页面中  html 覆盖
                $('table tbody').html(userManageList);
                //分页
                // $('tbody').on('click', '.btn', function () {
                //     var name = $(this).data('name');
                //     var id= $(this).data('id');
                //     $('#manage-modal').find('.alert').html('<i class="glyphicon glyphicon-info-sign"></i>您确定要退出'+name+'吗？')

                
                // 弹出遮罩层禁止用户
                // $('#manage-modal').on('click', '.btn-pramiry', function () {
                //     $.ajax({
                //         type: 'post',
                //         url: '/user/updateUser',
                //         data:{
                //             id:id
                //         },
                //         success:function(data){
                //             console.log(data);
                //         }
                //     })
                // })
                // })
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
                        getUserManageData(page);
                    }
                })
            }
        })
    }
    //页面载入完成调用ajax呈现数据
    getUserManageData();
    $('tbody').on('click','.btn',function(){
        var id=$(this).data('id');
        var name= $(this).data('name');
        var isDelete = $(this).hasClass('btn-danger')?1:0;
        // console.log(isDelete);
        if(isDelete==1){
            $('#manage-modal').find('.alert').html('<i class="glyphicon glyphicon-info-sign"></i>您确定要启用' + name +'吗？');
            // console.log(0);
        }else{
            $('#manage-modal').find('.alert').html('<i class="glyphicon glyphicon-info-sign"></i>您确定要禁用' + name + '吗？');
            // console.log(1);
        }
        $('#manage-modal').on('click', '.btn-pramiry', function () {
            $.ajax({
                type: 'post',
                url: '/user/updateUser',
                data: {
                    isDelete: isDelete,
                    id: id
                },
                success: function (data) {
                    // console.log(data);
                    if(data.success==true){
                        $('#manage-modal').modal('hide');
                        getUserManageData();
                    }
                }
            })
        });
       
    })


})