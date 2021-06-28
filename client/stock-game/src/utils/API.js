import axios from 'axios';

const API = {
    userLogin: function(user) {
        return axios.post("/login", user)
    }
}

export default API;