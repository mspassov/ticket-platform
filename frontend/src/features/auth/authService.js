const AUTH_URL = '/api/users';

//Register the user
const registerUser = async (userData) =>{
    console.log(userData);
    const response = await fetch(`${AUTH_URL}/register`, {
        method: 'POST', 
        body: JSON.stringify(userData)
    });
    const data = await response.json();
    console.log(data);
    if(data){
        localStorage.setItem('userInfo', JSON.stringify(data));
    }

    return data;
}

const authService = {
    registerUser
}

export default authService;