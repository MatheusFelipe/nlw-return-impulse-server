import { Router } from 'express';

import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

export const routes = Router();

routes.get('/', (req, res) => res.send('Hello'));

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksRepository, nodemailerMailAdapter);

  try {
    await submitFeedbackUseCase.execute({ type, comment, screenshot });
  } catch (err) {
    console.error(err);
    return res.status(500).send('INTERNAL SERVER ERROR');
  }

  return res.status(201).send();
});
