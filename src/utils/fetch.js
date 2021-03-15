import { BASE, CLIENT_ID, SERVER_KEY, BASIC_AUTH_USERNAME, BASIC_AUTH_PASSWORD } from "./constatnt";
const axios = require("axios");

// const get = async (endpoint, token) => {
//   const URL = BASE + endpoint;
//   const uuid = await AsyncStorage.getItem('uuid');
//   console.log(URL);
//   return new Promise((resolve, reject) => {
//     fetch(URL, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'User-Agent': uuid,
//         Authorization: token,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         // console.log(data)
//         if (data.status == 200) {
//           resolve(data.data);
//         } else {
//           reject(data.message);
//         }
//       });
//   });
// };

const post = async (endpoint, body, auth) => {
  const URL = BASE + endpoint;
  return new Promise((resolve, reject)=> {
    axios
    .post(
      URL,
      body,
      {
        headers: {
          "Content-Type": "Application/json",
          "SERVER_KEY": SERVER_KEY,
          "Authorization" : `Basic ${btoa(BASIC_AUTH_USERNAME+':'+BASIC_AUTH_PASSWORD)}`
        },
      }
    )
    .then(function (response) {
      resolve(response)
    })
    .catch(function (error) {
      reject(error)
    });
  })
};

// const put = async (endpoint, data, token) => {
//   const uuid = await AsyncStorage.getItem('uuid');
//   const URL = BASE + endpoint;
//   console.log(URL);
//   return new Promise((resolve, reject) => {
//     fetch(URL, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'User-Agent': uuid,
//         authorization: token,
//       },
//       body: data,
//     })
//       .then((res) => res.json())
//       .then((res) => {
//         if (res.status == 200) {
//           resolve(res.data);
//         } else {
//           reject(res.message);
//         }
//       });
//   });
// };

// const del = async (endpoint, token) => {
//   const uuid = await AsyncStorage.getItem('uuid');
//   const URL = BASE + endpoint;
//   console.log(URL);
//   return new Promise((resolve, reject) => {
//     fetch(URL, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//         'User-Agent': uuid,
//         authorization: token,
//       }
//     })
//       .then((res) => res.json())
//       .then((res) => {
//         if (res.status == 200) {
//           resolve(res);
//         } else {
//           reject(res);
//         }
//       });
//   });
// };

export default {
  // get,
  post,
  // put,
  // del
};
