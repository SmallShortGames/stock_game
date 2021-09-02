import axios from "axios";

const API = {
  getStockTickers: function () {
    return axios.get("api/stocks");
  },
  getStockData: function (ticker) {
    const path = "/api/viewstock/" + ticker;
    return axios.get(path);
  },
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
