import axios from "axios";
import authHeader from "./authHeader";


const API_URL = 'http://bpmsapi.qbelimited.com'

const addWareHouse = (name) =>{
    const formData = new FormData();
    formData.append("name", name);

    return axios.post( API_URL + '/api/npms/v1/add-warehouse', formData, { headers: authHeader() } );
    
}

const postService = {
    addWareHouse,
    
}

export default postService;