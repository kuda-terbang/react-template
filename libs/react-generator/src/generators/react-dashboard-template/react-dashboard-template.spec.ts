import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, readProjectConfiguration } from '@nrwl/devkit';

import generator from './react-dashboard-template';
import { ReactDashboardTemplateGeneratorSchema } from './schema';

describe('react-dashboard-template generator', () => {
  let appTree: Tree;
  const options: ReactDashboardTemplateGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'test');
    expect(config).toBeDefined();
  })
});
