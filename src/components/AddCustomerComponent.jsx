import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import CustomerService from '../services/CustomerService';

export default function AddCustomerComponent(props) {
  const [customerData, setCustomerData] = useState({firstName:"", lastName:"" , email:""});
  const navigate = useNavigate();
  const {id} = useParams();

  function title(){
    return id ? "Update Customer" : "Add Customer";
  }
  useEffect(() =>{
    if (id) {
      // Use an async function to fetch the customer by ID
      const fetchCustomer = async () => {
        try {
          const response = await CustomerService.getCustomerById(id);
          setCustomerData(response.data);
        } catch (error) {
          console.error('Error fetching customer:', error);
        }
      };

      fetchCustomer();
    }
  },[id]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setCustomerData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  },[]);
// useEffect

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any of the required fields are empty or invalid
    if (!customerData.firstName || !customerData.lastName || !customerData.email) {
      alert("Please fill in all the required fields before saving.");
      return;
    }
    if (id) {
      // If an ID exists in customerData, it's an update
      CustomerService.updateCustomer(id, customerData)
        .then(() => {
          navigate("/customers");
        })
        .catch((error) => {
          console.error("Error updating customer:", error);
        });
    } else {
      // If no ID exists, it's an add operation
      CustomerService.addCustomer(customerData)
        .then(() => {
          navigate("/customers");
        })
        .catch((error) => {
          console.error("Error adding customer:", error);
        });
    }
  };

  return (
<div>
<div className='container mt-5'>
    <div className='row'>
        <div className='card col-md-6 offset-md-3'>
            <h2 className='text-center p-4'>{title()}</h2>
            <div className='card-body'>
                <form>
                    <div className='form-group mb-2'>
                        <input className='form-control' 
                        name="firstName"
                        value={customerData.firstName}
                        onChange={handleChange}
                        type="text" placeholder='Enter First Name' />
                    </div>
                    <div className='form-group mb-2'>
                        <input className='form-control' 
                        name="lastName"
                        value={customerData.lastName}
                        onChange={handleChange}
                        type="text" placeholder='Enter Last Name' />
                    </div>
                    <div className='form-group mb-2'>
                        <input className='form-control' 
                        value={customerData.email}
                        name="email"
                        onChange={handleChange}
                        type="email" placeholder='Enter Email' />
                    </div>
                    <button className='btn btn-success' onClick={handleSubmit}>Save</button> {" "}
                    <Link to="/customers" className='btn btn-danger' href="">Cancel</Link>
                </form>
            </div>
        </div>
    </div>
</div>
</div>
  )
}
