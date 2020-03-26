<template>
    <v-card >
        <v-card-title>
            <v-container >
                <v-row class="mt-n4">
                    <v-col cols="2">
                        <v-icon
                                class="icon-shape"
                                :class="cardIconColor"
                                color="white"
                        >{{cardIconName}}
                        </v-icon>
                    </v-col>
                    <v-col class="mt-2 mr-2">
                        <h6  class="grey--text text--lighten-1" >{{cardTitle}}</h6>
                    </v-col>
                </v-row>
                <v-row class="ma-n4 mt-2">
                    <v-col class="text-center">
                        <h1 class="grey--text text--darken-1 font-weight-medium">
                            <v-icon class="mt-n4" v-if="status === 'down' && cardValue!= null " color="red">
                                mdi-menu-down
                            </v-icon>
                            <v-icon  class="mt-n4" color="green" v-if="status === 'up' && cardValue!= null">
                                mdi-menu-up
                            </v-icon>
                            <h5 v-if="cardValue === null" class="font-weight-medium">
                                لا توجد بيانات
                            </h5>
                            <ICountUp
                                    v-else
                                    :startVal="startVal"
                                    :endVal="parseInt(cardValue.toLocaleString())"
                                    :decimals="decimals"
                                    :duration="duration"
                                    :options="options"
                            />
                        </h1>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-title>
        <v-card-text>

        </v-card-text>
    </v-card>
</template>
<script>
    import ICountUp from 'vue-countup-v2';
    export default {
        components:{ICountUp},
        props : {
            cardValue : {
                default : 0
            },
            cardTitle : {
                type : String
            },
            cardIconName : {
                type : String
            },
            cardIconColor : {
                type : String
            },
            status:{
                type: String,
                default: null
            }
        },
        data() {
            return {
                startVal: 0,
                decimals: 0,
                duration: 2.5,
                options: {
                    useEasing: true,
                    useGrouping: true,
                    separator: ',',
                    decimal: '.',
                    prefix: '',
                    suffix: ''
                }
            };
        },
    }
</script>
<style>
    .icon-shape {
        border-radius: 50%;
        height: 45px;
        width: 45px;
        background-color: white;
    }
</style>
