import http from "../http-common";

class CustomerDataService {
  logIn(data) {
    console.log("intentando login con "+data.email+" "+data.password);
    return http.post("/customers",data);
  }
}

export default new CustomerDataService();