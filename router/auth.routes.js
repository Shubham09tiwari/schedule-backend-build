"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const auth_controller_1 = __importDefault(require("../controller/auth.controller"));
const authJWT_1 = require("../middleware/authJWT");
const verfySignup_1 = require("../middleware/verfySignup");
const otp_controller_1 = __importDefault(require("../controller/otp.controller"));
const authRoutes = (app) => {
    app.post("/api/auth/signup", (0, multer_1.default)().array(""), verfySignup_1.checkDuplicateEmail, verfySignup_1.checkPassword, auth_controller_1.default.signup);
    app.post("/api/auth/send-otp-reset-pass", (0, multer_1.default)().array(""), otp_controller_1.default.sendOTPForResetPass);
    app.post("/api/auth/verify-otp", (0, multer_1.default)().array(""), otp_controller_1.default.verifyOTP);
    /**
     * @swagger
     * '/api/auth/login':
     *  post:
     *     tags:
     *     - User Controller
     *     summary: login
     *     requestBody:
     *         required: true
     *         content:
     *           application/json:
     *              schema:
     *               type: object
     *               required:
     *                 - email
     *                 - password
     *               properties:
     *                 email:
     *                   type: string
     *                   default: johndoe@gmail.com
     *                 password:
     *                   type: string
     *                   default: 123456
     *     responses:
     *      200:
     *        description: Get
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
    app.post("/api/auth/login", (0, multer_1.default)().array(""), auth_controller_1.default.login);
    app.get("/api/auth/access-token", (0, multer_1.default)().array(""), authJWT_1.verifyToken, auth_controller_1.default.accessToken);
    app.post("/api/auth/reset-passward", (0, multer_1.default)().array(""), authJWT_1.verifyToken, auth_controller_1.default.resetPassward);
};
exports.default = authRoutes;
