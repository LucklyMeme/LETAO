// 主线
// 1 当页面打开后 到search.html 要获取搜索历史记录
// 如果没有历史记录，告诉用户没有记录

// 2 当用户再输入框中输入搜索词
// 应该把用户输入的搜索词加入到历史记录

// 3 当用户点击删除按钮  我们要删除一条数据

// 4 显示所有的记录
// 以上功能技术用localstorage()
// localstorage 本地存储 实际上归属于客户端存储
// 设置值：localstorage.setItem(key,value);
// 获取值： localstorage.getItem(key);
// 移出值：localStorage.removeItem(key);
// 移除值: localStorage.removeItem(key);
// 清除所有记录：localstage.clear();

// 在js 中，json和对象或数组 有一个转换方法
// 如果将对象或取组转换为json 用的是 JSON.stringify()方法
// 如果将json的数据转换为对象或数组 用的是 JSON.parse()

$(function () {
    //setHistoryData('nike');
    // 1 当页面载入的时候载入历史记录
    showHistoryData();
    // 2 点击搜索按钮时 把关键词加入到历史记录中
    var searchInput = $(".search-box input");
    $("#searchbtn").on('tap',function(){
       // 
       var keyword = searchInput.val();
       location.href="./searchList.html?proName="+keyword;
       setHistoryData(keyword);
       showHistoryData();
      
       //console.log(keyword);
    })
    // 3 点击 删除数据  清空历史记 录
    $("#clear-history").on('tap',function(){
    //     //为什么不用clear（） 怕影响其他网站
   
         //localStorage.removeItem('ltHistory');
         console.log(1);
        //  localStorage.removeItem('ltHistory');
        //  localStorage.clear();
         //localStorage.removeItem('ltHistory');
    $(".search-history-list").remove();
    })
    // 4 删除 一行
  $(".search-history-list").on('tap','i',function(){
    //  var deleteData = $(this).siblings("span").html();
    //  //console.log(deleteData);
    //  removeHistoryData(deleteData);
    //  showHistoryData();
    $(this).parent().remove();
  })
  // 5 点击 li 的搜索词跳转
  $(".search-history-list").on('tap','span',function(){
      var keyword = $(this).html();
      console.log(keyword);
      location.href="./searchList.html?proName="+keyword;
  })
})

// 获取搜索记录
var getHistoryData = function () {
    return JSON.parse(window.localStorage.getItem('ItHistory') || '[]');
}
//console.log(getHistoryData());

// 设置搜索记录
// key = value
//ltHistory = '["nike","add"]'
var setHistoryData = function (value) {
    // 获取历史记录
    var list = getHistoryData();
    // 遍历数组(去除重复数据)
    $.each(list, function (i, item) {
        if (value == item) {
            // 去除当前重复的
            list.splice(i, 1);
        }
    })
    list.push(value);
    localStorage.setItem('ItHistory', JSON.stringify(list));
}

// 移出数据
// key = value
// ItHistory  '["nike"]'
//  思路：首先要获取到历史记录
// var removeHistoryData = function (value) {
//     // 获取历史记录
//     var list = getHistoryData();
//     // 找到和历史记录中一样的数据，切掉
//     $.each(list, function (i, item) {
//         if (value == item) {
//             list.splice(i, 1);
//         }
//     })
//     // 把切掉后的数组放回到历史记录中
//     window.localStroage.setItem('ltHistory',JSON.stringify(list));
    
// }

var removeHistoryData = function(value){
    var list = getHistoryData();//获取历史记录
  
    // 找到和历史记录列表中的某一项一样的数组元素 切掉
    $.each(list,function(i,item){
      if(value == item) {
        list.splice(i,1);
      }
    })
  
    // 把切掉的后的数组 放回历史记录中
    window.localStorage.setItem('ltHistory',JSON.stringify(list));
  }
  
// 显示历史记录
var showHistoryData = function () {
    var list = getHistoryData();// 空数组或有个长度的数组
    if (list.length == 0) {
        // 告诉用户没有历史记录（empty显示 list的父级隐藏）
        $(".search-histroy").hide();
        $(".empty-history").show();
    } else {
        //显示历史记录
        var ItHistory = template('searchTemplate', {
            list: list
        });
        //  添加到 list中 让list的父级 显示 empty隐藏
        $(".search-history-list").html(ItHistory);
        $(".search-histroy").show();
        $(".empty-history").hide();
    }
}