import axios from "axios"

const baseUrl = "http://144.202.120.172:5000/"
// const baseUrl = "http://192.168.0.104:5000/"


const service = axios.create({
  baseURL: baseUrl,
  headers:{
    "Content-Security-Policy": "upgrade-insecure-requests"
  }
})

service.interceptors.request.use(config => {
  // console.log(config);
  return config
})
service.interceptors.response.use(value => {
  // console.log(value)
  return value.data
})
export default service