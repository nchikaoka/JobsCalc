
const express = require('express'); //biblioteca para criar servidor
const routes = express.Router(); //componente do express para criar rotas
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController')
const DashboardController = require('./controllers/DashboardController')
// const Profile = require('./model/Profile')

//request, response
routes.get('/', DashboardController.index);
routes.get('/job', JobController.create);
// rota para pegar dados inseridos no formulário do /job
routes.post('/job', JobController.save);
routes.get('/job/:id', JobController.show);
routes.post('/job/:id', JobController.edit);
routes.post('/job/delete/:id', JobController.delete);
routes.get('/profile', ProfileController.index);
routes.post('/profile', ProfileController.update);

module.exports = routes;