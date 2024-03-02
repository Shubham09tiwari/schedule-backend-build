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
const user_model_1 = __importDefault(require("../model/user.model"));
const generateOtp_1 = require("../utils/generateOtp");
const role_model_1 = __importDefault(require("../model/role.model"));
const auth_controller_1 = require("./auth.controller");
// import {
//   sendSignupOtp,
//   sendLoginOtp,
//   sendResetPassOtp,
// } from "../service/email.service";
const otpController = {
    // send otp on email
    sendOTP: (req, res, type) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const otp = (0, generateOtp_1.generateOtp)();
            yield user_model_1.default.updateOne({ email: req.body.email }, { otp: otp });
            // send Email
            // if (type === "signup") {
            //   sendSignupOtp(req.body.email, otp, req.body?.name);
            // } else if (type === "author-signup") {
            //   sendSignupOtp(req.body.email, otp, req.body?.name);
            // } else if (type === "login") {
            //   sendLoginOtp(req.body.email, otp, req.body?.name);
            // }
            return { message: "OTP send successfully!", otpStatus: "Success" };
        }
        catch (err) {
            return {
                message: "otp has failed to sent due to a error",
                error: err.message,
                otpStatus: "Failed",
            };
        }
    }),
    sendOTPForResetPass: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const otp = (0, generateOtp_1.generateOtp)();
            const user = yield user_model_1.default.findOne({ email: req.body.email });
            if (!user) {
                return res
                    .status(404)
                    .send({ message: "User not found!", status: true });
            }
            const setOtp = yield user_model_1.default.updateOne({ email: req.body.email }, { otp: otp });
            // send Email
            req.body.name = user.name;
            // sendResetPassOtp(req.body.email, otp, req.body?.name);
            if (setOtp.matchedCount > 0) {
                res
                    .status(200)
                    .send({ message: "OTP send successfully!", status: true });
            }
            else {
                res.status(500).send({
                    message: "otp has failed to sent due to a error!",
                    status: false,
                });
            }
        }
        catch (err) {
            res.status(500).send({
                message: "otp has failed to sent due to a error!",
                error: err.message,
                status: false,
            });
        }
    }),
    verifyOTP: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.default.findOne({
                email: req.body.email,
                otp: req.body.otp,
            });
            if (!user) {
                return res
                    .status(404)
                    .send({ error: "Failed! Incorrect OTP", status: false });
            }
            const verified = yield user_model_1.default.updateOne({ email: req.body.email }, { isVerified: 1 });
            const permissions = yield role_model_1.default.findOne({ _id: user.role.id }, { _id: 0, permissions: 1 });
            const authorities = {
                role: user.role,
                permissions: permissions.permissions,
            };
            const userInfo = (0, auth_controller_1.requiredUserInfo)(user, authorities);
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
};
exports.default = otpController;
