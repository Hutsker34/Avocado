<template>
    <div class='site'>
        <img src='../assets/avo.png'>
        <h1 class='site__h1'>Avocado</h1>
        <Form class='site__inputs' @submit='createAccount'>
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
                rules="required|email"
            />
             <ErrorMessage class='site__loginErrorMess' name='password'/>
            <Field 
                placeholder="password" 
                class='site__input' 
                name="passwordRepeat" 
                type = 'password'
                rules="required|email"
            />
             <ErrorMessage class='site__loginErrorMess' name='passwordRepeat'/>
        </Form>
        <div class='site__links'>
            <router-link class='site__link' to="/signIn">signIn</router-link>
            <button  class='site__button'>create an account</button>
        </div>
    </div>
</template>
<script>
import { Field, Form, ErrorMessage} from 'vee-validate';

export default {
    name: 'RegistrationScreen',
    components: {
        Field,
        Form,
        ErrorMessage
    },
    data(){
        return{
            login:'',
            password:'',
            passwordRepeat:''
        }
    },
    methods: {
        isRequired(value){
            return value ? true : 'This field is required';
        },
        createAccount(){
            console.log(this.login, this.password, this.passwordRepeat)
        }
    },
}
</script>
<style>
body{
    background: #CBF6DB;
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
    
}
</style>