import axios from 'axios'

const axiosClient = axios.create({
  baseURL: `https://www.wrike.com/api/v4/`,
  headers: {
    Authorization:
      'Bearer eyJ0dCI6InAiLCJhbGciOiJIUzI1NiIsInR2IjoiMSJ9.eyJkIjoie1wiYVwiOjM4NDYzOTMsXCJpXCI6ODMzMTUyMixcImNcIjo0NjMyODc0LFwidVwiOjk1OTM4MTIsXCJyXCI6XCJVU1wiLFwic1wiOltcIldcIixcIkZcIixcIklcIixcIlVcIixcIktcIixcIkNcIixcIkRcIixcIk1cIixcIkFcIixcIkxcIixcIlBcIl0sXCJ6XCI6W10sXCJ0XCI6MH0iLCJpYXQiOjE2NjAyMTQ5NjR9.Cki7YlfsQrZH36ThVLzncKMWU9fzZhlgmNx6lQ9iZkQ',
  },
});

// const axiosDB = axios.create({
//   baseURL: `https://localhost:8000`
// });

export default axiosClient;