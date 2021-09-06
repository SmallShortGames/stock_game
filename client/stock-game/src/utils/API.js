import axios from "axios";

const API = {
  getStockTickers: function () {
    return axios.get("api/stocks");
  },
  getStockData: function (ticker) {
    const path = "api/viewstock/" + ticker;
    return axios.get(path);
  },
  getStockDateOne: function (ticker) {
    const path = "api/viewstock/" + ticker;
    return axios.get(path, { params: { _limit: 1 } });
  },
  tradeBuy: function (options) {
    const path = "api/buy";
    return axios.put(path, options);
  },
  tradeSell: function (options) {
    const path = "api/sell";
    return axios.put(path, options);
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
