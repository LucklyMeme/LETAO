$(function () {
  // 获取数据列表
  var getSecondData = function (pageNum) {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: pageNum || 1,
        pageSize: 5
      },
      dataType: 'json',
      success: function (data) {
        // console.log(data);
        var secondResult = template('second-template', data);
        $('tbody').html(secondResult);

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
            getSecondData(page);
          }
        });




      }
    })
  }

  getSecondData();

  initDropDown();
  initUpload();


  // 校验

  $('#secondform').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      // 字段名是name属性的值
      brandName: {
        validators: {
          notEmpty: {
            message: '二级分类不能为空'
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
    // 1.验证 这个表单校验插件是否运行
    // 2.提交ajax
    //  2.1 看接口
    // 接口需要的数据有:
    // brandName 品牌名称
    // categoryId 所属分类
    // brandLogo 品牌logo地址
    // 写成http协议要求的格式 
    // var data = $form.serialize();
    // console.log(data); //
    // categoryId=5
    // &brandName=%E6%9D%8E%E5%AE%81
    // &brandLogo=%2Fupload%2Fbrand%2Fed9039d0-c776-11e7-8f9d-954ba41349c7.jpg

    // $.ajax({
    //   type: 'post',
    //   url: '/category/addSecondCategory',
    //   data: data,
    //   success: function (data) {
    //     //console.log(data);

    //   }
    // })
    //校验表单
   // console.log(1);
   //提交ajax 调用接口
   // brandName|是|品牌名称
    //categoryId|是|所属分类id
    //brandLogo|是|品牌logo图片地址
    //hot|是|火热的品牌
    // http 要求的格式 键 值对形式
    var data = $form.serialize();
   console.log(data);
   //categoryId=4
   //&brandName=%E7%9A%84%E7%88%B6VB
   //&brandLogo=%2Fupload%2Fbrand%2Ff5c1cba0-c7c6-11e7-bc2f-4561a20603fa.jpg
   $.ajax({
     type:'post',
     url:'/category/addSecondCategory',
     data:data,
     success:function(data){
       console.log(data);
     }
   })
  });










})

// 1. 声明一个函数
// var initDropDown = function () {
//   var dropdown = $('.dropdown');
//   //   console.log(1);
//   // 2.发起ajax请求
//   dropdown.click(function () {
//     $.ajax({
//       type: 'get',
//       url: "/category/queryTopCategoryPaging",
//       data: {
//         page: 1,
//         pageSize: 100
//       },
//       dataType: 'json',
//       success: function (data) {
//         console.log(data);
//         // 把数据给添加到dropmenu
//         // 1.遍历data中的数据
//         // $.each(将要被遍历的数组,function(i(索引),item(遍历出的每一项)){}})
//         var html = '';
//         $.each(data.rows, function (i, item) {
//           console.log(i,item);
//           html += '<li><a href="javascript:;" data-id="'+item.id+'" >' + item.categoryName + '</a></li>'
//         })
//         // 2.将数据插入到ul中
//         $('.dropdown-menu').html(html);
//         $('.dropdown-menu').on('click', 'a', function () {
//           $('.dropdown-text').html($(this).html());
//           $('#categoryId').val($(this).attr('data-id'));
//         })
//       }
//     })
//   })
// }


// // 2.上传 
// var initUpload = function () {
//   // 下面的id是type=file类型的input的id
//   $("#secondupload").fileupload({
//     // 找到上传图片的接口
//     url: "/category/addSecondCategoryPic",
//     done: function (e,data) {
//       // console.log(data);
//       $('#previewimg').attr('src',data.result.picAddr);
//       $('#brandLogo').val(data.result.picAddr);
//     }
//   })
// }

var initDropDown = function () {
  var dropdownMenu = $(".dropdown");

  dropdownMenu.click(function () {

    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: 'json',
      success: function (data) {
        //console.log(data);
        // 把数据添加到dropmenu 
        //1 遍历data 数据
        //  $.each(将要被遍历的数组，function(i,(索引)，item(遍历出的每一项){}))
        var html = "";
        $.each(data.rows, function (i, item) {
          //console.log(i,item);
          html += '<li><a href="javascript:;" data-id="'+item.id+'" >' + item.categoryName + '</a></li>'
          //2 插入到 ul中
          $(".dropdown-menu").html(html);
          $(".dropdown-menu").on("click", "a", function () {
            // html()方法 覆盖
            var a =$(this).html();
            //console.log(a);
            $(".dropdown-text").html(a);
            $("#categoryId").val($(this).attr("data-id"));
          })
        });


      }
    })
  })
}
// 上传 
var initUpload=function(){
  // 上传 的id是type=input的id
  $('#secondupload').fileupload({
    // 找到上传图片的接口
    url:' /category/addSecondCategoryPic',
    done:function(e,data){
      //console.log(data.result);
      //预览区
      $("#previewimg").attr('src',data.result.picAddr);
     $("#brandLogo").val(data.result.picAddr);
    }

 });
}


