import axios from "axios";

export default {
  // ------------------------ User methods
  userRegister: function (user) {
    return axios.post("/api/user", user);
  },
  getAllUsers: function () {
    let url = "/api/user/";
    return axios.get(url);
  },
  getOneUser: function (id) {
    let url = "/api/user/" + id;
    return axios.get(url);
  },
  updateUser: function (id, user) {
    let url = "/api/user/" + id;
    return axios.put(url, user);
  },
  deleteUser: function (id) {
    let url = "/api/user/" + id;
    return axios.delete(url);
  },
  userLogin: function (user) {
    return axios.post("/api/auth/login", user);
  },
  // ------------------------ portfolio methods
  createPortfolio: function (user) {
    return axios.post("/api/portfolio", user);
  },
  getAllPortfolios: function () {
    let url = "/api/portfolio/";
    return axios.get(url);
  },
  getOnePortfolio: function (id) {
    let url = "/api/portfolio/" + id;
    return axios.get(url);
  },
  updatePortfolio: function (id, portfolio) {
    let url = "/api/portfolio/" + id;
    return axios.put(url, portfolio);
  },
  deletePortfolio: function (id) {
    let url = "/api/portfolio/" + id;
    return axios.delete(url);
  },
  // ------------------------ txn methods
  createTransaction: function (user) {
    return axios.post("/api/transaction", user);
  },
  getAllTransactions: function () {
    let url = "/api/transaction/";
    return axios.get(url);
  },
  getOneTransaction: function (id) {
    let url = "/api/transaction/" + id;
    return axios.get(url);
  },
  updateTransaction: function (id, transaction) {
    let url = "/api/transaction/" + id;
    return axios.put(url, transaction);
  },
  deleteTransaction: function (id) {
    let url = "/api/transaction/" + id;
    return axios.delete(url);
  },
  // ------------------------ company methods
  createCompany: function (user) {
    return axios.post("/api/company", user);
  },
  getAllCompanys: function () {
    let url = "/api/company/";
    return axios.get(url);
  },
  getOneCompany: function (id) {
    let url = "/api/company/" + id;
    return axios.get(url);
  },
  updateCompany: function (id, company) {
    let url = "/api/company/" + id;
    return axios.put(url, company);
  },
  deleteCompany: function (id) {
    let url = "/api/company/" + id;
    return axios.delete(url);
  },
  // ------------------------ position methods
  createPosition: function (user) {
    return axios.post("/api/position", user);
  },
  getAllPositions: function () {
    let url = "/api/position/";
    return axios.get(url);
  },
  getOnePosition: function (id) {
    let url = "/api/position/" + id;
    return axios.get(url);
  },
  updatePosition: function (id, position) {
    let url = "/api/position/" + id;
    return axios.put(url, position);
  },
  deletePosition: function (id) {
    let url = "/api/position/" + id;
    return axios.delete(url);
  },
  // ------------------------ API methods
};
