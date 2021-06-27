import axios from 'axios';

const API = {
    userLogin: function(user) {
        return axios.post("/api/auth/login", user)
    }
}

export default API;