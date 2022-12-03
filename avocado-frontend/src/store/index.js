import { createStore } from "vuex";
import forestMan from "@/assets/forestMan.png";
import axios from 'axios'
import { authHeader } from "../helpers.js";


const url = "http://localhost:3006/api";
const store = createStore({
    state () {
      return {
        avatar: forestMan
      }
    },
    mutations: {
      updateAvatar(state, payload) {
        state.avatar = require(`@/assets/${payload}`)
      }
    },
    actions: {
      getAvo(context) {
        axios
        .get(`${url}/userInfo`, {
          headers: authHeader(),
        })
        .then(({ data }) => {
            this.userName = data.data.name;
            if (data.data.avatar) {
            context.commit('updateAvatar',data.data.avatar);
          }
        });
    }
    }

  })

export default store;
