import http from "../http-common";

class TutorialDataService {
  getAll() {
    return http.get("/tutorials");
  }

  get(id) {
    return http.get(`/tutorials/${id}`);
  }

  create(data) {
    return http.post("/tutorials", data);
  }

  update(id, data) {
    return http.put(`/tutorials/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tutorials/${id}`);
  }

  deleteAll() {
    return http.delete(`/tutorials`);
  }

  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }

  getScores(){
    console.log("buscando scores");
    return http.get("/tutorial/scores");
  }

  addVisit(data)
  {
    console.log("TutorialDataService: añadiendo visita de usuario con id: "+data.user_id+" y contenido con id: "+data.content_id);
    return http.post("/tutorials/visit", data);
    
  }
}

export default new TutorialDataService();
