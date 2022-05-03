<template>
    <div class='site'>
        <img src='../assets/avo.png'>
        <h1 class='site__h1'>Avocado</h1>
        <Form class='site__inputs' @submit='signIn'>
            <Field 
                class='site__input login' 
                placeholder='Email'
                name = 'login'
                rules="required|email"
            />
            <ErrorMessage class='site__loginErrorMess' name='login'/>
            <Field 
                class='site__input password' 
                placeholder='password'
                name = 'password'
                rules="required"
                type='password'
            />
             <ErrorMessage class='site__loginErrorMess' name='password'/>
             <ErrorMessage class='site__loginErrorMess' name=''/>
            <div class='site__links'>
                <router-link class='site__link' to="/signIn">create an account</router-link>
                <button class='site__button'>sign-in</button>
            </div>
        </Form>
    </div>
</template>
<script>
import { Field, Form, ErrorMessage, ErrorBag} from 'vee-validate';
import * as yup from "yup";
import axios from 'axios';

const url = 'http://localhost:3001/api'
const bag = new ErrorBag();

bag.add({
  field: 'auth',
  msg: 'что то сломалось'
});

export default {
    name: 'SignInScreen',
    components:{
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
        });
        return{
            login:'',
            password:'',
            schema
        }
       
    },
    methods:{
        isRequired(value){
            return value ? true : 'This field is required';
        },
        signIn({login, password}){
            axios.post(`${url}/login`,{
                email: login,
                password,
            }).then(
                (response)=>{
                    if(response.status == 404){
                        alert('неправильный логин или пароль')
                    }
                    console.log(response)
                }
            ).catch(
                ({response})=>{
                    if(response.status == 404){
                        bag.first('auth');
                    }
                    console.log(response.status, response)
                }
            )
        }
        

    }
}
</script>
<style scoped>
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
    display: flex;
    flex-direction: column;
    align-items: center;

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