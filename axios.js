// import axios from "axios";

// const instance = axios.create();
// instance.interceptors.request.use(function (config) {
//   config.headers.common["auth-token"] =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkNTQ5NzA4YzgwYjA0ZTg5YjZiODZmIn0sImlhdCI6MTY3NDkyMjM1Mn0.FRL9l4j_E12s7Vw9v_-xNU2bCQ83pRc4iLBI08WiYx8";
//   config.headers.common["Content-Type"] = "application/json";
//   return config;
// });

// export default instance;

// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const instance = axios.create();
// instance.interceptors.request.use((config) => {
//   return new Promise((resolve, reject) => {
//     AsyncStorage.getItem("token").then((token) => {
//       config.headers["auth-token"] = token;
//       resolve(config);
//     });
//   });
// });

// export default instance;

import axios from "axios";
import constants from "./constant";
import AsyncStorage from "@react-native-async-storage/async-storage";

const instance = axios.create({
  baseURL: constants.serverUrl,
});

// Alter defaults after instance has been created
instance.interceptors.request.use((config) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("token").then((token) => {
      config.headers["auth-token"] = token;
      console.log(token);
      resolve(config);
    });
  });
});
export default instance;
