var express = require('express');
var router = express.Router();
const api= require('../middleware/http.js');
/* GET home page. */
router.post('/', async function(req, res, next) {
  try{
    let client_id = req.body.username;
    let client_secret = req.body.password;
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };
      const url = `https://dare-nodejs-assessment.herokuapp.com/api/login`;
      let response = await api.post(url, {
        client_id: client_id,
        client_secret: client_secret,
      }, headers);

      response.expires_in = 60000;

      res.status(200).send(response);
  } catch(error){
    console.log(error);
    if(error.statusCode==401){
      return res.status(401).send({
        "code": 0,
        "message":"Authorization token expired"
      })
    }
    return res.status(400).send({
      "code": 0,
      "message":"Bad request"
    })
  }

});

module.exports = router;
