import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: "mdi"
    },
    rtl: true,
    theme: {
        themes: {
            light: {
                background: "#E4EBF3"
            }
        }
    }
});
