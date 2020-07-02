import axios from "axios"

const baseUrl = "http://144.202.120.172:5000/"
// const baseUrl = "http://127.0.0.1:5000/"


const service = axios.create({
  baseURL: baseUrl,
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