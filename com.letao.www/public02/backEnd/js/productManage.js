$(function () {
    var getProductData = function (pageNum) {
        // 产品查询
        $.ajax({
            type: 'get',
            url: '/product/queryProductDetailList',
            data: {
                page: pageNum || 1,
                pageSize: 5
            },
            success: function (data) {
                //console.log(data);
                var productResult = template("product-template", data);
                $("tbody").html(productResult);
            }
        })
    }
    getProductData();
    initUpload();


    //表单校验
    //id |是|产品id
    //proName|是|产品名称
    //oldPrice|是|老价格
    //price|是|价格
    //proDesc|是|产品描述
    //size|是|产品尺寸
    //statu|是|产品上下架
    //num|是|用户库存
    //brandId|是|归属品牌
    //pic图片数组[{"picName":"24-1.png","picAddr":"product/24-1.png"},{"picName":"24-1.png","picAddr":"product/24-1.png"}]

    $('#productform').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            // 字段名是name属性的值
            proDesc: {
                validators: {
                    notEmpty: {
                        message: '商品描述不能为空'
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: '商品库存不能为空'
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: '商品价格不能为空'
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: '商品名称不能为空'
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: '商品原价不能为空'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: '商品尺码不能为空'
                    }
                }
            }

        }
    }).on('success.form.bv', function (e) {
        // Prevent form submission
        e.preventDefault();
        // Get the form instance
        var $form = $(e.target);
        console.log(1);
        // console.log($form.serialize());
        // console.log($form); 
        // serialize(); 序列化 
        // send() 对象-- 这是自己传
        // http协议要的是什么 键值对  key=value&key1=value1

        // $.ajax({
        //   type: 'post',
        //   url: '/category/addSecondCategory',
        //   data: data,
        //   success: function (data) {
        //     //console.log(data);

        //   }
        // })
        //校验表单
        //id |是|产品id
        //proName|是|产品名称
        //oldPrice|是|老价格
        //price|是|价格
        //proDesc|是|产品描述
        //size|是|产品尺寸
        //statu|是|产品上下架
        //num|是|用户库存
        //brandId|是|归属品牌
        //pic图片数组[{"picName":"24-1.png","picAddr":"product/24-1.png"},{"picName":"24-1.png","picAddr":"product/24-1.png"}]

        // 发送 ajax 请求
        var data = $form.serialize();
       // console.log(data);
        // proName=ds
        // &proDesc=asd
        // &num=asdfa&
        // price=asfd
        // &oldPrice=asdf
        // &size=asfd
        // http 协议 key1=value1 & key2=value2
        $.each(picList,function(i,item){
            //console.log(i,item);
            data+='&picName'+(i+1)+'='+item.picName+'&picAddr'+(i+1)+'='+item.picAddr;
        })
       
        data= data+'$brandId=4';
        //console.log(data);
        // proName=s
        // &proDesc=s
        // &num=s
        // &price=s
        // &oldPrice=s
        // &size=s
        // $picName1=1b503670-c850-11e7-a719-b717ed56de5e.jpg
        // &picAddr2=/upload/product/1b503670-c850-11e7-a719-b717ed56de5e.jpg$picName11=1e307300-c850-11e7-a719-b717ed56de5e.jpeg&picAddr11=/upload/product/1e307300-c850-11e7-a719-b717ed56de5e.jpeg$picName21=21245ea0-c850-11e7-a719-b717ed56de5e.jpg
        // &picAddr3=/upload/product/21245ea0-c850-11e7-a719-b717ed56de5e.jpg
         $.ajax({
            type:'post',
            url:'/product/addProduct',
            data:data,
            success:function(data){
           // console.log(data);
           // 隐藏
            $("#product-modal").modal('hide');
          // 刷新 
            getProductData();
            }
        })
    })

})


// 上传 
var picList = [];
var initUpload = function () {
    // 上传 的id是type=input的id
    $('#pic').fileupload({
        // 找到上传图片的接口
        url: '  /product/addProductPic',
        done: function (e, data) {
            //console.log(data.result);
            //预览区
            //console.log(data);
            //创建一个img标签用于图片预览
            $(".fileupload").append('<img width="80" height="auto" src="'+data.result.picAddr+'" alt="">');
            //console.log(data.result);
            picList.push(data.result);
            
          
        }

    });
}


