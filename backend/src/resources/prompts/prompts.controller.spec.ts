import { HttpException } from '@nestjs/common';
import { PromptsController } from './prompts.controller';
import * as promptsService from './prompts.service';

describe('prompts.controller', () => {
  describe('GET /prompt/:id', () => {
    it('returns prompt', async () => {
      jest
        .spyOn(promptsService, 'getPrompt')
        .mockResolvedValue({ a: 1 } as any);

      const c = new PromptsController();
      const r = await c.getPrompt('123');

      expect(promptsService.getPrompt).toHaveBeenCalledWith('123');
      expect(r).toEqual({ a: 1 });
    });

    it('throws 404 if prompt does not exist', async () => {
      jest.spyOn(promptsService, 'getPrompt').mockResolvedValue(undefined);

      const c = new PromptsController();

      await expect(() => c.getPrompt('123')).rejects.toThrow(
        new HttpException('Not found', 404),
      );
    });
  });
});
