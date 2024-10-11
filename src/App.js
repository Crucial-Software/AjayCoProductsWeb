import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './screens/Home';
import AboutUs from './screens/AboutUs';
import ContactUs from './screens/ContactUs';
import Shop from './screens/Shop';
import Categories from './screens/Categories';
import ProductDetails from './screens/ProductDetails';
import ViewAttachment from './screens/ViewAttachment';
import Login from './screens/Login';
import Register from './screens/Register';
import ForgotPassword from './screens/ForgotPassword';
import PrivacyPolicy from './screens/PrivacyPolicy';
import TermsAndConditions from './screens/TermsAndConditions';
import RefundAndCancellationPolicy from './screens/RefundAndCancellationPolicy';
import Cart from './screens/Cart';
import Checkout from './screens/Checkout';
import PlaceOrder from './screens/PlaceOrder';
import ChangePassword from './screens/ChangePassword';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './screens/admin/Dashboard';
import Users from './screens/admin/Users';
import Customers from './screens/admin/Customers';
import ManageStates from './screens/admin/ManageStates';
import ManageCities from './screens/admin/ManageCities';
import CustomerGroup from './screens/admin/CustomerGroup';
import ManageCategory from './screens/admin/ManageCategory';
import ManageUnit from './screens/admin/ManageUnit';
import ManageFeatureMaster from './screens/admin/ManageFeatureMaster';
import ManageFeatureOptions from './screens/admin/ManageFeatureOptions';
import ChangeAdminPassword from './screens/admin/ChangeAdminPassword';
import ProtectedRoute from './components/ProtectedRoute';
//import Check from './screens/admin/Check';
import ManageProducts from './screens/admin/ManageProducts';
import CreateNewProduct from './screens/admin/CreateNewProduct';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} onChange />
        <Route path="/home" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/shop" element={<Shop />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/productdetails' element={<ProductDetails />} />
        <Route path='/viewattachment' element={<ViewAttachment />} />
        <Route path='/privacypolicy' element={<PrivacyPolicy />} />
        <Route path='/termsandconditions' element={<TermsAndConditions />} />
        <Route path='/refundandcancellationpolicy' element={<RefundAndCancellationPolicy />} />

        <Route path='/login' element={<ProtectedRoute Component={Login} />} />
        <Route path='/register' element={<ProtectedRoute Component={Register} />} />
        <Route path='/forgotpassword' element={<ProtectedRoute Component={ForgotPassword} />} />

        <Route path="/changepassword" element={<PrivateRoute Component={ChangePassword} userRole={"customer, dealer"} />} />
        <Route path="/cart" element={<PrivateRoute Component={Cart}  userRole={"customer, dealer"} />} />
        <Route path="/checkout" element={<PrivateRoute Component={Checkout} userRole={"customer, dealer"} />} />
        <Route path="/placeorder" element={<PrivateRoute Component={PlaceOrder} userRole={"customer, dealer"} />} />

        <Route path="/changeadminpassword" element={<PrivateRoute Component={ChangeAdminPassword} userRole={"admin"} />} />
        <Route path="/dashboard" element={<PrivateRoute Component={Dashboard} userRole={"admin"} />} />
        <Route path="/users" element={<PrivateRoute Component={Users} userRole={"admin"} />} />
        <Route path="/customers" element={<PrivateRoute Component={Customers} userRole={"admin"} />} />
        <Route path="/managestates" element={<PrivateRoute Component={ManageStates} userRole={"admin"} />} /> 
        {/* <Route path="/check" element={<PrivateRoute Component={Check} userRole={"admin"} />} /> */}
        <Route path="/managecities" element={<PrivateRoute Component={ManageCities} userRole={"admin"} />} />
        <Route path="/customergroup" element={<PrivateRoute Component={CustomerGroup} userRole={"admin"} />} />
        <Route path="/managecategory" element={<PrivateRoute Component={ManageCategory} userRole={"admin"} />} />
        <Route path="/manageunit" element={<PrivateRoute Component={ManageUnit} userRole={"admin"} />} />
        <Route path="/managefeaturemaster" element={<PrivateRoute Component={ManageFeatureMaster} userRole={"admin"} />} />
        <Route path="/managefeatureoptions" element={<PrivateRoute Component={ManageFeatureOptions} userRole={"admin"} />} />
        <Route path="/manageproducts" element={<PrivateRoute Component={ManageProducts} userRole={"admin"} />} />
        <Route path="/createnewproduct" element={<PrivateRoute Component={CreateNewProduct} userRole={"admin"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
