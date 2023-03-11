import express, { Request } from 'express';
import dotenv from 'dotenv';
import { getChatGPTAPI } from './chatgpt.js';
import cors from 'cors';
import { errorHandler } from './middlewares.js';

interface CreateChatGPTMessageRequestBody {
    text: string;
    parentMessageId?: string;
  }
  
  interface CreateChatGPTMessageResponse {
    answer: string;
    messageId: string;
  }
  
  dotenv.config();

const app = express()
const port = process.env.PORT || 8000
const api = getChatGPTAPI();

app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('API xài được!') 
})

app.post(
    '/v1/messages',
    async (
      req: Request<
        {},
        CreateChatGPTMessageResponse,
        CreateChatGPTMessageRequestBody
      >,
      res,
      next,
    ) => {
      const { text, parentMessageId } = req.body;
  
      try {
        const response = await (await api).sendMessage(text, {
          parentMessageId,
        });
        res.json({
          answer: response.text,
          messageId: response.id,
        });
      } catch (error: unknown) {
        if (error instanceof Error) {
          return next(error);
        }
        const errorMessage = typeof error === 'string' ? error : 'Something went wrong';
        return next(new Error(errorMessage));
      }
    },
  );
  
  app.listen(port, () => {
    console.log(`Run rồi nha!`);
  });
  