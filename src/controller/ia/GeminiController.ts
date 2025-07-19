import { GoogleGenAI } from '@google/genai';
import { FastifyReply, FastifyRequest } from 'fastify';

class GeminiController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const body = request.body as { promt: string };

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    if (!body?.promt) {
      return reply.status(400).send({
        error: 'o campo é obrigatório',
      });
    }
    try {
      const result = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: `Você é uma inteligência artificial do aplicativo Captures Moments. Sua única função é melhorar a escrita da frase a seguir, deixando-a mais bonita, envolvente ou emocionante — sem mudar o sentido original. A frase é sobre uma lembrança de viagem.
    Importante:
    Não adicione comentários, sugestões ou explicações.
    Não responda nada além da frase aprimorada.
    Apenas reescreva a frase de forma mais impactante, mantendo o mesmo conteúdo e tom emocional.
    Frase original: ${body.promt}`,
      });

      const text = await result.text?.trim();

      return reply.status(200).send({
        response: text,
      });
    } catch (error) {
      reply.send({
        error,
      });
      throw new Error('Error ao conectar com a inteligência artificial');
    }
  }
}

export { GeminiController };
