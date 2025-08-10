import axios from "axios";

let domain = ["http://localhost:5000"];

let instance = axios.create({
  baseURL: domain[0] + "/skill_assessment/api",
});

const baseURL = () => domain;

instance.interceptors.request.use(
  (config) => {
    // Exclude login, signup, logout endpoints from adding token
    const noTokenNeeded = ['/login', '/sign_up', '/logout'];
    if (!noTokenNeeded.includes(config.url)) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
export { baseURL };
