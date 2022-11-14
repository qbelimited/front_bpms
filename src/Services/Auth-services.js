import axios from "axios";

const API_URL = 'http://bpmsapi.qbelimited.com'

const login = (email, password) => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    return axios.post( API_URL + '/api/npms/v1/login', formData, )
    .then((response) =>{
        if(response.data.response_code === '200'){
            localStorage.setItem('user', JSON.stringify(response.data))
        }
        return response.data;
    })
}


const logout = () => {
    localStorage.removeItem("user");
  };

const authService = {
    login,
    logout
}

export default authService;