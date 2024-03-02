"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.requiredUserInfo = void 0;
const user_model_1 = __importStar(require("../model/user.model"));
const bcrypt_1 = require("bcrypt");
const authJWT_1 = require("../middleware/authJWT");
const otp_controller_1 = __importDefault(require("./otp.controller"));
const role_model_1 = __importDefault(require("../model/role.model"));
const requiredUserInfo = (user, authorities) => {
    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        authorities: authorities,
        accessToken: (0, authJWT_1.generateToken)(user._id),
        isVerified: user.isVerified,
        profileImg: user.profileImg,
        userPreferences: user.userPreferences,
    };
};
exports.requiredUserInfo = requiredUserInfo;
const authController = {
    signup: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const UserRole = yield role_model_1.default.findOne({ name: "user" });
            const role = {
                id: UserRole === null || UserRole === void 0 ? void 0 : UserRole._id,
                name: UserRole === null || UserRole === void 0 ? void 0 : UserRole.name,
            };
            const signup = yield user_model_1.default.create(Object.assign(Object.assign({}, req.body), { role }));
            const sendEmailOtp = yield otp_controller_1.default.sendOTP(req, res, "signup");
            res.status(200).send({
                data: {
                    _id: signup._id,
                    name: signup.name,
                    email: signup.email,
                    role: signup.role,
                    isVerified: signup.isVerified,
                },
                message: sendEmailOtp,
                status: true,
            });
        }
        catch (err) {
            res.status(500).send({ error: err.message, status: false });
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.default.findOne({
                email: req.body.email,
            });
            if (!user) {
                return res
                    .status(404)
                    .send({ message: "user not found!", status: false });
            }
            // check if user is Ban or Suspend
            if (user.status === user_model_1.userStatus.Ban) {
                return res.status(403).send({
                    message: "sorry, but your account is banned, Please contact admin",
                    status: false,
                });
            }
            if (user.status === user_model_1.userStatus.Suspend) {
                return res.status(403).send({
                    message: "sorry, but your account is suspended, Please contact admin!",
                    status: false,
                });
            }
            // verify password
            const verifyPassword = yield (0, bcrypt_1.compare)(req.body.password, user.password);
            if (!verifyPassword) {
                return res
                    .status(404)
                    .send({ message: "invalid password!", status: false });
            }
            req.body.name = user.name;
            const permissions = yield role_model_1.default.findOne({ _id: user.role.id }, { _id: 0, permissions: 1 });
            const authorities = {
                role: user.role,
                permissions: permissions.permissions,
            };
            const userInfo = (0, exports.requiredUserInfo)(user, authorities);
            return res.status(200).send({
                data: userInfo,
                isVerified: true,
                status: true,
            });
        }
        catch (err) {
            res.status(500).send({ error: err.message, status: false });
        }
    }),
    accessToken: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.default.findOne({ _id: req.userId });
            if (!user) {
                res.status(404).send({ message: "User Not found.", status: false });
            }
            else {
                const permissions = yield role_model_1.default.findOne({ _id: user.role.id }, { _id: 0, permissions: 1 });
                const authorities = {
                    role: user.role,
                    permissions: permissions.permissions,
                };
                const userInfo = (0, exports.requiredUserInfo)(user, authorities);
                res.status(200).send({
                    data: userInfo,
                    status: true,
                });
            }
        }
        catch (err) {
            res.status(500).send({ error: err.message, status: false });
        }
    }),
    resetPassward: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield user_model_1.default.updateOne({ _id: req.userId }, { password: req.body.password });
            res.status(200).send({
                message: "Password reset successfully.",
                status: true,
            });
        }
        catch (err) {
            res.status(500).send({ error: err.message, status: false });
        }
    }),
};
exports.default = authController;
