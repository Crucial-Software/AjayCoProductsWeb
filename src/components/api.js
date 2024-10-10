import { API_BASE } from './urlLink';

// LOGIN
export const loginUser = async (toInput) => {
    try {
        const response = await fetch(`${API_BASE}/login`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toInput)
        });
        return response;
    } catch (error) {
        console.error("api - loginUser error: " + error);
    }
}

// REGISTER
export const registerUser = async (toInput) => {
    try {
        const response = await fetch(`${API_BASE}/register`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toInput)
        });
        return response;
    } catch (error) {
        console.error("api - registerUser error: " + error);
    }
}

// CHANGE PASSWORD
export const updatePassword = async (toInput) => {
    try {
        const response = await fetch(`${API_BASE}/changepassword`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toInput)
        });
        return response;
    } catch (error) {
        console.error("api - updatePassword error: " + error);
    }
}

// CONTACT US
export const contactUs = async (toInput) => {
    try {
        const response = await fetch(`${API_BASE}/contactus`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toInput)
        });
        return response;
    } catch (error) {
        console.error("api - contactUs error: " + error);
    }
}

//USERS
export const getAllUsers = async () => {
    try {
        const response = await fetch(`${API_BASE}/listusers`, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response;
    } catch (error) {
        console.error("api - getAllUsers error: " + error);
    }
}

export const getUserById = async (toInput) => {
    try {
        const response = await fetch(`${API_BASE}/finduser`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toInput)
        });
        return response;
    } catch (error) {
        console.error("api - getUserById error: " + error);
    }
}

export const updateUser = async (toInput) => {
    try {
        const response = await fetch(`${API_BASE}/updateuser`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toInput)
        });
        return response;
    } catch (error) {
        console.error("api - updateUser error: " + error);
    }
}

export const deleteUser = async (toInput) => {
    try {
        const response = await fetch(`${API_BASE}/deleteuser`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toInput)
        });
        return response;
    } catch (error) {
        console.error("api - deleteUser error: " + error);
    }
}

//CUSTOMERS
export const getAllCustomers = async () => {
    try {
        const response = await fetch(`${API_BASE}/listcustomers`, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response;
    } catch (error) {
        console.error("api - getAllCustomers error: " + error);
    }
}

export const deleteCustomer = async (toInput) => {
    try {
        const response = await fetch(`${API_BASE}/deletecustomer`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toInput)
        });
        return response;
    } catch (error) {
        console.error("api - deleteCustomers error: " + error);
    }
}

// STATE
export const getAllStates = async () => {
    try {
        const response = await fetch(`${API_BASE}/liststates`, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response;
    } catch (error) {
        console.error("api - getAllStates error: " + error);
    }
}

export const getStateById = async (toInput) => {
    try {
        const response = await fetch(`${API_BASE}/findstate`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toInput)
        });
        return response;
    } catch (error) {
        console.error("api - getStateById error: " + error);
    }
}

export const addNewState = async (toInput) => {
    try {
        const response = await fetch(`${API_BASE}/createstate`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toInput)
        });
        return response;
    } catch (error) {
        console.error("api - addNewState error: " + error);
    }
}

export const updateState = async (toInput) => {
    try {
        const response = await fetch(`${API_BASE}/updatestate`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toInput)
        });
        return response;
    } catch (error) {
        console.error("api - updateState error: " + error);
    }
}

export const deleteState = async (toInput) => {
    try {
        const response = await fetch(`${API_BASE}/deletestate`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toInput)
        });
        return response;
    } catch (error) {
        console.error("api - deleteState error: " + error);
    }
}

// CITY
export const getAllCities = async () => {
    try {
        const response = await fetch(`${API_BASE}/listcities`, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response;
    } catch (error) {
        console.error("api - getAllCities error: " + error);
    }
}

export const getCityById = async (toInput) => {
    try {
        const response = await fetch(`${API_BASE}/findcity`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toInput)
        });
        return response;
    } catch (error) {
        console.error("api - getCityById error: " + error);
    }
}

export const getAllCitiesByStateId = async (toInput) => {
    try {
        const response = await fetch(`${API_BASE}/citiesinstate`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toInput)
        });
        return response;
    } catch (error) {
        console.error("api - getAllCitiesByStateId error: " + error);
    }
}

