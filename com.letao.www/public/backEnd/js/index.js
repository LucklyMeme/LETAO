// 该文件是现实 echarts图表的
$(function () {
    //获取盛柱状图元素
    var firstDom = document.querySelector('.picTable:first-child');


    //为ECharts准备一个具备大小（宽高）的Dom
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(firstDom);

    option = {
        title: {
            text: '2017年注册人数'
        },
        color: ['red'],
        tooltip: {// 阴影效果
            trigger: 'axis',
            axisPointer: {     // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: ['人数']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['一月', '二月', '三月', '四月', '五月', '六月'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '人数',
                type: 'bar',
                barWidth: '60%',
                data: [10, 52, 200, 334, 390, 330]
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    //饼图
    var secondDom = document.querySelector('.picTable:last-child');
    // 基于准备好的dom，初始化echarts实例
    var pieChart = echarts.init(secondDom);
    secondoption = {
        title: {
            text: '热门品牌销售',
            subtext: '2017年6月',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克', '阿迪', '百伦', '安踏', '李宁']
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    { value: 335, name: '耐克' },
                    { value: 310, name: '阿迪' },
                    { value: 234, name: '百伦' },
                    { value: 135, name: '安踏' },
                    { value: 1548, name: '李宁' }
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    pieChart.setOption(secondoption);

})

