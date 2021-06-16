var express = require('express');
var router = express.Router();
const api= require('../middleware/http.js');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try{
      let limit = req.query.limit||10;
      const headers = {
        'accept': 'application/json',
        'authorization': req.headers.authorization
      };
      const url = `https://dare-nodejs-assessment.herokuapp.com/api/policies`;
      const response = await api.get(url, {}, headers);
        // console.log(response.statusCode);
      // console.log(limit);
      response.splice(limit);
      res.status(200).send(response);
    } catch(error){
      console.log(error);
      if(error.message=='Authorization token expired'){
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

router.get('/:id', async function(req, res, next) {
  try{
    console.log(req.params);
      console.log(req.body);
      let id = req.params.id;
      console.log(id);
      const headers = {
        'accept': 'application/json',
        'authorization': req.headers.authorization
      };
      let role = "user";
      const clientUrl = `https://dare-nodejs-assessment.herokuapp.com/api/clients`;
      const clients = await api.get(clientUrl, {}, headers);
      const policyUrl = `https://dare-nodejs-assessment.herokuapp.com/api/policies`;
      const policies = await api.get(policyUrl, {}, headers);
      let clientId = 0;
      for(let policy of policies){
        if(policy.id==id){
          clientId = policy.clientId;
          break;
        }
      }
      let response = [];
      for(let client of clients){
        if(client.id == clientId){
          response.push(client);
          break;
        }
      }
      res.status(200).send(response);
    } catch(error){
      console.log(error);
      if(error.message=='Authorization token expired'){
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
