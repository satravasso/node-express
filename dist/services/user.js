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
exports.deteleUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const login = req.query.login;
        const allUsers = yield prisma.user.findMany({
            where: {
                login: {
                    contains: login,
                },
            },
        });
        res.status(200).json(allUsers);
    });
}
exports.getUsers = getUsers;
function getUserById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number.parseInt(req.params.id);
        const allUsers = yield prisma.user.findMany({
            where: {
                id,
            },
        });
        res.status(200).json(allUsers);
    });
}
exports.getUserById = getUserById;
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.body;
        yield prisma.user.create({
            data: user,
        });
        return res.status(200).json(user);
    });
}
exports.createUser = createUser;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number.parseInt(req.params.id);
        const user = req.body;
        const updated = yield prisma.user.update({
            where: { id },
            data: user,
        });
        res.status(200).json(updated);
    });
}
exports.updateUser = updateUser;
function deteleUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number.parseInt(req.params.id);
        const deleted = yield prisma.user.delete({
            where: { id },
        });
        res.status(200).json(deleted);
    });
}
exports.deteleUser = deteleUser;
//# sourceMappingURL=user.js.map