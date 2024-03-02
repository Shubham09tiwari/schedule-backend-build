"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const authJWT_1 = require("../middleware/authJWT");
const verfySignup_1 = require("../middleware/verfySignup");
const userRoutes = (app) => {
    // Profile
    /**
     * @swagger
     * '/api/user/get-profile':
     *  post:
     *     tags:
     *     - User Controller
     *     summary: Create a user
     *     parameters:
     *       - in: header
     *         name: x-access-token
     *         description: Authorization token
     *         required: true
     *         schema:
     *           type: string
     *       - in: query
     *         name: id
     *         description: user id
     *         schema:
     *           type: string
     *           default: xbvfxb87g09ei
     *     responses:
     *      200:
     *        description: Get
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
    app.get("/api/user/get-profile", (0, multer_1.default)().array(""), authJWT_1.verifyToken, user_controller_1.default.getProfile);
    app.put("/api/user/update-profile", (0, multer_1.default)().array(""), authJWT_1.verifyToken, verfySignup_1.checkDuplicateEmailOnUpdate, verfySignup_1.checkPasswordOnUpdate, user_controller_1.default.updateProfile);
    // Schedule
    /**
     * @swagger
     * '/api/user/get-my-schedules':
     *  post:
     *     tags:
     *     - Schedule Controller
     *     summary: Create a user
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - username
     *            properties:
     *              username:
     *                type: string
     *                default: johndoe
     *     responses:
     *      200:
     *        description: Get
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     *
     */
    app.get("/api/user/get-my-schedules", (0, multer_1.default)().array(""), authJWT_1.verifyToken, user_controller_1.default.getMySchedules);
    /**
     * @swagger
     * '/api/user/create-schedule':
     *  post:
     *     tags:
     *     - Schedule Controller
     *     summary: Create a user
     *     parameters:
     *       - in: header
     *         name: x-access-token
     *         description: Authorization token
     *         required: true
     *         schema:
     *           type: string
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - title
     *              - frequency
     *              - startTime
     *              - endTime
     *              - startDate
     *              - endDate
     *            properties:
     *              title:
     *                type: string
     *                default: Mrg
     *              description:
     *                type: string
     *                default: wake up
     *              frequency:
     *                type: string
     *                default: DAILY
     *              startTime:
     *                type: string
     *                default: 08:00
     *              endTime:
     *                type: string
     *                default: 09:00
     *              startDate:
     *                type: string
     *                default: 22-02-2024
     *              endDate:
     *                type: string
     *                default: 22-02-2025
     *     responses:
     *      200:
     *        description: Created
     *      401:
     *        description: Unauthorized
     *      500:
     *        description: Server Error
     *
     */
    app.post("/api/user/create-schedule", (0, multer_1.default)().array(""), authJWT_1.verifyToken, user_controller_1.default.createSchedule);
};
exports.default = userRoutes;
