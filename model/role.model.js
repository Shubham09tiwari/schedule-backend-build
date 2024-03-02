"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const roleSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        default: null,
    },
    description: {
        type: String,
        default: null,
    },
    permissions: {
        type: Array,
        default: [],
    },
});
const roleModel = (0, mongoose_1.model)("Role", roleSchema);
exports.default = roleModel;
