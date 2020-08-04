import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-react-burger-43b42.firebaseio.com/',
});

export default instance;
