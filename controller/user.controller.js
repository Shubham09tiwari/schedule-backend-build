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
const user_service_1 = __importDefault(require("../service/user.service"));
const schedule_service_1 = __importDefault(require("../service/schedule.service"));
const userController = {
    // Profile
    getProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield user_service_1.default.getUser(req.userId);
            res.status(200).send({ data: user, status: true });
        }
        catch (err) {
            res.status(500).send({ error: err.message, status: false });
        }
    }),
    updateProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const update = yield user_service_1.default.updateUser(req.userId, req.body);
            res
                .status(200)
                .send({ message: "Profile updated successfully.", status: true });
        }
        catch (err) {
            res.status(500).send({ error: err.message, status: false });
        }
    }),
    // Schedule
    getMySchedules: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const schedules = yield schedule_service_1.default.getSchedulesByUser(req.userId);
            res.status(200).send({ data: schedules, status: true });
        }
        catch (err) {
            res.status(500).send({ error: err.message, status: false });
        }
    }),
    createSchedule: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const schedules = yield schedule_service_1.default.create(req.userId, req.body);
            res.status(200).send({ data: schedules, status: true });
        }
        catch (err) {
            res.status(500).send({ error: err.message, status: false });
        }
    }),
};
exports.default = userController;
