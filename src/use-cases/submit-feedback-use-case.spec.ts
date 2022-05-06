import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const getSubmitFeedback = () => new SubmitFeedbackUseCase({ create: createFeedbackSpy }, { sendMail: sendMailSpy });

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    const submitFeedback = getSubmitFeedback();
    const type = 'BUG';
    const comment = 'example comment';
    const screenshot = 'data:image/png;base641234';

    await expect(submitFeedback.execute({ type, comment, screenshot })).resolves.not.toThrow();
    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit a feedback without type', async () => {
    const submitFeedback = getSubmitFeedback();
    const type = '';
    const comment = 'example comment';
    const screenshot = 'data:image/png;base641234';

    await expect(submitFeedback.execute({ type, comment, screenshot })).rejects.toThrow('Type is required');
  });

  it('should not be able to submit a feedback without comment', async () => {
    const submitFeedback = getSubmitFeedback();
    const type = 'BUG';
    const comment = '';
    const screenshot = 'data:image/png;base641234';

    await expect(submitFeedback.execute({ type, comment, screenshot })).rejects.toThrow('Comment is required');
  });

  it('should not be able to submit a feedback with invalid screenshot', async () => {
    const submitFeedback = getSubmitFeedback();
    const type = 'BUG';
    const comment = 'example';
    const screenshot = 'invalid screenshot';

    await expect(submitFeedback.execute({ type, comment, screenshot })).rejects.toThrow('Invalid screenshot format');
  });
});
