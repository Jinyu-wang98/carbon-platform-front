import axios from "axios";
const instance = axios.create({ baseURL: ' http://localhost:8080', timeout: 1000 });

function register(data) {
  return instance.post("/user/do_register1", {
    ...data,
  });
}
export { register };
