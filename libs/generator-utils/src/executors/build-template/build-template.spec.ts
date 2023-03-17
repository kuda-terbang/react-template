import { BuildTemplateExecutorSchema } from './schema';
import executor from './build-template';

const options: BuildTemplateExecutorSchema = {};

describe('BuildTemplate Executor', () => {
  it('can run', async () => {
    const output = await executor(options);
    expect(output.success).toBe(true);
  });
});
