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
exports.getChatGPTAPI = exports.ChatGPTAPI = void 0;
const chatgpt_1 = require("chatgpt");
Object.defineProperty(exports, "ChatGPTAPI", { enumerable: true, get: function () { return chatgpt_1.ChatGPTAPI; } });
function getChatGPTAPI() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            throw new Error('Missing OpenAI API key. Please provide OPENAI_API_KEY as an env variable.');
        }
        const api = new chatgpt_1.ChatGPTAPI({ apiKey });
        return api;
    });
}
exports.getChatGPTAPI = getChatGPTAPI;
//# sourceMappingURL=chatgpt.js.map