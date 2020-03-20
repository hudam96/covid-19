<template>
    <div>
    </div>
</template>
<script>
    export default {
        methods:{
            get_Api(){
                this.$http.get("https://pomber.github.io/covid19/timeseries.json").then(res=>{
                    console.log(res.data.Iraq)
                })
            }
        },
        mounted() {
           this.test()
        }
    }
</script>