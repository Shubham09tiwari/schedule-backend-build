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
const userService = {
    getUser: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.default.findOne({ _id: userId }, { password: 0, otp: 0 });
            return user;
        }
        catch (err) {
            throw new Error(err.message);
        }
    }),
    updateUser: (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!(data === null || data === void 0 ? void 0 : data.password))
                delete data.password;
            const updateUser = yield user_model_1.default.updateOne({ _id: userId }, {
                $set: data,
            });
            return updateUser;
        }
        catch (err) {
            throw new Error(err.message);
        }
    }),
};
exports.default = userService;
