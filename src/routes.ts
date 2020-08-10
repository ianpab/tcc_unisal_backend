import express from 'express';
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();

const pointsController = new PointsController();
const itemsController = new ItemsController();

// ROTAS  index (listar), show (exibir), create, update, delete
routes.get('/items',itemsController.index );
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);
routes.delete('/points/:id', pointsController.delete);

routes.post('/points',
 pointsController.create);

 routes.put('/points/:id',
 pointsController.update);

export default routes;