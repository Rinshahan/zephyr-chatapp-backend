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
exports.sendOtpPhone = void 0;
const asyncErrorHandler_1 = __importDefault(require("../middlewares/asyncErrorHandler"));
const dotenv_1 = __importDefault(require("dotenv"));
const twilio_1 = __importDefault(require("twilio"));
dotenv_1.default.config({ path: './config.env' });
const client = (0, twilio_1.default)(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
const sendOtpPhone = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const phoneNumber = req.body.phone;
    yield client.messages.create({
        body: 'this is test',
        from: '+16592175539',
        to: phoneNumber
    }).then((res) => console.log(res)).catch((err) => console.log(err));
    res.status(200).json({
        status: 'success',
        message: 'OTP Send successfully'
    });
}));
exports.sendOtpPhone = sendOtpPhone;
