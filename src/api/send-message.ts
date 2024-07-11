import axios from 'axios';
import {botToken} from "../configs/global.ts";

const instance = axios.create({
    baseURL: 'https://api.telegram.org',
});

export async function sendMessage(chatId: string | number, text: string): Promise<void> {
    try {
        const response = await instance.post(`/bot${botToken.VITE_BOT_TOKEN}/sendMessage`, {
            chat_id: chatId,
            text: text,
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data
    } catch (error) {
        console.error('Failed to send message', error);
        throw new Error('Failed to send message');
    }
}
