import axios from 'axios'

const CUSTOMER_API_BASE_URL="http://localhost:8080/api/v1";

class CustomerService{

    getCustomers(){
        return axios.get(CUSTOMER_API_BASE_URL+'/customers');
    }

    addCustomer(cutomerData){
        return axios.post(CUSTOMER_API_BASE_URL+'/add-customer', cutomerData);
    }
    getCustomerById(id){
        return axios.get(CUSTOMER_API_BASE_URL+'/customer/'+id);
    }
    updateCustomer(id,customerData){
        return axios.put(CUSTOMER_API_BASE_URL+'/customer/'+id, customerData);
    }
    deleteCustomer(id){
        return axios.delete(CUSTOMER_API_BASE_URL+'/customer/'+id);
    }
}

export default new CustomerService()