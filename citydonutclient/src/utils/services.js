import axios from 'axios';

axios.interceptors.response.use((response) => {
    return response;
}, function (error) {
    // Do something with response error
    if (error.response && error.response.status === 403) {
        console.log("403 forbidden");
        document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = 'JWT=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        window.location.replace('http://localhost:3000/login');
    }
    return Promise.reject(error.response);
});

export default axios;
