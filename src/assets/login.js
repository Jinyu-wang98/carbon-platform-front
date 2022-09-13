import axios from "axios";
const instance = axios.create({ baseURL: ' http://localhost:8080', timeout: 1000 });

function loginApi(data) {
  return instance.post("/user/do_login", {
    ...data,
  });
}
function logoutApi() {
  return instance.get("/api/logout");
}
export { loginApi, logoutApi };
