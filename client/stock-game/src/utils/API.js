import axios from 'axios';

const API = {
    userRegister: function(user) {
        return axios.post("/register", user)
    },
    userLogin: function(user) {
        return axios.post("/login", user)
    }
}

export default API;