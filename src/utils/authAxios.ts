import axios from "axios";
export const authAxios = axios.create({
    baseURL:'https://reqres.in/',
    headers: {
        'x-api-key':'reqres-free-v1'
      }
})