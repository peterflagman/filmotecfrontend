<template>
  <div>
    <img :src="getImgUrl()">
    {{this.content}} 
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";
//<img :src="getImgUrl()">
//import TutorialsList from "./TutorialsList"

export default {
  name:"content",
  components:{
    //TutorialsList,
    TutorialDataService
  },
  data() {
    return {
      content: null
      
      
    };
  },
  
  
  methods: {
    getTutorial(id) {
      TutorialDataService.get(id)
        .then(response => {
          this.currentTutorial = response.data;
          //<img :src="getImgUrl(content)">
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentTutorial.id,
        title: this.currentTutorial.title,
        description: this.currentTutorial.description,
        published: status
      };

      TutorialDataService.update(this.currentTutorial.id, data)
        .then(response => {
          console.log(response.data);
          this.currentTutorial.published = status;
          this.message = 'The status was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    setCurrentContent(content)
    {
      this.content=content;
    },

    updateTutorial() {
      
      this.currentTutorial.visitas=this.currentTutorial.visitas+1;
      
      
      TutorialDataService.update(this.currentTutorial.id, this.currentTutorial)
        .then(response => {
          console.log(response.data);
          this.message = 'The tutorial was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    getImgUrl(){
      var content = this.$parent.getCurrentContent();
      var images= require.context(`../assets/`);
      return images("./"+content.image+".jpg")
    }
    
  },
  mounted() {
    this.content = this.$parent.getCurrentContent();
    console.log(this.content);
    const data={content_id:this.content.id, user_id:this.$root.getCurrentUser().id};
    TutorialDataService.addVisit(data);
    
    
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
