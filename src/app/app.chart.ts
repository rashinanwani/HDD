import * as Highcharts from 'highcharts';
declare var require: any;
let Highcharts3D = require('highcharts/highcharts-3d');
let HighchartsStock = require('highcharts/modules/stock.js');
Highcharts3D(Highcharts);
HighchartsStock(Highcharts)

export class Chart {
    public scatter_options: any = {
        chart: {
            type: 'area',
            // type:'scatter',
            // type:'areaspline',
            zoomType: 'xy',
            height: '45%'
            // width:'100%'
            // height: 700
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">Size: </td>' +
                '<td style="padding:0"><b>{point.y:.5f} MB</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        boost: {
            useGPUTranslations: true,
            usePreAllocated: true
        },
        title: {
            text: '',
        },
        credits: {
            enabled: false
        },
        xAxis: {
            title: {
                text: 'List of Files/Directories changed'
            },
            // categories: this.grph_arr1,
            visible: false
        },
        yAxis: {
            // Renders faster when we don't have to compute min and max
            min: 0,
            // max: 9999,
            minPadding: 0,
            maxPadding: 0,
            title: {
                text: 'Size (MB)'
            }
        },
        series: [
            {
                marker: {
                    radius: 2.5
                },
                name: 'Size of Files today',
                color: 'rgba(224, 194, 0, 0.90)',
                // color: 'rgba(54, 124, 43, 1)',
                // data: this.grph_arr

            }, {

                marker: {
                    radius: 2.5
                },
                name: 'Size of Files in Backup',
                color: 'rgba(54, 124, 43, 1)',
                // data: this.grph_arr0

            }]

    };

    public radial_options: any = {
        chart: {
            type: 'column',
            // width:'75%'
            height: '73.2%',
            // options3d: {
            //     enabled: true,
            //     alpha: 0,
            //     beta: 0,
            //     viewDistance: 30,
            //     depth: 40
            // },
        },
        // boost: {
        //     useGPUTranslations: true,
        //     usePreAllocated: true
        // },
        title: {
            text: 'Used Space in Servers'
        },
        xAxis: {
            type: 'category',
            visible: true,
            crosshair: true,
            min:0,
            max:3,
            // categories: this.bar_arr
             scrollbar: {
                enabled: true
            },
            //  title: {
            //     text: 'Server Name'
            // }
        },
        yAxis: {
            // type:'category',
            min: 0,
            title: {
                text: 'Size (MB)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.5f} MB</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.3,
                borderWidth: 0,
                stacking: 'normal'
            }
        },
        series: [{
            name: 'Empty Space',
            color: 'rgba(253, 218, 1, 1)',
            // data: this.bar_arr1,
            shadow: true
        },
        {
            name: 'Occupied Space',
            color: 'rgba(54, 124, 43, 1)',
            // data: this.bar_arr2,
            shadow: true

        }]

    };

    public line_options: any = {
        chart: {
            // type: 'line',
            zoomType: 'xy',
            height: '73.2%',
            // width:'65%'
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">Size: </td>' +
                '<td style="padding:0"><b>{point.y:.5f} MB</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        title: {
            text: ''
        },
        xAxis: {
            // categories: this.line_arr,
            crosshair: true,
            visible: true,
            title: {
                text: 'Date MM/DD/YYYY'
            },
            // labels: {
            //   enabled: false
            // } 
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Size (MB)'
            }
        },
        // plotOptions: {
        //      series: {
        //         labelOptions: {
        //             connectorAllowed: false,
        //             text:'hello'
        //         },
        //         enableMouseTracking: true
        //     }
        // },
        series: [{
            marker: {
                radius: 2.5
            },
            // name:this.serverControl.value,
            name: 'Variation in Size',
            // data: this.line_arr0,
            color: 'rgba(54, 124, 43, 1)'
        }]
    };

    public folder_pie_options: any = {
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: 'Drive Distribution Chart'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        tooltip: {
            pointFormat: '{Space Occupied }: <b>{point.percentage:.9f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                colors: this.pieColors(10),
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        series: [{
            // type: 'pie',
            name: 'Drive Data Distribution',
            // data: this.folder_pie_arr
        }]
    };

    public drive_pie_options: any = {
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: 'Drive Distribution Chart'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        tooltip: {
            pointFormat: '{Space Occupied }: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                colors: this.pieColors(10),
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        series: [{
            // type: 'pie',
            name: 'Drive Data Distribution',
            // data: this.drive_pie_arr
        }]
    };

    public linear_reg_options: any = {
        chart: {
            zoomType: 'xy',
        },
        title: {
            text: 'Linear Regression Chart for Server Size vs Days'
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">Days : {point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">Size: </td>' +
                '<td style="padding:0"><b>{point.y:.5f} MB</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        series: [{
            type: 'line',
            name: 'Regression Line',
            // data: this.reg_arr,
            color: 'rgba(224, 194, 0, 0.90)',
            marker: {
                enabled: true,
                radius: 4
            },
            states: {
                hover: {
                    lineWidth: 1.5
                }
            },
            enableMouseTracking: false
        }, {
            type: 'scatter',
            name: 'Server Size',
            /*  yAxis: {
                     min:0,
              max:9000000
             
                   }, */
            // data: this.reg_arr0,
            color: 'rgba(54, 124, 43, 1)',
            marker: {
                radius: 4
            }
        }]
    };

    public stock_chart_options: any = {
         chart: {
            zoomType: 'xy',
        },
        title: {
            text: 'Server Size Over Time'
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">Days : {point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">Size: </td>' +
                '<td style="padding:0"><b>{point.y:.5f} MB</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
       xAxis: {
            // categories: this.reg_arr,
            type:'datetime',
            ordinal: false,
            title: {
                text: 'Date MM/DD/YYYY'
            }
       },
        navigator: {
            handles: {
                backgroundColor: 'rgba(54, 124, 43)',
            },
            maskFill: 'rgba(54, 124, 43, 0.2)',
            series: {
                lineColor: 'rgba(54, 124, 43)'
            }
         },
        rangeSelector: {  
            buttons: [{
                type: 'month',
                count: 1,
                text: '1m'
                // events: {
                //     click: function() {
                //         alert("Clicked button");
                //     }
                // }
            }, {
                type: 'month',
                count: 3,
                text: '3m'
            }, {
                type: 'month',
                count: 6,
                text: '6m'
            }, {
                type: 'ytd',
                text: 'YTD'
            }, {
                type: 'year',
                count: 1,
                text: '1y'
            }, {
                type: 'all',
                text: 'All'
            }]
        },
           series: [{
            name: 'Server Size',
            color: 'rgba(54, 124, 43, 1)',
            tooltip: {
                valueDecimals: 2
            }
        }]
    };

    pieColors(len) {
        // var  base = '#367c2b'
        var base = Highcharts.getOptions().colors[2]
        let colors = []
        for (let i = 0; i < len; i += 1) {
            // Start out with a darkened base color (negative brighten), and end
            // up with a much brighter color
            colors.push(Highcharts.color(base).brighten((i - 3) / 7).get());
        }
        return colors;
    }
}