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
exports.deleteMenu = exports.updateMenu = exports.createMenu = exports.getMenuById = exports.getMenus = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getMenus(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const name = req.query.name;
        let allmenus;
        try {
            allmenus = yield prisma.menu.findMany({
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
        return res.status(200).json(allmenus);
    });
}
exports.getMenus = getMenus;
function getMenuById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number.parseInt(req.params.id);
        let menu;
        try {
            menu = yield prisma.menu.findUnique({
                where: {
                    id,
                },
            });
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
        return res.status(200).json(menu);
    });
}
exports.getMenuById = getMenuById;
function createMenu(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const menu = req.body;
        let createdMenu;
        try {
            createdMenu = yield prisma.menu.create({
                data: menu,
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
        return res.status(201).json(menu);
    });
}
exports.createMenu = createMenu;
function updateMenu(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number.parseInt(req.params.id);
        const menu = req.body;
        let updated;
        try {
            updated = yield prisma.menu.update({
                where: { id },
                data: menu,
            });
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
        return res.status(201).json(updated);
    });
}
exports.updateMenu = updateMenu;
function deleteMenu(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number.parseInt(req.params.id);
        let deleted;
        try {
            deleted = yield prisma.menu.delete({
                where: { id },
            });
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
        return res.status(200).json(deleted);
    });
}
exports.deleteMenu = deleteMenu;
//# sourceMappingURL=menu.js.map