<template>
    <v-app class="background">
        <loader v-if="isLoading"></loader>
        <div v-else>
            <v-img height="400" :aspect-ratio="16/9" class="mb-n12 pa-n12" src="@/assets/hospital.jpeg">
                <v-row align="start" class="lightbox white--text pa-2 fill-height">
                    <v-col>
                        <div  ><h1  style="background-color: rgba(255,0,0,0.1) ; width: 400px ;height: 60px; color: #5474A5">مستجدات فايروس كوفيد-19</h1></div>
                        <div class="mt-4"><h4 class="blue-grey--text text--lighten-1"><v-icon color="red">mdi-map-marker</v-icon>العراق</h4></div>
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
                        <line-chart :iraq-chart-data="iraq" :world-chart-data="allCountries" :iraq-death-percentage="iraqDeathPercentage"></line-chart>
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
              allCountries : [],
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
                    console.log(this.iraq)
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
              }else return "down"
            },
            totalRecoveredStatus(){
                if((parseInt(this.iraq[this.iraq.length -1].recovered) - parseInt(this.iraq[this.iraq.length -2].recovered) >= 1)){
                    return "up"
                }else return "down"
            },
            totalConfirmedStatus(){
                if((parseInt(this.iraq[this.iraq.length -1].confirmed) - parseInt(this.iraq[this.iraq.length -2].confirmed) >= 1)){
                    return "up"
                }else return "down"
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
            }

        },
        mounted() {
           this.getCountries()
        }
    }
</script>
