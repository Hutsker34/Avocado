import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { defineRule } from 'vee-validate';
import store from './store'



const app = createApp(App)

app.use(store)
app.use(router)
app.mount('#app')

//Vue.config.productionTip = false;



defineRule('email', value => {
    // Field is empty, should pass
    if (!value || !value.length) {
        return true;
    }
    // Check if email
    if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i.test(value)) {
        return 'This field must be a valid email';
    }
    return true;
});

defineRule('required', value => {
    if (!value || !value.length) {
      return 'This field is required';
    }
    return true;
  });

  defineRule("confirmed", (value, [other]) => {
    if (value !== other) {
      return `Passwords do not match`;
    }
  
    return true;
  });