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
exports.deletePizza = exports.getTotalPizza = exports.updatePizza = exports.createPizza = exports.getPizzaById = exports.getPizzas = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getPizzas(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const flavor = req.query.flavor;
        let allPizzas;
        try {
            allPizzas = yield prisma.pizza.findMany({
                where: {
                    flavor: {
                        contains: flavor,
                    },
                },
            });
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
        return res.status(200).json(allPizzas);
    });
}
exports.getPizzas = getPizzas;
function getPizzaById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number.parseInt(req.params.id);
        let pizza;
        try {
            pizza = yield prisma.pizza.findUnique({
                where: {
                    id,
                },
            });
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
        return res.status(200).json(pizza);
    });
}
exports.getPizzaById = getPizzaById;
function createPizza(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const pizza = req.body;
        let createdPizza;
        try {
            createdPizza = yield prisma.pizza.create({
                data: pizza,
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
        return res.status(201).json(createdPizza);
    });
}
exports.createPizza = createPizza;
function updatePizza(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number.parseInt(req.params.id);
        const pizza = req.body;
        let updated;
        try {
            updated = yield prisma.pizza.update({
                where: { id },
                data: pizza,
            });
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
        return res.status(200).json(updated);
    });
}
exports.updatePizza = updatePizza;
function getTotalPizza(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let allPizzas;
        try {
            allPizzas = yield prisma.pizza.findMany();
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
        const valorTotal = allPizzas === null || allPizzas === void 0 ? void 0 : allPizzas.reduce((index, pizza) => {
            return index + ((pizza === null || pizza === void 0 ? void 0 : pizza.value) || 0);
        }, 0);
        return res.status(200).json(valorTotal);
    });
}
exports.getTotalPizza = getTotalPizza;
function deletePizza(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number.parseInt(req.params.id);
        let deleted;
        try {
            const deleted = yield prisma.pizza.delete({
                where: { id },
            });
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
        return res.status(200).json(deleted);
    });
}
exports.deletePizza = deletePizza;
//# sourceMappingURL=pizza.js.map