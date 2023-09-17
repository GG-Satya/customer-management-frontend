// import logo from './logo.svg';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import {Routes,Route} from "react-router";
import CustomerListComponent from './components/CustomerListComponent';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import AddCustomerComponent from './components/AddCustomerComponent';

function App() { 
  return (
    <div>
      <BrowserRouter>
        <HeaderComponent/>
          <div className="container">
            <Routes>
                <Route path = "/" element={<CustomerListComponent/>}></Route>
                <Route path = "/customers" element={<CustomerListComponent/>}></Route>
                <Route path = "/customer/add" element={<AddCustomerComponent/>}></Route>
                <Route path = "/customer/edit/:id" element={<AddCustomerComponent/>}></Route>
                <Route path = "/customer/:id" element={<AddCustomerComponent/>}></Route>
            </Routes>
          </div>
          <FooterComponent/>
      </BrowserRouter>
    </div>
  );
}

export default App;
