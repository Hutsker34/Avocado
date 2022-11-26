import { createStore } from "vuex";
import forestMan from "@/assets/forestMan.png";


const store = createStore({
    state () {
      return {
        avatar: forestMan
      }
    },
    mutations: {
      updateAvatar(state, payload) {
        console.log(payload)
        state.avatar = require(`@/assets/${payload}`)
      }
    }
  })

export default store;
