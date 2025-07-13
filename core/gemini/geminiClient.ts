import { GoogleGenAI } from "@google/genai";
import { Settings } from "../types";

export class GeminiClient {
	private apiKey: string;
	private model: string;

	constructor(settings: Settings) {
		this.apiKey = settings.apiKey;
		this.model = settings.modelGemini;
	}

	async generateContent(prompt: string) {
		// const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;

		// const response = await requestUrl({
		// 	url,
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify({
		// 		contents: [{ parts: [{ text: prompt }] }],
		// 	}),
		// });

		const ai = new GoogleGenAI({ apiKey: this.apiKey });

		const response = await ai.models.generateContent({
			model: this.model,
			contents: prompt,
		});

		

		return response;
	}
}
