"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.disable("x-powered-by");
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const resume_routes_1 = __importDefault(require("./routes/resume.routes"));
app.get("/", (req, res) => {
    res.send("Home");
});
app.use("/user", user_routes_1.default);
app.use("/resume", resume_routes_1.default);
app.use(error_middleware_1.default);
exports.default = app;
