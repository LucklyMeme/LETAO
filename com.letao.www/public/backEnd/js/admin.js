// 该文件是功能是用来Js交互的

//进度条  不要让进度条显示圆圈
// NProgress.configure({ showSpinner: true });
NProgress.configure({ showSpinner: false });
// 当ajax 请求发起的时候，让进度条开始
//$.ajax({
// type: 请求方式
// url:  请求方式
// data：请求数据
// beforesend:function(){}请求开始的回调
// success:function(){}   请求成功的回调
// error：function(){}    请求失败的回调
// complete:function(){}  不论成功还是失败都会调用的方法

// ajax全局事件
// $ajax().ajaxStart:function(){}    ajax请求开始前
// $ajax().ajaxSend:function(){}     ajax 请求开始时
// $ajax().ajaxSuccess:function(){}  ajax获取数据后
// $ajax().ajaxComplete:function(){} ajax请求完成后
// $ajax().ajaxError:function(){}    ajax请求发生错误后
// $ajax().ajaxStop:function(){}     ajax请求停止后


//当页面中某一个ajax请求发起时进度条开始
$().ajaxStart(function () {
    Nprogress.start();
})
//当ajax 请求完成的时候，让进度条完成
$(window).ajaxComplete(function () {
    NProgress.done();
})

// 2 点击左侧的菜单 menu 按钮，让左侧的内容消失，右侧沾满整屏
// 步骤：
// 属性选择器[]
// var cc = $('[data-menu]');
// console.log(cc);
$('[data-menu]').on('click',function(){
    $('.lt-aside').toggle();
    $('.lt-section').toggleClass('togglemenu');
})

// 3 功能 点击分类管理 滑出 菜单
//事件委托
$('.lt-aside .menu').on('click','[href="javascript:;"]',function(){
    // console.log(1);
    var _this = $(this);
    var child = _this.siblings();
    // console.log(child);
    // child.toggle();
    child.slideToggle();
})
// 4  功能：点击按钮 弹出遮罩层 发起请求 退出用户登录
// 1 点击确定按钮
$('#logout-modal').on('click','.btn-primary',function(){
// 2 发起ajax请求
// console.log(1);
$.ajax({
    url:' /employee/employeeLogout',
    type:'get',
    dataType:'json',
    data:{},
    success:function(data){
        // console.log(data);
        if(data.success == true){
            // 组件 隐藏方法
            $('#logout-modal').modal('hide');
            setTimeout(function(){
                location.href = './login.html';
            },500);
            
        }
    }
})
// 3 收到成功
// 4 隐藏遮罩层 把地址定位到登录页
})

