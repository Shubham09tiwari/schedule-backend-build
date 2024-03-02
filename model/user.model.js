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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userStatus = exports.mode = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = require("bcrypt");
var mode;
(function (mode) {
    mode["LIGHT"] = "LIGHT";
    mode["DARK"] = "DARK";
})(mode || (exports.mode = mode = {}));
var userStatus;
(function (userStatus) {
    userStatus["Active"] = "Active";
    userStatus["Inactive"] = "Inactive";
    userStatus["Requested"] = "Requested";
    userStatus["Rejected"] = "Rejected";
    userStatus["Ban"] = "Ban";
    userStatus["Suspend"] = "Suspend";
})(userStatus || (exports.userStatus = userStatus = {}));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: function () {
            return this.role.name === "author";
        },
        default: "",
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImg: {
        type: String,
        default: null,
    },
    profileImgPath: {
        type: String,
        default: null,
    },
    bio: {
        type: String,
        default: "",
    },
    otp: {
        type: Number,
        default: null,
    },
    role: {
        type: {
            id: { type: mongoose_1.Schema.Types.ObjectId, ref: "Role" },
            name: {
                type: String,
                required: true,
            },
            _id: false,
        },
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: userStatus,
        default: userStatus.Active,
    },
    userPreferences: {
        type: {
            mode: {
                type: String,
                enum: mode,
                default: "LIGHT",
            },
        },
        default: { mode: "LIGHT" },
        _id: false,
    },
}, {
    timestamps: true,
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password")) {
            return next();
        }
        const hashedPassword = (0, bcrypt_1.hashSync)(this.password, 10);
        this.password = hashedPassword;
        return next();
    });
});
userSchema.pre("updateOne", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const update = this.getUpdate();
        if (!update || !update.$set || !update.$set.password) {
            return next();
        }
        const hashedPassword = (0, bcrypt_1.hashSync)(update.$set.password, 10);
        update.$set.password = hashedPassword;
        next();
    });
});
const userModel = (0, mongoose_1.model)("User", userSchema);
exports.default = userModel;
