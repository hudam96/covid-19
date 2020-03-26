<template>
        <v-card >
            <v-card-text>
                <v-row>
                    <v-flex class="mr-4">
                        <div class="barChart" ref="PieChart" style="height:375px;"></div>
                    </v-flex>
                </v-row>
            </v-card-text>
        </v-card>
</template>

<script>
    import echarts from "echarts";
    export default {
        props:{
            chartData:{
                default : null,
                type: Array
            }
        },
        methods: {
            showChart() {
                const thisChart = echarts.init(this.$refs.PieChart);
                const option = {
                    color: ["#FFD180", "#B8D7FF","#92F0E6"],
                    tooltip: {
                        trigger: "item",
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: "vertical",
                        x: "left",

                        textStyle: {
                            fontFamily: "cairo"
                        }
                    },
                    series: [
                        {
                            name: "",
                            type: "pie",
                            radius: ["45%", "70%"],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: "center"
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: "30",
                                        fontWeight: "bold",
                                        fontFamily: "cairo"
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: this.chartData
                        }
                    ]
                };
                thisChart.setOption(option);
            }
        },
        mounted() {
            this.showChart();
        }
    };
</script>

<style scoped></style>

