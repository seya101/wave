import axios from 'axios'

const axiosClient = axios.create({
  baseURL: `https://www.wrike.com/api/v4/`,
  headers: {
    Authorization:
      'Bearer '+token,
  },
});

// const axiosDB = axios.create({
//   baseURL: `https://localhost:8000`
// });

export default axiosClient;
