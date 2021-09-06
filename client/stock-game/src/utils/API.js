import axios from "axios";

const API = {
  getStockTickers: function () {
    return axios.get("api/stocks");
  },
  getStockData: function (ticker) {
    const path = "api/viewstock/" + ticker;
    return axios.get(path);
  },
  getStockDataOne: function (ticker) {
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
  userData: function (token) {
    const path = "user/";
    return axios.get(path, {
      headers: {
        "x-access-tokens": token,
      },
    });
  },
  userLogin: function (user) {
    return axios.post("user/login");
  },
  userRegister: function (user) {
    return axios.post("user/register", user);
  },
};

export default API;
