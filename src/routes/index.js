const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});


router.get('/home', (req, res) => {
    fetch('http://localhost:3000/api/servicios')
    .then(resp => resp.json())
    .then(resp =>{
      res.render('home',{
        resp
      });
  });
});

//esta ruta sirve para enviar datos a la tabla servicios
router.post('/servicio', (req, res) => {
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
      res.redirect('/servicio');
    })
});
router.get('/servicio', (req, res) => {
  fetch('http://localhost:3000/api/servicios')
    .then(resp => resp.json())
    .then(resp =>{
      res.render('servicios',{
        resp
      });
  });
});

//servcio para mostrar solo un Servicio
router.get('/api/servOne/:id', (req, res) => {
  var id = req.url;
  
  fetch('http://localhost:3000' + id )
    .then(resp => resp.json())
    .then(resp =>{
      console.log(resp + "    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
      res.render('updateServcios',{
        resp
      });
  });
});
router.post('/api/servicios/:id', (req,res) =>{
  var id = req.url;
  console.log(id + " esto es el id");
  var update = {
    descripcion: req.body.descripcion,
    sigla: req.body.sigla
  }
  var esto={
    method: 'POST',
    body: JSON.stringify(update),
    headers:{
      'Content-type' : "application/json"
    }
  };
  fetch('http://localhost:3000'+id,esto)
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(data => {
    console.log(data);
    res.redirect('/servicio');
  })
});

//<%- include("partials/head")%>

module.exports = router;