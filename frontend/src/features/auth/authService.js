import axios from 'axios';

const API_URL = '/api/users';

//Register the user
const registerUser = async (userData) =>{
    
    console.log(userData);
    // const response = await fetch(`${API_URL}/register`, {
    //     method: 'POST', 
    //     body: {
    //         name: userData.name,
    //         email: userData.email,
    //         password: userData.password
    //     }
    // });
    // const data = await response.json();
    // console.log(data);

    const response = await axios.post(`${API_URL}/register`, userData);


    if(response.data){
        localStorage.setItem('userInfo', JSON.stringify(response.data));
    }

    return response.data;
}

const authService = {
    registerUser
}

export default authService;