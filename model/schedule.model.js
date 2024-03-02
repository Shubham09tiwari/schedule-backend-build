"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleFrequency = void 0;
const mongoose_1 = require("mongoose");
var scheduleFrequency;
(function (scheduleFrequency) {
    scheduleFrequency["ONCE"] = "ONCE";
    scheduleFrequency["DAILY"] = "DAILY";
    scheduleFrequency["WEEKLY"] = "WEEKLY";
    scheduleFrequency["MONTHLY"] = "MONTHLY";
    scheduleFrequency["YEARLY"] = "YEARLY";
})(scheduleFrequency || (exports.scheduleFrequency = scheduleFrequency = {}));
const scheduleSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    frequency: {
        type: String,
        enum: scheduleFrequency,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
});
const scheduleModel = (0, mongoose_1.model)("Schedule", scheduleSchema);
exports.default = scheduleModel;
