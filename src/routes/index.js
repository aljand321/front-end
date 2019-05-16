const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

//axios
var servD;

router.get('/', (req, res) => {
  res.render('index');
});


router.get('/home', (req, res) => {
    fetch('http://localhost:3000/api/servicios')
    .then(resp => resp.json())
    .then(resp =>{
      servD = resp;
      res.render('home',{
        resp
      });
  });
});

//esta ruta sirve para enviar datos a la tabla servicios
router.post('/servicio', (req, res) => {
  var enviar = req.body;
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
      servD = resp;
      res.render('servicios',{
        resp
      });
  });
});

//servcio para mostrar solo un Servicio
router.get('/api/servOne/:id', (req, res) => {
  var id = req.url;
  console.log(id);
  fetch('http://localhost:3000' + id )
    .then(resp => resp.json())
    .then(resp =>{
      res.render('updateServcios',{
        resp
      });
  });
});
//servcio para actualizar
router.post('/api/UpdateServicios/:id', (req,res) =>{
  var id = req.url;
  console.log(id + " esto es el id");
  var update = req.body;
  console.log(update);
  var esto={
    method: 'POST',
    body: JSON.stringify(update),
    headers:{
      'Content-type' : "application/json"
    }
  };
  fetch('http://localhost:3000' + id, esto)
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(data => {
    console.log(data);
    res.redirect('/servicio');
  })
});

//servicio para eliminar
router.get('/api/DElserv/:id', (req,res) => {
  var id = req.url;
  fetch('http://localhost:3000'+id)
  .then(resp => resp.json())
  .then(resp => {
    console.log(resp);
    res.redirect('/servicio')
  })
}); 

//Servcio para mostrar de una sala sus camas en una lista
router.get('/SalaCamasList/:id', (req,res) =>{
  var id = req.params;
  fetch('http://localhost:3000/api/camaSala/'+id.id,)
  .then(resp => resp.json())
  .then(resp =>{
    //res.send(resp)
    res.render('camasDisp',{
      resp
    });
  });
});


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<
//api para las salas
router.get('/sala', (req,res) => {
  fetch('http://localhost:3000/api/sala',)
  .then(resp => resp.json())
  .then(resp =>{
    res.render('salas',{
      servD,
      resp
    });
  });
});

router.post('/sala', (req, res) => {
  
  var data = req.body;
  var esto = {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-type' : "application/json"
      }
  };
  fetch('http://localhost:3000/api/sala',esto)
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(data => {
    console.log(data);
    res.redirect('/sala');
  })
});
 //api para mostrar solo una sala
router.get('/api/salaOne/:id', (req, res) => {
  var id = req.url;
  console.log(id);
  fetch('http://localhost:3000' + id )
    .then(resp => resp.json())
    .then(resp =>{
      res.render('updateSala',{
        resp
      });
  });
});

router.post('/api/UpdateSalas/:id', (req,res) =>{
  var id = req.url;
  var update = req.body;
  var esto = {
    method: 'POST',
    body: JSON.stringify(update),
    headers:{
      'Content-type' : "application/json"
    }
  };
  fetch('http://localhost:3000' + id, esto)
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(data => {
    res.redirect('/sala');
  })
});

router.get('/api/DElsala/:id', (req,res) => {
  var id = req.url;
  fetch('http://localhost:3000'+id)
  .then(resp => resp.json())
  .then(resp => {
    console.log(resp);
    res.redirect('/sala');
  })
});


//mostrar de un servicio o de una especialidad que salas tiene
router.get('/api/ServSalas/:id', (req, res) => {
  var descripcion = req.url;
  fetch('http://localhost:3000'+descripcion)
  .then(resp => resp.json())
  .then(resp => {
    console.log(resp);
    res.render('DServicio',{
      resp
    });
  })
});

//>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<>>>>
//servicios para camas
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//servicios para poder insertar a salas
var idSala;
var idS;
router.get('/camas', (req, res) => { 
  fetch('http://localhost:3000/api/sala')
  .then(resp => resp.json())
  .then(resp => {   
    if(resp == ""){
      res.send("PORFAVOR INSERTA SALAS ANTES DE INSERTAR CAMAS");
    }else{
      idSala = resp;
      idS = resp[0].id;
      res.render('camas',{
        resp
      });
    } 
  })
});

//get para mostrar datos
var dataOneSala
router.get('/mostrarSalaCama/:id', (req,res) => {
  var OneSala = req.params
  console.log(OneSala.id);
  fetch('http://localhost:3000/api/salaOne/'+OneSala.id)
  .then(resp => resp.json())
  .then(resp => {
    dataOneSala = resp;
    res.redirect('/api/camaSala/'+OneSala.id)
  })
});

//servicio para poder mostrar las camas que existe en una determinada sala
router.get('/api/camaSala/:id', (req, res) => {
  var url = req.url
  console.log(url);
  fetch('http://localhost:3000'+url)
  .then(resp => resp.json())
  .then(resp => {
    //idS = resp[0].salaID;
    console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');    
    console.log(url);
    console.log('<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>');
      res.render('camasPOST',{
        resp,
        idSala,
        url,
        dataOneSala    
    })  
  })
});

router.post('/api/camaSala/:id', (req,res) => {
  var id = req.url
  var data = req.body;
  var esto = {
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
      'Content-type' : "application/json"
    }
  };
  fetch('http://localhost:3000'+id,esto)
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(data => {
    console.log(data);
    res.redirect(id);
  })  
});

//servcio para mostrar una sola cama

router.get('/api/OnlyCama/:id', (req,res) => {
  var id = req.url
  console.log(id);
  fetch('http://localhost:3000'+id)
  .then(resp => resp.json())
  .then(resp => {
    idS = resp[0].salaID;
    console.log("salaId<<<<<<<<<<<<<<<<<");
    console.log(idS);
    console.log("salaId<<<<<<<<<<<<<<<<<<<<<");
    res.render('updateCamas',{
      resp
    });
  })
});

router.post('/api/OnlyCama/:id', (req,res) => {
  var idC = req.params;
  var id = idC.id;   
  var data = req.body;
  var esto = {
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
      'Content-type' : "application/json"
    }
  };
  fetch('http://localhost:3000/api/OnlyCama/' + id, esto)
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(data => {
    res.redirect('/api/camaSala/'+idS);
  })
});

router.get('/api/DElcama/:id', (req,res) => {
  var id = req.url;
  fetch('http://localhost:3000'+id)
  .then(resp => resp.json())
  .then(resp => {
    console.log(idS);
    res.redirect('/api/camaSala/'+idS)
  })
});

//<%- include("partials/head")%>

module.exports = router;