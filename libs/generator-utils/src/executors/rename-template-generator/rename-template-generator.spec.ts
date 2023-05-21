import { RenameTemplateGeneratorExecutorSchema } from './schema';
import executor from './rename-template-generator';

const options: RenameTemplateGeneratorExecutorSchema = {};

describe('RenameTemplateGenerator Executor', () => {
  it('can run', async () => {
    const output = await executor(options);
    expect(output.success).toBe(true);
  });
});
