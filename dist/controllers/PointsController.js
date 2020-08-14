"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = __importDefault(require("../../dist/database/connection"));
require("../../dist/server");
var PointController = /** @class */ (function () {
    function PointController() {
    }
    PointController.prototype.index = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, city, uf, items, parsedItems, point;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.query, city = _a.city, uf = _a.uf, items = _a.items;
                        parsedItems = String(items)
                            .split(',')
                            .map(function (item) { return Number(item.trim()); });
                        return [4 /*yield*/, connection_1.default('points')
                                .join('point_items', 'points.id', '=', 'point_items.point_id')
                                .whereIn('point_items.item_id', parsedItems)
                                .where('city', String(city))
                                .where('uf', String(uf))
                                .distinct()
                                .select('points.*')];
                    case 1:
                        point = _b.sent();
                        return [2 /*return*/, response.json(point)];
                }
            });
        });
    };
    PointController.prototype.create = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, email, whatsapp, latitude, longitude, uf, city, items, trx, point, point_id, pointItems;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, name = _a.name, email = _a.email, whatsapp = _a.whatsapp, latitude = _a.latitude, longitude = _a.longitude, uf = _a.uf, city = _a.city, items = _a.items;
                        return [4 /*yield*/, connection_1.default.transaction()];
                    case 1:
                        trx = _b.sent();
                        return [4 /*yield*/, trx.insert({
                                name: name,
                                email: email,
                                whatsapp: whatsapp,
                                latitude: latitude,
                                longitude: longitude,
                                uf: uf,
                                city: city
                            }, ['id']).into('points')];
                    case 2:
                        point = _b.sent();
                        point_id = point[0].id;
                        pointItems = items.map(function (item_id) {
                            return {
                                item_id: item_id,
                                point_id: point_id,
                            };
                        });
                        return [4 /*yield*/, trx.insert(pointItems).into('point_items')];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, trx.commit()];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, response.json({
                                id: pointItems,
                                kk: point_id,
                            })];
                }
            });
        });
    };
    PointController.prototype.show = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, point, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        return [4 /*yield*/, connection_1.default('points').where('id', id).first()];
                    case 1:
                        point = _a.sent();
                        if (!point) {
                            return [2 /*return*/, response.status(400).json({ message: 'Point not found!' })];
                        }
                        return [4 /*yield*/, connection_1.default('items').join('point_items', 'items.id', '=', 'point_items.item_id')
                                .where('point_items.point_id', id)
                                .select('items.title', 'items.id')];
                    case 2:
                        item = _a.sent();
                        return [2 /*return*/, response.json({ point: point, item: item })];
                }
            });
        });
    };
    PointController.prototype.update = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, name, email, whatsapp, latitude, longitude, city, uf, items, trx, _b, point_id, pointItems;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        id = request.params.id;
                        _a = request.body, name = _a.name, email = _a.email, whatsapp = _a.whatsapp, latitude = _a.latitude, longitude = _a.longitude, city = _a.city, uf = _a.uf, items = _a.items;
                        return [4 /*yield*/, connection_1.default.transaction()];
                    case 1:
                        trx = _c.sent();
                        return [4 /*yield*/, trx('point_items').where('point_id', id).del()];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        _c.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, trx('points').update({
                                name: name,
                                email: email,
                                whatsapp: whatsapp,
                                latitude: latitude,
                                longitude: longitude,
                                city: city,
                                uf: uf
                            }).where('id', id)];
                    case 4:
                        _c.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        _b = _c.sent();
                        return [2 /*return*/, response.json('Erro ao atualizar')];
                    case 6:
                        point_id = id;
                        pointItems = items
                            .map(function (item_id) {
                            return {
                                item_id: item_id,
                                point_id: point_id,
                            };
                        });
                        return [4 /*yield*/, trx('point_items').insert(pointItems)];
                    case 7:
                        _c.sent();
                        return [4 /*yield*/, trx.commit()];
                    case 8:
                        _c.sent();
                        return [2 /*return*/, response.json({
                                id: point_id
                            })]; // PARA FINALIZAR A TRANSACAO SE TUDO TIVER CERTO
                }
            });
        });
    };
    PointController.prototype.delete = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, trx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        return [4 /*yield*/, connection_1.default.transaction()];
                    case 1:
                        trx = _a.sent();
                        return [4 /*yield*/, trx('point_items').where('point_id', id).del()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, trx('points').where('id', id).del()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, trx.commit()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, response.json({ sucess: true })];
                }
            });
        });
    };
    return PointController;
}());
exports.default = PointController;
