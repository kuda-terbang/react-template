import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import generator from './ui-mui-react-template';
import { UiMuiReactComponentGeneratorSchema } from './schema';

describe('ui-mui-react-component generator', () => {
  let appTree: Tree;
  const options: UiMuiReactComponentGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'test');
    expect(config).toBeDefined();
  });
});
