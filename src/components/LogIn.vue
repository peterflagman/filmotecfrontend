<template>
     
     <div class="entry">
        <label for="email">Email1</label>
        <input type="text" class="form-control" 
          v-model="email"/>
    </div>
    <div class="entry">
        <label for="email">Password</label>
        <input type="text" class="form-control" 
          v-model="password"/>
    </div>
    <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button"
            @click="logIn(email,password)"
        >
          Log in!
        </button>
    </div>
    <div class="logInAttemp" v-if="logInAttempted">
    Wrong email or password 
    </div>
</template>
<script>
import CustomerDataService from "../services/CustomerDataService";
export default {
    data() {
        return {        
        email:"",
        password:"",
        logInAttempted:false
        };
    },
    methods: {
        logIn(queryEmail,queryPassword)
        {
        var data={email:queryEmail,password:queryPassword};
      
        CustomerDataService.logIn(data)
         .then(response => {                     
           if (response.data.id===undefined){
            this.logInAttempted=true;
           }else{
            this.$root.setCurrentUser(response.data);
           }
         })
          .catch(e => {
            console.log(e);
         });
     }
    }
    
}
</script>

<style>
    .logInAttemp{
        position:absolute;
        top:5px;
        left:100px;
    }
</style>