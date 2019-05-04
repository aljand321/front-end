const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

router.get('/', (req, res) => {
    fetch('http://localhost:3000/api/servicios')
    .then(resp => resp.json())
    .then(resp =>{
      res.render('index',{
        resp
      });
  });
});

router.get('/servicios', (req, res) => {
  res.render('Servicios');
});

//esta ruta sirve para enviar datos a la tabla servicios
router.post('/servico', (req, res) => {
  var enviar = {
    descripcion: req.body.descripcion,
    sigla: req.body.sigla,
  };
      var esto={
      method: 'POST',
      body: JSON.stringify(enviar),
      headers:{
        'Content-type' : "application/json"
      }
    };
    fetch('http://localhost:3000/api/servicios',esto)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => {
      console.log(data);
      res.send(data);
    })
});

//<%- include("partials/head")%>

module.exports = router;