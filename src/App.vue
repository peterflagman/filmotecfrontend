<template>
  <!--<body>
  <div class="container">
    <span class="ref" id="desp"> SPAAAAANholaaaa <span><img class="myDIV" src="./assets/killbill.jpg"> <h3 class="hide">UNO.</h3></span> <span><img class="myDIV" src="./assets/killbill.jpg"> <h3 class="hide">tres.</h3></span>
  </span>
  </div>

  <div class="container">
    holaaaa <img class="myDIV" src="./assets/killbill.jpg"> <h3 class="hide">DOS.</h3>
  </div>
  <button @click="move">MOVER</button>
  <button @click="play">PLAY</button>
</body>
<video id="video1" width="320" height="240" controls autoplay>
     <source src="./assets/killbill.mp4" type="video/mp4" />
</video>
</template>
  <style>
    body{
      background:black;
    }
  img{
    position: relative;
    vertical-align:middle;
    margin:2px 10px 5px 15px;    
    border: 2px solid transparent;
    padding: 0px;    
    -webkit-transition: border-color 0.1s ease;
  }
   span{
    position:relative;
    transition: 0.5s linear;
    
   } 
    
  .ref{
    color:white;
    position:relative;
    width:700px;
    left:400px;
  }
  .container{
    position: relative;
    overflow:hidden;
  }

.myDIV:hover{
 border: 2px solid transparent;
 transition:0.2s linear;
 border-color: white;
 padding: 0px;
 
 
  
  
}

  .hide {
    position: absolute;
    top:0;
    left:100px;
  
  display: none;

}


.myDIV:hover + .hide {
  display: block;
  color: red;
}



</style>-->
  <div id="app">
    <div v-if="currentUser">
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <router-link to="/" class="navbar-brand"></router-link>
        <div class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/tutorials" class="nav-link"></router-link>
          </li>
          <li class="nav-item">
            <router-link to="/add" class="nav-link"></router-link>
          </li>
          <li class="nav-item">
            <button @click="logOut">Log out</button>
          </li>
        </div>

      </nav>

      <div class="container mt-3">
        <router-view />
      </div>
  
      
    </div>
    <div v-else>
      <div v-if="loggingIn">
        <LogIn />
      </div>
      <div v-else-if="registering">
        <Register />
      </div>
      <div v-else>
        <div>
          <button
            @click="setLoggingIn"
          >Log in
          </button>
        </div>      
        <div>
          <button
            @click="setRegistering"
          >Register
          </button>
        </div>
      </div>
    
      
    </div>
    <div>
    
    </div>
  </div>

</template>

<script>
import LogIn from './components/LogIn'
import Register from './components/Register'
//import TutorialDataService from "./services/TutorialDataService";
import ScoreDataService from "./services/ScoreDataService";
export default {
  name: "app",
  components: {
   LogIn,
   Register
  },
  data() {
    return {
      currentUser:null,
      email:null,
      password:null,
      loggingIn:false,
      registering:false,
      recommendations:[],
    };
  },
  methods: {
    move(){
      let myRef=document.querySelector(".ref");
      myRef.style.left=parseInt(myRef.style.left) -200 + 'px';
      console.log(myRef.style.left);
      console.log(myRef);
    },
    setCurrentUser(currentUser)
    {
      this.currentUser=currentUser;
      console.log("logged in with user and password:"+currentUser.email+currentUser.access_code)
    },
    getCurrentUser()
    {
      return this.currentUser;
    },
    setLoggingIn()
    {      
      this.loggingIn=true;
      this.registering=false;
    },
    setRegistering()
    {
      this.loggingIn=false;
      this.registering=true;
    },
    logOut()
    {
      this.loggingIn=false;
      this.registering=false;
      this.currentUser=null;
    },
    
    getScores()
    {
      console.log("App.vue");
      ScoreDataService.getScores("627804d043802325821faab7")
        .then(response => {
          
          //iterator=response.data.keys();
            //const map1=new Map(Object.entries(response.data.scores));
            //console.log(map1); 
              console.log("respuesta");
              var recommendations=response.data;
              //console.log("respuestaaaa:"+response.data.scores[3][1]);    
              console.log("respuestaaaa:"+recommendations[0][0].id);    
          
          console.log("fin");              
          
        })
        .catch(e => {
          console.log(e);
        });
    },
    play()
    {
      
      document.getElementById("video1").currentTime = 10;
      document.getElementById("video1").autoplay= true;
      document.getElementById("video1").requestFullscreen();
    }
  },
  mounted(){
    //let myRef=document.querySelector(".ref");
    //myRef.style.left="100px";
  }
};
</script>


