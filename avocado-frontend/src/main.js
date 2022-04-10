import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { defineRule } from 'vee-validate';

createApp(App).use(router).mount('#app')

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