const http= require("./http.js");

let clientsData = [];
let policiesData = [];
let etagClient;
let etagPolicies;
module.exports = {
	getPolicies: async function(url, params, headers) {
		try {
			if(etagPolicies){
				headers["If-None-Match"]=etagPolicies;
			}
			let response = await http.get(url, params, headers);
			console.log(response.status);
			if(response.status===200){
				etagClient = response.headers.etag;
				policiesData = response.data;
			}
			return policiesData;
		} catch (error) {
			console.log(error);
			return error.message;
		}
	},
	getClients: async function(url, params, headers) {
		try {
			if(etagClient){
				headers["If-None-Match"]=etagClient;
			}
			let response = await http.get(url, params, headers);
			console.log(response.status);
			if(response.status===200){
				etagClient = response.headers.etag;
				clientsData = response.data;
			}
			return clientsData;
		} catch (error) {
			return error;
		}
	}
};
