<template>
<div>
  <div v-if="!currentContent" class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title"
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Contenidos recomendados</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(recommendation, index) in this.recommendations"
          :key="index"
          
        > 
          <img :src="getImgUrl(recommendation[0])" @click="this.visitContent(recommendation)"> título: {{ recommendation[0].title }} intérprete(s): {{ recommendation[0].interpreter_s }} nota: {{recommendation[1]}}
          
          
          
        </li>
      </ul>

      
    </div>
    
  </div>
  <div v-else>
    
    <Content/>
    
    <button 
      
      @click="backToContents()"
    >
      Volver
    </button>
    
  </div>
  
  
    <!--
    <button class="prueba"
      @click="moveButton()"
    >
      Mover botón
    </button>-->
  
  
</div> 
</template>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
.prueba {  
  position:absolute;
  top: 200px;
  color:black;
  font-weight:bold;
}
</style>

<script>
import TutorialDataService from "../services/TutorialDataService";
import CustomerDataService from "../services/CustomerDataService";
import ScoreDataService from "../services/ScoreDataService";
import Content from "../components/Content";



export default {
  name: "tutorials-list",
  components: {
    Content    
  },
  data() {
    return {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      title: "",
      tutorial:null,
      email:"",
      password:"",
      recommendations:[],
      currentContent:null,
    };
  },
  computed: {    
      imagePath(){
        const fileName=this.tutorial.pic
        console.log(fileName);
        return require(`../assets/${fileName}.jpg`);
      }
  },
  methods: {
    retrieveTutorials() {
      TutorialDataService.getAll()
        .then(response => {
          this.tutorials = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    getOrderedRecommendations(){
        ScoreDataService.getScores(this.$root.getCurrentUser().id)
        .then(response => {
        this.recommendations=response.data;
              //console.log("respuestaaaa:"+response.data.scores[3][1]);    
              console.log("respuestaaaa:"+this.recommendations[0][0].id);    
          
          console.log("fin");              
          
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveTutorials();
      this.currentTutorial = null;
      this.currentIndex = -1;
    },

    setActiveTutorial(tutorial, index) {
      this.currentTutorial = tutorial;
      this.currentIndex = tutorial ? index : -1;
    },

    removeAllTutorials() {
      TutorialDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },

    logIn(queryEmail,queryPassword)
    {
      var data={email:queryEmail,password:queryPassword};
      
      CustomerDataService.logIn(data)
        .then(response => {          
          console.log("respuesta:"+response.data.id);
        })
        .catch(e => {
          console.log(e);
        });
    },

    moveButton()
    {
        
        let myButton=document.querySelector(".prueba");
        myButton.style.top=parseInt(myButton.style.top) + 5 + 'px';
        
    },
    
    searchTitle() {
      TutorialDataService.findByTitle(this.title)
        .then(response => {
          this.tutorials = response.data;
          this.setActiveTutorial(null);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    getImgUrl(content){
      var images= require.context(`../assets/`)
      return images('./'+content.image+".jpg")
    },

    visitContent(recommendation){
      
      this.currentContent=recommendation[0];
    },

    backToContents(){
      this.currentContent=null;
    },
    
    getCurrentContent(){
      
      return this.currentContent;
    }

    
  },
  mounted() {
    this.currentContent=null;console.log("213");
    this.getOrderedRecommendations();
    //let myButton=document.querySelector(".prueba");
        //console.log(myButton.style);

    //myButton.style.top ="400px";
    console.log("hola");
    
  }
  
};
</script>


