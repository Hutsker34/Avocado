import { createStore } from "vuex";
import forestMan from "@/assets/forestMan.png";
import axios from 'axios'
import { authHeader, backLink } from "../helpers.js";


const url = "http://localhost:3006/api";
const store = createStore({
    state () {
      return {
        avatar: forestMan,
        checked: false,
        color: ''
      }
    },
    mutations: {
      updateAvatar(state, payload) {
        if(!payload){
          state.avatar = forestMan
        }else{
          state.avatar = `${backLink}${payload}`;
        }
      },
      updateChecked(state, payload){
        state.checked = payload
      },
      updateColor(state, payload){
        console.log('store',payload)
        state.color = payload
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
      },
    }

  })

export default store;
