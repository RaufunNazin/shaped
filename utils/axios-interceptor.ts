import axios from "axios"

const instance = axios.create()

instance.interceptors.request.use(
  (config:any) => {
    // Modify the request config to include the desired header
    const assumedUserEmail = sessionStorage.getItem("AssumedUserEmail")
    if (assumedUserEmail) {
      config.headers["x-assumed-user-email"] = assumedUserEmail.trim()
    }
    return config
  },
  (error:any) => {
    return Promise.reject(error)
  }
)

export default instance
