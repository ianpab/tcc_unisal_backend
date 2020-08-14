"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var PointsController_1 = __importDefault(require("./controllers/PointsController"));
var ItemsController_1 = __importDefault(require("./controllers/ItemsController"));
var routes = express_1.default.Router();
var pointsController = new PointsController_1.default();
var itemsController = new ItemsController_1.default();
// ROTAS  index (listar), show (exibir), create, update, delete
routes.get('/items', itemsController.index);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);
routes.delete('/points/:id', pointsController.delete);
routes.post('/points', pointsController.create);
routes.put('/points/:id', pointsController.update);
exports.default = routes;
