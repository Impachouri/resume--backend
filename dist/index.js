"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_1 = __importDefault(require("./db"));
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 3000;
(0, db_1.default)()
    .then(() => {
    app_1.default.listen(PORT, () => {
        console.log(`Server start listening at port ${PORT}`);
    });
})
    .catch((error) => {
    console.log("Error while connecting Mongo DB ", error);
});
