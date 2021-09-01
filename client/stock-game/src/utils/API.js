import axios from "axios";

const API = {
  userData: function (userID) {
    const path = "user/" + userID;
    return axios.get(path);
  },
  userLogin: function (user) {
    return axios.post("user/login", user);
  },
  userRegister: function (user) {
    return axios.post("user/register", user);
  },
};

export default API;
