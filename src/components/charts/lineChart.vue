<template>
    <v-card flat height="408px">
        <v-card-title class="mb-n12">
            <v-row>
                <v-col cols="12" md="2">
                    اعداد الوفيات
                </v-col>
                <v-col class="mt-n6 hidden-xs-only" cols="12" md="10">
                    <v-row justify="end">
                        <v-col cols="12" md="3">
                            <v-col>
                                <h1  class="grey--text text--darken-1 font-weight-medium">{{iraqDeathPercentage}}%</h1>
                            </v-col>
                            <v-col class="mt-n6 grey--text text--lighten-1">
                                <h6>نسبة الوفيات في العراق</h6>
                            </v-col>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-col>
                                <h1  class="grey--text text--darken-1 font-weight-medium">{{worldDeathPercentage}}%</h1>
                            </v-col>
                            <v-col class="mt-n6 grey--text text--lighten-1">
                                <h6>نسبة الوفيات في العالم</h6>
                            </v-col>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-card-title>
        <v-card-text class="mt-n12">
           <v-row>
               <v-col cols="11">
                   <div
                           class="barChart"
                           ref="BankCountChart"
                           style="height:300px"
                   ></div>
               </v-col>
           </v-row>
        </v-card-text>
    </v-card>
</template>
<script>
    import echarts from "echarts";
    export default {
        props: {
            iraqChartData: Array,
            cardTitle: String,
            iraqDeathPercentage : String,
            worldDeathPercentage : String
        },
        methods: {
            showChart() {
                const date = [];
                const iraqDeaths = [];
                const worldDeaths = []
                this.iraqChartData.forEach(item => {
                    date.push(item.date);
                    iraqDeaths.push(item.deaths);
                });
                const BankCountChart = echarts.init(this.$refs.BankCountChart);
                const option = {
                    color: [ "#B8D7FF","#92F0E6"],
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "cross"
                        }
                    },
                    dataZoom: [
                        {
                            show: true,
                            realtime: true,
                            start: 65,
                            end: 85
                        },
                        {
                            type: "inside",
                            realtime: true,
                            start: 65,
                            end: 85
                        }
                    ],
                    grid: {
                        left: "3%",
                        right: "4%",
                        bottom: "3%",
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: "category",
                            data: date,
                            boundaryGap : false,
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: "value"
                        }
                    ],
                    series: [
                        {
                            type: "line",
                            barWidth: "60%",
                            data: iraqDeaths,
                            smooth: true,
                            areaStyle: {}
                        },
                        {
                            type: "line",
                            barWidth: "60%",
                            data: worldDeaths,
                            smooth: true,
                            areaStyle: {}
                        }
                    ]
                };
                BankCountChart.setOption(option);
            }
        },
        mounted() {
            this.showChart()
        }}
</script>

