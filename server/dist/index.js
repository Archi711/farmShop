"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = express_1.default();
// const pool = new sql.ConnectionPool({
//   database: 'farmShop',
//   server: 'localhost\\SQLEXPRESS',
//   driver: 'msnodesqlv8',
//   options: {
//     trustedConnection: true
//   }
// })
// tslint:disable-next-line:no-console
const server = app.listen(process.env.APPPORT, () => console.log("RUN!"));
//# sourceMappingURL=index.js.map