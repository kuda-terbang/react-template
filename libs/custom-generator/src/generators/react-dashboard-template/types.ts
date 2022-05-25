import { ReactDashboardTemplateGeneratorSchema } from './schema';

export interface NormalizedSchema extends ReactDashboardTemplateGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[]
}