<template>
    <div class='site'>
        <img src='../assets/avo.png'>
        <h1 class='site__h1'>Avocado</h1>
        <Form class='site__inputs' @submit='registration'>
            <Field 
                placeholder="name" 
                class='site__input' 
                name="name" 
                rules="required"
            />
            <Field 
                placeholder="login" 
                class='site__input' 
                name="login" 
                rules="required|email"
            />
            <ErrorMessage class='site__loginErrorMess' name='login'/>
            <Field 
                placeholder="password" 
                class='site__input' 
                name="password" 
                type = 'password'
                rules="required"
            />
             <ErrorMessage class='site__loginErrorMess' name='password'/>
            <Field 
                placeholder="password" 
                class='site__input' 
                name="passwordRepeat" 
                type = 'password'
                rules="required|confirmed:@password"
            />
             <ErrorMessage class='site__loginErrorMess' name='passwordRepeat'/>
             <div class='site__links'>
             <router-link class='site__link' to="/">signIn</router-link>
             <button  type="submit"  class='site__button'>create an account</button>
             </div>
             
        </Form>
    </div>
    
</template>
<script>
import { Field, Form, ErrorMessage} from 'vee-validate';
import * as yup from "yup";
import axios from 'axios';
import router from '../router'
import {setToken} from '../helpers.js'



const url = 'http://localhost:3006/api'

export default {
    name: 'RegistrationScreen',
    components: {
        Field,
        Form,
        ErrorMessage
    },
    data(){
        const schema = yup.object().shape({
        password: yup.string().min(5).required(),
        passwordConfirmation: yup
            .string()
            .required()
            .oneOf([yup.ref("password")], "Passwords do not match"),
        });
        
        return{
            name:'',
            login:'',
            password:'',
            passwordRepeat:'',
            schema
        }
    },
    methods: {
        isRequired(value){
            return value ? true : 'This field is required';
        },
        registration({login, password,name}){
            
            axios.post(`${url}/bio`,{
                name: name,
                email: login,
                password: password
            }).then(
               function({data}){
                   router.push({ path: '/profile'})
                   setToken('accessToken', data.accessToken)
                   setToken('user', JSON.stringify(data.data))
               }
            ).catch(
                
            )
        }
    },
}
</script>
<style>
body{
    background: #CBF6DB;
}
.site{
    margin-top: 20px;
}
.site__h1{
    font-size: 46px;
    color: #9BC472;
    font-family: 'Montserrat', sans-serif;
}
.site__input{
    width: 450px;
    height: 27px;
    padding: 5px 0 5px 15px;
    background: #9BC472;
    outline: none;
    border: none;
    border-radius: 10px;
    margin-bottom: 10px;
}
.site__inputs{
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;

}
.site__button{
    width: 180px;
    padding: 10px 15px 10px 15px ;
    background: #F5BEB4;
    outline: none;
    border: none;
    border-radius: 19px;
}
.site__button:hover{
    background: #DCA49A;
    border: 1px solid grey;
}
.site__links{
    display: flex;
    justify-content: space-between;
    width: 450px;
    margin: 0 auto;
}
.site__link{
    text-decoration: none;
    color: grey;
    margin: 10px 0 0 40px;;
}
.site__link:hover{
    color: black;
}
.site__loginErrorMess{
    margin: 0;
    font-size: 14px;
    color: red;
    text-align: initial;
    margin-bottom: 5px;
    
}
</style>