export const addNewCity = async (toInput) => {
    try {
        const response = await fetch(`${API_BASE}/createcity`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toInput)
        });
        return response;
    } catch (error) {
        console.error("api - addNewCity error: " + error);
    }
}

export const updateCity = async (toInput) => {
    try {
        const response = await fetch(`${API_BASE}/updatecity`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toInput)
        });
        return response;
    } catch (error) {
        console.error("api - updateCity error: " + error);
    }
}

export const deleteCity = async (toInput) => {
    try {
        const response = await fetch(`${API_BASE}/deletecity`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toInput)
        });
        return response;
    } catch (error) {
        console.error("api - deleteCity error: " + error);
    }
}

// CUSTOMER GROUPS
export const getAllCustomerGroups = async () => {
    try {
        const response = await fetch(`${API_BASE}/listcustomergroups`, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response;
    } catch (error) {
        console.error("api - getAllCustomerGroups error: " + error);
    }
}

export const getCustomerGroupById = async (toInput) => {
    try {
        const response = await fetch(`${API_BASE}/findcustomergroup`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toInput)
        });
        return response;
    } catch (error) {
        console.error("api - getCustomerGroupById error: " + error);
    }
}

export const addNewCustomerGroup = async (toInput) => {
    try {
        const response = await fetch(`${API_BASE}/createcustomergroup`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toInput)
        });
        return response;
    } catch (error) {
        console.error("api - addNewCustomerGroup error: " + error);
    }
}

export const updateCustomerGroup = async (toInput) => {
    try {
        const response = await fetch(`${API_BASE}/updatecustomergroup`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toInput)
        });
        return response;
    } catch (error) {
        console.error("api - updateCustomerGroup error: " + error);
    }
}

export const deleteCustomerGroup = async (toInput) => {
    try {
        const response = await fetch(`${API_BASE}/deletecustomergroup`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toInput)
        });
        return response;
    } catch (error) {
        console.error("api - deleteCustomerGroup error: " + error);
    }
}

// CATEGORY
export const getAllCategories = async () => {
    try {
        const response = await fetch(`${API_BASE}/listcategories`, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response;
    } catch (error) {
        console.error("api - getAllCategories error: " + error);
    }
}

export const getCategoryById = async (toInput) => {
    try {
        const response = await fetch(`${API_BASE}/findcategory`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toInput)
        });
        return response;
    } catch (error) {
        console.error("api - getCategoryById error: " + error);
    }
}

export const addNewCategory = async (formData) => {
    try {
        const response = await fetch(`${API_BASE}/createcategory`, {
            method: "POST",
            body: formData
        });
        return response;
    } catch (error) {
        console.error("api - addNewCategory error: " + error);
    }
}

export const updateCategory = async (formData) => {
    try {
        const response = await fetch(`${API_BASE}/updatecategory`, {
            method: "POST",
            body: formData
        });
        return response;
    } catch (error) {
        console.error("api - updateCategory error: " + error);
    }
}

export const deleteCategory = async (toInput) => {
    try {
        const response = await fetch(`${API_BASE}/deletecategory`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toInput)
        });
        return response;
    } catch (error) {
        console.error("api - deleteCategory error: " + error);
    }
}

// UNIT
export const getAllUnits = async () => {
    try {
        const response = await fetch(`${API_BASE}/listunits`, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response;
    } catch (error) {
        console.error("api - getAllUnits error: " + error);
    }
}

export const getUnitById = async (toInput) => {
    try {
        const response = await fetch(`${API_BASE}/findunit`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toInput)
        });
        return response;
    } catch (error) {
        console.error("api - getUnitById error: " + error);
    }
}

export const addNewUnit = async (toInput) => {
    try {
        const response = await fetch(`${API_BASE}/createunit`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toInput)
        });
        return response;
    } catch (error) {
        console.error("api - addNewUnit error: " + error);
    }
}

export const updateUnit = async (toInput) => {
    try {
        const response = await fetch(`${API_BASE}/updateunit`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toInput)
        });
        return response;
    } catch (error) {
        console.error("api - updateUnit error: " + error);
    }
}

export const deleteUnit = async (toInput) => {
    try {
        const response = await fetch(`${API_BASE}/deleteunit`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toInput)
        });
        return response;
    } catch (error) {
        console.error("api - deleteUnit error: " + error);
    }
}

