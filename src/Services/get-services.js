
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

const getServices = {
    getAllBill,
    getAllProduction,
    getAllDeliveries,
    getAllWarehouse,
}

export default getServices;
