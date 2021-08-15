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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateorder = exports.createOrder = exports.getOrderById = exports.getOrders = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const name = req.query.name;
        let allorders;
        try {
            allorders = yield prisma.order.findMany();
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
        return res.status(200).json(allorders);
    });
}
exports.getOrders = getOrders;
function getOrderById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number.parseInt(req.params.id);
        let order;
        try {
            order = yield prisma.order.findUnique({
                where: {
                    id,
                },
            });
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
        return res.status(200).json(order);
    });
}
exports.getOrderById = getOrderById;
function createOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const order = req.body;
        let createdorder;
        try {
            createdorder = yield prisma.order.create({
                data: order,
            });
        }
        catch (error) {
            if (error.code === 'P2002' || error.code === 'P2003') {
                return res.status(422).json(error.message);
            }
            else {
                return res.status(500).json(error.message);
            }
        }
        return res.status(201).json(order);
    });
}
exports.createOrder = createOrder;
function updateorder(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number.parseInt(req.params.id);
        const order = req.body;
        let updated;
        try {
            updated = yield prisma.order.update({
                where: { id },
                data: order,
            });
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
        return res.status(201).json(updated);
    });
}
exports.updateorder = updateorder;
//# sourceMappingURL=order.js.map