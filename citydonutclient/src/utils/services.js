import axios from 'axios';

axios.interceptors.response.use((response) => {
    return response;
}, function (error) {
    // Do something with response error
    if (error.response.status === 403) {
        // axios.get('http://localhost:8091/sign-out', { withCredentials: true }).then(
        // );

        // window.location.replace('http://localhost:3000/login')
    }
    return Promise.reject(error.response);
});

export default axios;
