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
const adddColor = (color, code) =>{
    const formData = new FormData();
    formData.append("color", color);
    formData.append("code", code);
    return axios.post(API_URL + '/api/npms/v1/add-plate-color', formData, { headers: authHeader() } );
}
const colorUpdate = (color, code, id) =>{
    const formData = new FormData();
    formData.append("color", color);
    formData.append("code", code);
    formData.append("id", id);
    return axios.post(API_URL + '/api/npms/v1/update-plate-color', formData, { headers: authHeader() } );
}

const addPlateSize = (description, code, dimensions) =>{
    const formData = new FormData();
    formData.append("description", description);
    formData.append("code", code);
    formData.append("dimensions", dimensions);
    formData.append("status", '1');
    return axios.post(API_URL + '/api/npms/v1/add-plate-dimension', formData, { headers: authHeader() } );
}

const updatePlateSize = (description, code, dimensions, id) =>{
    const formData = new FormData();
    formData.append("description", description);
    formData.append("code", code);
    formData.append("dimensions", dimensions);
    formData.append("status", '1');
    formData.append("id", id);
    return axios.post(API_URL + '/api/npms/v1/update-plate-dimension', formData, { headers: authHeader() } );
}

const deactivatePlate = (id) =>{
    const formData = new FormData();
    formData.append("id", id);
    return axios.post(API_URL + '/api/npms/v1/deactivate-plate-dimension', formData, { headers: authHeader() } );
}
const activatePlate = (id) =>{
    const formData = new FormData();
    formData.append("id", id);
    return axios.post(API_URL + '/api/npms/v1/activate-plate-dimension', formData, { headers: authHeader() } );
}

const addProduction = (plate_color_id, plate_dimension_id, quantity, batch_code, serial_starts) =>{
    const formData = new FormData();
    formData.append("plate_color_id", plate_color_id);
    formData.append("plate_dimension_id", plate_dimension_id);
    formData.append("quantity", quantity);
    formData.append("serial_starts", serial_starts);
    formData.append(" batch_code",  batch_code);
    formData.append("status", '1');
    return axios.post(API_URL + '/api/npms/v1/add-production', formData, { headers: authHeader() } );
}
 const embossingPlate = (plate_id, embosser_color_id, embosser_text, serial_number_id) =>{
    const formData = new FormData();
    formData.append("plate_id", plate_id);
    formData.append("embosser_color_id", embosser_color_id);
    formData.append("embosser_text", embosser_text);
    formData.append("serial_number_id", serial_number_id);
    
    formData.append("status", '1');
    return axios.post(API_URL + '/api/npms/v1/emboss-plate', formData, { headers: authHeader() } );
 }
 const addEmbosserColor = (color, code) =>{
    const formData = new FormData();
    formData.append("color", color);
    formData.append("code", code);
    return axios.post(API_URL + '/api/npms/v1/add-embosser-color', formData, { headers: authHeader() } );
 }

 const updateEmbosserColor = (color, code, id) =>{
    const formData = new FormData();
    formData.append("color", color);
    formData.append("code", code);
    formData.append("id", id);
    return axios.post(API_URL + '/api/npms/v1/update-embosser-color', formData, { headers: authHeader() } );
 }
 const activateEmbosserColor = (id) =>{
    const formData = new FormData();
    formData.append("id", id);
    return axios.post(API_URL + '/api/npms/v1/activate-embosser-color', formData, { headers: authHeader() } );
 }
 const deactivateEmbosserColor =  (id) =>{
    const formData = new FormData();
    formData.append("id", id);
    return axios.post(API_URL + '/api/npms/v1/deactivate-embosser-color', formData, { headers: authHeader() } );
 }
const postService = {
    addProduction,
    activatePlate,
    deactivatePlate,
    updatePlateSize,
    addPlateSize,
    adddColor,
    colorUpdate,
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
    sendHelp,
    embossingPlate, 
    addEmbosserColor,
    updateEmbosserColor,
    activateEmbosserColor,
    deactivateEmbosserColor
}

export default postService;