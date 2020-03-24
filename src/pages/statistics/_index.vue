<template>
    <v-app class="background">
        <loader v-if="isLoading"></loader>
        <div v-else>
            <v-img height="500" :aspect-ratio="16/9" class="mb-n12 pa-n12" src="@/assets/doctor.jpg">
                <v-row align="center" class="lightbox white--text pa-2 fill-height">
                    <v-col align="center" class="mt-n12">
                        <div  ><h1 class="blue-grey--text text--darken-2 font-weight-thin" style="font-size: 50px">مستجدات فايروس كوفيد-19</h1></div>
                        <div class="mt-4"><h3 class="blue-grey--text text--lighten-1"><v-icon color="red">mdi-map-marker</v-icon>العراق</h3></div>
                    </v-col>
                </v-row>
            </v-img>
            <v-container fluid class="pa-n12">
                <!-- section 1 -->
                <v-row class="mt-n12">
                    <v-col cols="12" md="3">
                        <card card-title="الاصابات الجديدة"
                              card-icon-name="mdi-account-plus"
                              card-icon-color="blue"
                              :card-value="newConfirmed"
                              status="up"
                        >
                        </card>
                    </v-col>
                    <v-col cols="12" md="3">
                        <card card-title="الاصابات الكلية"
                              card-icon-name="mdi-account-check"
                              card-icon-color="yellow darken-2"
                              :card-value="totalConfirmed"
                              :status="totalConfirmedStatus"
                        >
                        </card>
                    </v-col>
                    <v-col cols="12" md="3">
                        <card card-title=" حالات الشفاء الكلية"
                              card-icon-name="mdi-checkbox-marked-circle"
                              card-icon-color="green"
                              :card-value="totalRecovered"
                              :status="totalRecoveredStatus"
                        >
                        </card>
                    </v-col>
                    <v-col cols="12" md="3">
                        <card card-title=" حالات الوفاة الكلية"
                              card-icon-name="mdi-close-circle"
                              card-icon-color="red darken-1"
                              :card-value="totalDeaths"
                              :status="totalDeathStatus"
                        >
                        </card>
                    </v-col>
                </v-row>
                <!-- section 2 -->
                <v-row>
                    <v-col>
                        <line-chart :iraq-chart-data="iraq"  :iraq-death-percentage="iraqDeathPercentage"
                                    :world-death-percentage="worldDeathPercentage"
                        ></line-chart>
                    </v-col>
                    <v-col cols="12" md="4">
                        <pie-chart :chart-data="deathsAndRecovered"></pie-chart>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </v-app>
</template>
<script>
    import loader from '../../components/layout/loadingSpinner'
    import card from '../../components/ui/card'
    import pieChart from '../../components/charts/PieChart'
    import lineChart from '../../components/charts/lineChart'
    export default {
        components : {loader ,card, pieChart, lineChart},
        data(){
          return{
              allCountries : {},
              iraq : [],
              isLoading : true,
              totalConfirmed : null,
              totalDeaths : null,
              totalRecovered : null
          }
        },
        methods:{
            getCountries(){
                this.$http.get("https://pomber.github.io/covid19/timeseries.json").then(res=>{
                    this.allCountries = res.data
                    this.iraq = res.data.Iraq
                    this.totalConfirmed = this.iraq[this.iraq.length -1].confirmed
                    this.totalDeaths =   this.iraq[this.iraq.length -1].deaths
                    this.totalRecovered =   this.iraq[this.iraq.length -1].recovered
                    this.isLoading = false
                })
            }
        },
        computed:{
           newConfirmed(){
               return parseInt(this.iraq[this.iraq.length -1].confirmed) - parseInt(this.iraq[this.iraq.length -2].confirmed)
           },
            totalDeathStatus(){
              if((parseInt(this.iraq[this.iraq.length -1].deaths) - parseInt(this.iraq[this.iraq.length -2].deaths) >= 1)){
                  return "up"
              }else if((parseInt(this.iraq[this.iraq.length -1].deaths) - parseInt(this.iraq[this.iraq.length -2].deaths) == 0)){
                  return "noChange"
              }
              else return "down"
            },
            totalRecoveredStatus(){
                if((parseInt(this.iraq[this.iraq.length -1].recovered) - parseInt(this.iraq[this.iraq.length -2].recovered) >= 1)){
                    return "up"
                }else if((parseInt(this.iraq[this.iraq.length -1].recovered) - parseInt(this.iraq[this.iraq.length -2].recovered) == 0)){
                    return "noChange"
                }
                else return "down"
            },
            totalConfirmedStatus(){
                if((parseInt(this.iraq[this.iraq.length -1].confirmed) - parseInt(this.iraq[this.iraq.length -2].confirmed) >= 1)){
                    return "up"
                }else if((parseInt(this.iraq[this.iraq.length -1].confirmed) - parseInt(this.iraq[this.iraq.length -2].confirmed) == 0)){
                    return "noChange"
                }
                else return "down"
            },
            deathsAndRecovered(){
               let activeStatues = this.totalConfirmed- this.totalDeaths - this.totalRecovered
               return [
                   {name : "الحالات النشطة", value : activeStatues},
                   {name : "حالات الشفاء" , value: this.totalRecovered},
                   {name : "حالات الوفاة" , value: this.totalDeaths},
               ]
            },
            iraqDeathPercentage(){
               let value = (this.iraq[this.iraq.length -1].deaths/this.iraq[this.iraq.length -1].confirmed)*100
                return value.toFixed(1)
            },
            worldDeathPercentage(){
                var contriesData = Object.values(this.allCountries)
                var deaths = 0
                var confirmed = 0
                contriesData.forEach( item =>{
                    deaths = deaths + item[item.length -1].deaths
                })
                contriesData.forEach( item =>{
                    confirmed = confirmed + item[item.length -1].confirmed
                })
                var value = (deaths/confirmed)*100
                console.log(value)
                return value.toFixed(1)

            }

        },
        mounted() {
           this.getCountries()

        }
    }
</script>
