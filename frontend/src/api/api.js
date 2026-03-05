import axios from "axios"

const API = axios.create({
  baseURL: "https://price-tracker-e0h6.onrender.com/"
})


export default API

