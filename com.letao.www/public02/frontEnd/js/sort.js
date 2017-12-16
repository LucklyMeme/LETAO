

// 分类页
$(function(){
//console.log(2);
    //url:  /category/queryTopCategory
    // 1 声明 一个获取一级分类的方法
    var getFirstData = function(){
        $.ajax({
            type:'get',
            url:' /category/queryTopCategory',
            data:{},
            success:function(data){
               //console.log(data);
               var firstResult = template("firstTemplate",data)
              $('.lt-sort-left ul').html(firstResult)
              getSecondData(data.rows[0].id);
               
            }
        })
    }
    // 调用 getFirstData();方法
    getFirstData();
       
//   当我们进入页面 就需要传数据 
//  进入页面时 id  data.rows[0].id
//   2  二级分类
   var getSecondData = function(id){
      
       $.ajax({
           type:'get',
           url:' /category/querySecondCategory',
           data:{
               id:id
           },
           success:function(data){
           var  secondResult = template("secondTemplate",data);
           $(".lt-sort-right").html(secondResult);
           }
       })
   }
// 3  点击事件 点击一个一级分类  动态显示二级分类
$('.lt-sort-left ul').on('tap','a',function(){
    var id = $(this).attr('data-id');
    //console.log(id);
    $('.lt-sort-left').find('a').removeClass('active');
    $(this).addClass('active'); 
    getSecondData(id);
    
})

})