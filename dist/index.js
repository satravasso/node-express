"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./router/routes");
const defaultPort = 3000;
const app = express_1.default();
app.use(express_1.default.json());
app.use('/user', routes_1.routerUser);
app.use('/pizza', routes_1.routerPizza);
app.use('/product', routes_1.routerProduct);
app.use('/category', routes_1.routerCategory);
app.use('/menu', routes_1.routerMenu);
// app.use(function (err : Error, req, res, next) {
//   res.status(err.httpStatusCode || 500).json({code: err.code, message: err.message})
// });
app.listen(defaultPort, () => {
    console.log(`Porta ${defaultPort}`);
});
//# sourceMappingURL=index.js.map