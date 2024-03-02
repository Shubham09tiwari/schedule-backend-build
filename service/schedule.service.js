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
const schedule_model_1 = __importDefault(require("../model/schedule.model"));
const scheduleService = {
    getSchedulesByUser: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const schedules = yield schedule_model_1.default
                .find({ userId })
                .sort({ startTime: -1 });
            return schedules;
        }
        catch (err) {
            throw new Error(err.message);
        }
    }),
    create: (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield schedule_model_1.default.create(Object.assign({ userId }, data));
        }
        catch (err) {
            throw new Error(err.message);
        }
    }),
};
exports.default = scheduleService;
