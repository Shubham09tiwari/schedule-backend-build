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
exports.checkPasswordOnUpdate = exports.checkPassword = exports.checkDuplicateEmailOnUpdate = exports.checkDuplicateEmail = void 0;
const user_model_1 = __importDefault(require("../model/user.model"));
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
const checkDuplicateEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email) {
        return res.status(411).send({
            message: "Email field is required!",
            status: false,
        });
    }
    if (!isValidEmail(req.body.email)) {
        return res.status(411).send({
            message: "Please provide a valid email address!",
            status: false,
        });
    }
    const findUserByEmail = yield user_model_1.default.findOne({
        email: req.body.email,
    });
    if (findUserByEmail) {
        return res.status(422).send({
            message: "Failed! Email is already in use!",
            status: false,
        });
    }
    next();
});
exports.checkDuplicateEmail = checkDuplicateEmail;
const checkDuplicateEmailOnUpdate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req;
    if (req.body.email) {
        if (!isValidEmail(req.body.email)) {
            return res.status(411).send({
                message: "Please provide a valid email address!",
                status: false,
            });
        }
        const findUserByEmail = yield user_model_1.default.findOne({
            email: req.body.email,
        });
        if (findUserByEmail &&
            (findUserByEmail === null || findUserByEmail === void 0 ? void 0 : findUserByEmail._id.toString()) !== (query === null || query === void 0 ? void 0 : query.id) &&
            (findUserByEmail === null || findUserByEmail === void 0 ? void 0 : findUserByEmail._id.toString()) !== req.userId) {
            return res.status(422).send({
                message: "Failed! Email is already in use!",
                status: false,
            });
        }
    }
    next();
});
exports.checkDuplicateEmailOnUpdate = checkDuplicateEmailOnUpdate;
const checkPassword = (req, res, next) => {
    if (!req.body.password) {
        return res.status(411).send({
            message: "Password field is required!",
            status: false,
        });
    }
    if (req.body.password.length < 8) {
        return res.status(411).send({
            message: "Failed! Password must be atleast 8 characters",
            status: false,
        });
    }
    next();
};
exports.checkPassword = checkPassword;
const checkPasswordOnUpdate = (req, res, next) => {
    if (req.body.password && req.body.password.length < 8) {
        return res.status(411).send({
            message: "Failed! Password must be atleast 8 characters",
            status: false,
        });
    }
    next();
};
exports.checkPasswordOnUpdate = checkPasswordOnUpdate;
