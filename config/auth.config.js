"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authConfig = {
    secret: process.env.JWT_SECRET_KEY ||
        "bFikP8UEBL6SjaWyqHARdx3FNG7Fetq2121EB64B1721A39AEz56C62BAFE6F9GnytpdJ3u09ogmZrLA5pInCEhneLW1CIesCFA37HARdx3FNF9GnytpB179AE56C62BAFdJ3uG7Fetq21221A31EB64E609og",
    NODE_ENV: process.env.NODE_ENV || "development",
};
exports.default = authConfig;
