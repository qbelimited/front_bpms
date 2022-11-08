
import axios from "axios";
import authHeader from "./authHeader";

const API_URL = 'http://bpmsapi.qbelimited.com'

const getAllBill = () =>{
    return axios.get(API_URL + "/api/npms/v1/all-bills", { headers: authHeader() });
}

const getAllProduction = () =>{
    return axios.get(API_URL + '/api/npms/v1/get-all-production',{ headers: authHeader() } )
}

const getAllDeliveries = () =>{
    return axios.get(API_URL + '/api/npms/v1/all-deliveries',{ headers: authHeader() } )
}

const getAllWarehouse = () =>{
    return axios.get(API_URL + '/api/npms/v1/get-warehouses',{ headers: authHeader() } )
}
const getAllStorage = (id) =>{
    return axios.get(API_URL + `/api/npms/v1/get-warehouse-items/${id}`,{ headers: authHeader() } )
}
const getAllBills = () =>{
    return axios.get(API_URL + '/api/npms/v1/all-bills',{ headers: authHeader() } )
}
const getBillDetails =(id) =>{
    return axios.get(API_URL + `/api/npms/v1/get-bill-details/${id}`,{ headers: authHeader() } )
}
const allEmbossing =() =>{
    return axios.get(API_URL + '/api/npms/v1/get-all-embossed',{ headers: authHeader() } )
}
const embossingCollors =() =>{
    return axios.get(API_URL + '/api/npms/v1/get-embosser-colors',{ headers: authHeader() } )
}
const getAllPlates =() =>{
    return axios.get(API_URL + '/api/npms/v1/get-all-plates',{ headers: authHeader() } )
}
const getAllCompany =() =>{
    return axios.get(API_URL + '/api/npms/v1/get-companies',{ headers: authHeader() } )
}
const getAllColor =() =>{
    return axios.get(API_URL + '/api/npms/v1/get-plate-colors',{ headers: authHeader() } )
}

const getAllUsers =() =>{
    return axios.get(API_URL + '/api/npms/v1/get-users',{ headers: authHeader() } )
}


const getServices = {
    getAllBill,
    getAllProduction,
    getAllDeliveries,
    getAllWarehouse,
    getAllStorage,
    getAllBills,
    getBillDetails,
    allEmbossing,
    embossingCollors,
    getAllPlates,
    getAllCompany,
    getAllColor,
    getAllUsers
}

export default getServices;
