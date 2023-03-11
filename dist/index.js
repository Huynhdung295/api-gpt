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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const chatgpt_js_1 = require("./chatgpt.js");
const cors_1 = __importDefault(require("cors"));
const middlewares_js_1 = require("./middlewares.js");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
const api = (0, chatgpt_js_1.getChatGPTAPI)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(middlewares_js_1.errorHandler);
app.get('/', (req, res) => {
    res.send('API xài được!');
});
app.post('/v1/messages', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { text, parentMessageId } = req.body;
    try {
        const response = yield (yield api).sendMessage(text, {
            parentMessageId,
        });
        res.json({
            answer: response.text,
            messageId: response.id,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return next(error);
        }
        const errorMessage = typeof error === 'string' ? error : 'Something went wrong';
        return next(new Error(errorMessage));
    }
}));
app.listen(port, () => {
    console.log(`Run rồi nha!`);
});
//# sourceMappingURL=index.js.map