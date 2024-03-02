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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_config_1 = __importDefault(require("../config/auth.config"));
const user_model_1 = __importDefault(require("../model/user.model"));
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ id: userId }, auth_config_1.default.secret, {
        expiresIn: "10d", // 10 days
    });
};
exports.generateToken = generateToken;
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.headers["x-access-token"];
    if (!token || Array.isArray(token)) {
        return res.status(403).send({
            message: "No token provided!",
            status: false,
        });
    }
    jsonwebtoken_1.default.verify(token, auth_config_1.default.secret, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!",
                status: false,
            });
        }
        else {
            const user = yield user_model_1.default.findById(decoded.id);
            if (user) {
                req.userId = decoded.id;
                next();
            }
            else {
                return res.status(401).send({
                    message: "Unauthorized!",
                    status: false,
                });
            }
        }
    }));
});
exports.verifyToken = verifyToken;
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(req.userId, { _id: 0, role: 1 });
    if (user.role.name !== "user" && user.role.name !== "author") {
        next();
    }
    else {
        res.status(403).send({
            message: "Require Admin Role!",
            status: false,
        });
        return;
    }
});
exports.isAdmin = isAdmin;