// FEATURES
export const getAllFeatures = async () => {
    try {
        const response = await fetch(`${API_BASE}/listfeaturemasters`, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response;
    } catch (error) {
        console.error("api - getAllFeatures error: " + error);
    }
}

export const getFeatureById = async (toInput) => {
    try {
        const response = await fetch(`${API_BASE}/findfeaturemaster`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toInput)
        });
        return response;
    } catch (error) {
        console.error("api - getFeatureById error: " + error);
    }
}

export const addNewFeature = async (toInput) => {
    try {
        const response = await fetch(`${API_BASE}/createfeaturemaster`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toInput)
        });
        return response;
    } catch (error) {
        console.error("api - addNewFeature error: " + error);
    }
}

export const updateFeature = async (toInput) => {
    try {
        const response = await fetch(`${API_BASE}/updatefeaturemaster`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toInput)
        });
        return response;
    } catch (error) {
        console.error("api - updateFeature error: " + error);
    }
}

export const deleteFeature = async (toInput) => {
    try {
        const response = await fetch(`${API_BASE}/deletefeaturemaster`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toInput)
        });
        return response;
    } catch (error) {
        console.error("api - deleteFeature error: " + error);
    }
}

// FEATURE OTPTIONS
export const getAllFeatureOptions = async () => {
    try {
        const response = await fetch(`${API_BASE}/listfeatureoptions`, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response;
    } catch (error) {
        console.error("api - getAllFeatureOptions error: " + error);
    }
}

export const getFeatureOptionById = async (toInput) => {
    try {
        const response = await fetch(`${API_BASE}/findfeatureoption`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toInput)
        });
        return response;
    } catch (error) {
        console.error("api - getFeatureOptionById error: " + error);
    }
}

export const addNewFeatureOption = async (toInput) => {
    try {
        const response = await fetch(`${API_BASE}/createfeatureoption`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toInput)
        });
        return response;
    } catch (error) {
        console.error("api - addNewFeatureOption error: " + error);
    }
}

export const updateFeatureOption = async (toInput) => {
    try {
        const response = await fetch(`${API_BASE}/updatefeatureoption`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toInput)
        });
        return response;
    } catch (error) {
        console.error("api - updateFeatureOption error: " + error);
    }
}

export const deleteFeatureOption = async (toInput) => {
    try {
        const response = await fetch(`${API_BASE}/deletefeatureoption`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toInput)
        });
        return response;
    } catch (error) {
        console.error("api - deleteFeatureOption error: " + error);
    }
}

//PRODUCTS
export const getAllProducts = async () => {
    try {
        const response = await fetch(`${API_BASE}/listproducts`, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response;
    } catch (error) {
        console.error("api - getAllProducts error: " + error);
    }
}

export const getProductById = async (toInput) => {
    try {
        const response = await fetch(`${API_BASE}/findproduct`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toInput)
        });
        return response;
    } catch (error) {
        console.error("api - getProductById error: " + error);
    }
}

//CART
export const getCartItems = async (toInput) => {
    try {
        const response = await fetch(`${API_BASE}/listcarts`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toInput)
        });
        return response;
    } catch (error) {
        console.error("api - getCartItems error: " + error);
    }
}

export const addToCart = async (toInput) => {
    try {
        const response = await fetch(`${API_BASE}/createcart`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toInput)
        });
        return response;
    } catch (error) {
        console.error("api - addItemToCart error: " + error);
    }
}

export const deleteFromCart = async (toInput) => {
    try {
        const response = await fetch(`${API_BASE}/deletecart`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toInput)
        });
        return response;
    } catch (error) {
        console.error("api - deleteFromCart error: " + error);
    }
}

export const updateInCart = async (toInput) => {
    try {
        const response = await fetch(`${API_BASE}/updatecart`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toInput)
        });
        return response;
    } catch (error) {
        console.error("api - updateInCart error: " + error);
    }
}

export const createOrderMaster = async (toInput) => {
    try {
        const response = await fetch(`${API_BASE}/createorder`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toInput)
        });
        return response;
    } catch (error) {
        console.error("api - createOrderMaster error: " + error);
    }
}

//PRODUCT IMAGE
export const createProductImage = async (formData) => {
    try {
        const response = await fetch(`${API_BASE}/createproductimage`, {
            method: "POST",
            body: formData
        });
        return response;
    } catch (error) {
        console.error("api - createProductImage error: " + error);
    }
}