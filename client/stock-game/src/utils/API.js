import axios from "axios";

const API = {
  userRegister: function (user) {
    return axios.post("user/register", user);
  },
  userLogin: function (user) {
    return axios.post("user/login", user);
  },
};

export default API;
