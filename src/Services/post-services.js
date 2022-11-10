import axios from "axios";
import authHeader from "./authHeader";


const API_URL = 'http://bpmsapi.qbelimited.com'

const addWareHouse = (name) =>{
    const formData = new FormData();
    formData.append("name", name);

    return axios.post( API_URL + '/api/npms/v1/add-warehouse', formData, { headers: authHeader() } );
    
}

const makePayment = (received_item_id, currency_id, paid_by, method_of_payment) =>{
    const formData = new FormData();
    formData.append("received_item_id", received_item_id);
    formData.append("currency_id", currency_id);
    formData.append("paid_by", paid_by);
    formData.append("method_of_payment", method_of_payment);
    return axios.post( API_URL + 'api/npms/v1/make-payment', formData, { headers: authHeader() } );
    
}
const addCompany = (name, location, phone, email) =>{
    const formData = new FormData();
    formData.append("name", name);
    formData.append("location", location);
    formData.append("phone", phone);
    formData.append("email", email);
    return axios.post( API_URL + '/api/npms/v1/add-company', formData, { headers: authHeader() } );
    
}

const confirmPayment = (id) =>{
    const formData = new FormData();
    formData.append("id", id);
    return axios.post( API_URL + '/api/npms/v1/confirm-payment', formData, { headers: authHeader() } );
    
}
const updateCompany = (name, location, phone, email, status, id) =>{
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("location", location);
    formData.append("email", email);
    formData.append("status", status);

    return axios.post(API_URL + '/api/npms/v1/update-company', formData, { headers: authHeader() } );
}

const activateCompany = (id) =>{
    const formData = new FormData();
    formData.append("id", id);
    return axios.post(API_URL + '/api/npms/v1/activate-company', formData, { headers: authHeader() } );
}

const deactivateCompany = (id) =>{
    const formData = new FormData();
    formData.append("id", id);
    return axios.post(API_URL + '/api/npms/v1/deactivate-company', formData, { headers: authHeader() } );
}

const deactivateColor = (id) =>{
    const formData = new FormData();
    formData.append("id", id);
    return axios.post(API_URL + '/api/npms/v1/deactivate-plate-color', formData, { headers: authHeader() } );
}

const activateColor = (id) =>{
    const formData = new FormData();
    formData.append("id", id);
    return axios.post(API_URL + '/api/npms/v1/activate-plate-color', formData, { headers: authHeader() } );
}

const addColor = (color, code) =>{
    const formData = new FormData();
    formData.append("color", color);
    formData.append("code", code);
    return axios.post(API_URL + '/api/npms/v1/activate-plate-color', formData, { headers: authHeader() } );
}
const makeDelivery = (plate_id, user_id, company_id, quantity, cost) =>{
    const formData = new FormData();
    formData.append("plate_id", plate_id);
    formData.append("user_id", user_id);
    formData.append("company_id", company_id);
    formData.append("quantity", quantity);
    formData.append("cost", cost);
    return axios.post(API_URL + '/api/npms/v1/make-delivery', formData, { headers: authHeader() } );
}

const confirmDelivery = (id) =>{
    const formData = new FormData();
    formData.append("id", id);
    return axios.post(API_URL + '/api/npms/v1/confirm-delivery', formData, { headers: authHeader() } );
}

const sendHelp = (priority, subject, message) =>{
    const formData = new FormData();
    formData.append("priority", priority);
    formData.append("subject", subject);
    formData.append("message", message);
    return axios.post(API_URL + '/api/npms/v1/help', formData, { headers: authHeader() } );
}

const postService = {
    addWareHouse,
    makePayment,
    confirmPayment,
    addCompany,
    updateCompany,
    activateCompany,
    deactivateCompany,
    activateColor,
    deactivateColor,
    addColor,
    makeDelivery,
    confirmDelivery,
    sendHelp
}

export default postService;