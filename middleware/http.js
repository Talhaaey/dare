const axios = require('axios');




  module.exports = {
      post: async function(url, data, headers) {
        try {
          const config = {
            headers: {
              ...headers
            }
          };
          const response = await axios.post(url, data, config);

          return response.data;
        } catch (error) {
          if (error.response) {
            return error.response.data;
          }
          return error.message;
        }
      },
      get: async function(url, params, headers) {
        const config = {
          headers: {
            ...headers
          },
          params: {
            ...params
          }
        };
        try {
          const response = await axios.get(url, config);
            console.log(response);
          return response;
        } catch (error) {
          if (error.response){
            return error.response.data;
          }
          return error;
        }
      },
      delete: async function(url, params, headers) {
          const config = {
            headers: {
              ...headers
            },
            params: {
              ...params
            }
          };
          try {
            const response = await axios.delete(url, config);
            return response.data;
          } catch (error) {
            if (error.response){
              return error.response.data;
            }
            return error;
          }
        },
  };
