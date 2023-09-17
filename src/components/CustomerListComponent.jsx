import React, { useEffect, useState } from 'react'

import {Link, Outlet, useNavigate } from 'react-router-dom'
import { FaEdit, FaTrash } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import CustomerService from '../services/CustomerService';

export default function CustomerListComponent() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        getAllCustomer();
    },[]);
    
    function getAllCustomer(){
        CustomerService.getCustomers()
        .then(res => {setCustomers(res.data)})
        .catch(e => console.log(e));
    }

    // Function to delete a customer
    const deleteCustomer = async (customerId) => {
        // Display a confirmation dialog
        const confirmed = window.confirm("Are you sure you want to delete this customer?");
      
        if (confirmed) {
          try {
            await CustomerService.deleteCustomer(customerId);
            // After successful deletion, fetch the updated list of customers
            getAllCustomer()
          } catch (error) {
            console.error('Error deleting customer:', error);
          }
        }
      };
      
    return (
      <div>
        <marquee behavior="scroll" direction="left">
          <p>Hello, My name is Satyaprasanna Dash. Welcome to Our Customer Management App. You can Add, Update, and Delete Customer data according to you need. This is made by using 
            React js in frontend and Java, Spring boot and postgresql used in backend :)
          </p>
  </marquee>
         <h2 className='text-center'>Customer List</h2>
         <Link to="/customer/add" className="btn btn-primary" data-bs-toggle="tooltip" title="Add New Customer">
            <FaPlus/>{" "}<span>Add</span>
         </Link>
         <div className="row">
            <table className="table table-striped table-boardered">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        customers.map(
                            customer =>
                            <tr key = {customer.id}>
                                <td>{customer.firstName}</td>
                                <td>{customer.lastName}</td>
                                <td>{customer.email}</td>
                                <td>
                                <Link to={`/customer/${customer.id}`} 
                                      className='btn btn-primary rounded-circle'
                                      data-bs-toggle="tooltip"
                                      title="Edit Customer">
                                    <FaEdit /> 
                                </Link>{" "}
                                <button onClick={() => deleteCustomer(customer.id)} 
                                className='btn btn-danger rounded-circle'
                                data-bs-toggle="tooltip"
                                title="Delete Customer">
                                    <FaTrash /> 
                                </button>
                                </td>
                            </tr> 
                        )
                    }
                </tbody>
            </table>
         </div>
      </div>
    )
}
