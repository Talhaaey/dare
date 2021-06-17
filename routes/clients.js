var express = require("express")
var router = express.Router();
const api= require("../middleware/apis.js");

/* GET users listing. */
router.get("/", async function(req, res, next) {
	try{
		let limit = req.query.limit||10;
		let name = req.query.name||"";
		const headers = {
			"accept": "application/json",
			"authorization": req.headers.authorization
		};
		const url = "https://dare-nodejs-assessment.herokuapp.com/api/clients";
		const response = await api.getClients(url, {}, headers);
		// console.log(response.statusCode);
		// console.log(limit);
		let clients = [];
		if(name.length){
			for(let client of response){
				if(client.name.toLowerCase().includes(name.toLowerCase())){
					clients.push(client);
				}
			}
		} else{
			clients= response;
		}
		clients.splice(limit);
		res.status(200).send(clients);
	} catch(error){
		console.log(error);
		if(error.message==="Authorization token expired"){
			return res.status(401).send({
				"code": 0,
				"message":"Authorization token expired"
			})
		}
		console.log(error);
		return res.status(401).send({
			"code": 0,
			"message":"Not authorized"
		})
	}
});

router.get("/:id", async function(req, res, next) {
	try{
		let id = req.params.id;
		console.log(id);
		const headers = {
			"accept": "application/json",
			"authorization": req.headers.authorization
		};
		const clientUrl = "https://dare-nodejs-assessment.herokuapp.com/api/clients";
		const clients = await api.getClients(clientUrl, {}, headers);
		let response = [];
		for(let client of clients){
			if(client.id === id){
				if(client.role==="user"){
					response.push(client);
				}else{
					response = clients;
				}
				break;
			}
		}
		res.status(200).send(response);
	} catch(error){
		console.log(error);
		if(error.message==="Authorization token expired"){
			return res.status(401).send({
				"code": 0,
				"message":"Authorization token expired"
			})
		}
		console.log(error);
		return res.status(401).send({
			"code": 0,
			"message":"Not authorized"
		})
	}
});

router.get("/:id/policies", async function(req, res, next) {
	try{
		console.log(req.params);
		console.log(req.body);
		let id = req.params.id;
		console.log(id);
		const headers = {
			"accept": "application/json",
			"authorization": req.headers.authorization
		};
		let role = "user";
		const clientUrl = "https://dare-nodejs-assessment.herokuapp.com/api/clients";
		const clients = await api.getClients(clientUrl, {}, headers);
		const policyUrl = "https://dare-nodejs-assessment.herokuapp.com/api/policies";
		const policies = await api.getPolicies(policyUrl, {}, headers);
		for(let client of clients){
			if(client.id === id){
				role = client.role;
				break;
			}
		}
		console.log(role);
		let response = [];
		if(role === "user"){
			for(let policy of policies){
				if(policy.clientId===id){
					response.push(policy);
					break;
				}
			}
		} else{
			response = policies;
		}
		res.status(200).send(response);
	} catch(error){
		console.log(error);
		if(error.message==="Authorization token expired"){
			return res.status(401).send({
				"code": 0,
				"message":"Authorization token expired"
			})
		}
		console.log(error);
		return res.status(401).send({
			"code": 0,
			"message":"Not authorized"
		})
	}
});

module.exports = router;
