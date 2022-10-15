//import axios from "axios";

import http from "../http-common";

class ScoreDataService {
    
  getScores(id) {
    console.log("ScoreDataService: solicitando scores");
    //return axios.get("http://localhost:8080/api/scores");
    return http.get(`/scores/${id}`);
  }
}

export default new ScoreDataService();