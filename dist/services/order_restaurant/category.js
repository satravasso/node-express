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
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryById = exports.getCategories = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    errorFormat: 'pretty',
});
function getCategories(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const name = req.query.name;
        let allcateogrys;
        try {
            allcateogrys = yield prisma.cateogry.findMany({
                where: {
                    name: {
                        contains: name,
                    },
                },
            });
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
        return res.status(200).json(allcateogrys);
    });
}
exports.getCategories = getCategories;
function getCategoryById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number.parseInt(req.params.id);
        let category;
        try {
            category = yield prisma.cateogry.findUnique({
                where: {
                    id,
                },
            });
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
        return res.status(200).json(category);
    });
}
exports.getCategoryById = getCategoryById;
function createCategory(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const category = req.body;
        let createdCategory;
        try {
            createdCategory = yield prisma.cateogry.create({
                data: category,
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
        return res.status(201).json(createdCategory);
    });
}
exports.createCategory = createCategory;
function updateCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number.parseInt(req.params.id);
        const category = req.body;
        let updated;
        try {
            updated = yield prisma.cateogry.update({
                where: { id },
                data: category,
            });
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
        return res.status(201).json(updated);
    });
}
exports.updateCategory = updateCategory;
function deleteCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number.parseInt(req.params.id);
        let deleted;
        try {
            deleted = yield prisma.cateogry.delete({
                where: { id },
            });
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
        return res.status(200).json(deleted);
    });
}
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=category.js.map