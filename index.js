"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const user_routes_1 = __importDefault(require("./router/user.routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_config_1 = __importDefault(require("./config/swagger.config"));
const admin_routes_1 = __importDefault(require("./router/admin.routes"));
const auth_routes_1 = __importDefault(require("./router/auth.routes"));
const initialData_1 = __importDefault(require("./utils/initialData"));
require("dotenv").config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4001;
const corsOptions = {
    origin: "*", // client origin
};
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_config_1.default));
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json({ limit: "1mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "1mb" }));
app.use(express_1.default.static(path_1.default.join(__dirname, "..")));
(0, user_routes_1.default)(app);
(0, admin_routes_1.default)(app);
(0, auth_routes_1.default)(app);
app.get("/", (req, res) => {
    res.send("Welcome to Schedule project!");
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
mongoose_1.default
    .connect(`${process.env.MONGO_DB_URL}`, {
    dbName: "schedule",
})
    .then((res) => {
    console.log("Database connected!");
    initialData_1.default.CreateRole();
})
    .catch((err) => {
    console.log(err);
});
