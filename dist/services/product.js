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
exports.addProduct = exports.sellProducts = exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getAllProducts = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getAllProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const name = req.query.name;
        const category = req.query.category;
        const allProducts = yield prisma.product.findMany({
            where: {
                name: {
                    contains: name,
                },
                category: category,
            },
        });
        res.status(200).json(allProducts);
    });
}
exports.getAllProducts = getAllProducts;
function createProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = req.body;
        yield prisma.product.create({
            data: product,
        });
        return res.status(200).json(product);
    });
}
exports.createProduct = createProduct;
function updateProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number.parseInt(req.params.id);
        const product = req.body;
        const updated = yield prisma.product.update({
            where: { id },
            data: product,
        });
        res.status(200).json(updated);
    });
}
exports.updateProduct = updateProduct;
function deleteProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number.parseInt(req.params.id);
        const deleted = yield prisma.product.delete({
            where: { id },
        });
        res.status(200).json(deleted);
    });
}
exports.deleteProduct = deleteProduct;
function sellProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const products = req.body;
        let updated = products.map((item) => __awaiter(this, void 0, void 0, function* () {
            const prod_qnt = yield prisma.product.findUnique({
                where: { id: item.id },
            });
            const qntFinal = ((prod_qnt === null || prod_qnt === void 0 ? void 0 : prod_qnt.quantity) || 0) - item.quantityItem;
            return yield prisma.product.update({
                where: { id: item.id },
                data: { quantity: qntFinal },
            });
        }));
        res.status(200).json(updated);
    });
}
exports.sellProducts = sellProducts;
function addProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number.parseInt(req.params.id);
        const deleted = yield prisma.product.delete({
            where: { id },
        });
        res.status(200).json(deleted);
    });
}
exports.addProduct = addProduct;
//# sourceMappingURL=product.js.map