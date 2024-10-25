import axios from 'axios'

const request = axios.create( {
    baseURL: 'https://671a6085acf9aa94f6aa66e0.mockapi.io/api/v1/',
    timeout: 10000,
})

export default request