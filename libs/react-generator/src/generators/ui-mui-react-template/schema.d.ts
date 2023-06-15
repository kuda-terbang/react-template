import { Schema } from '@nrwl/react/src/generators/library/schema';
import { NormalizedSchema } from '@kuda-terbang/generator-utils';

export interface UiMuiReactComponentGeneratorSchema extends Schema {
  designTokenProject: string;
  withLocalToken?: boolean;
}
export type UiMuiReactComponentNormalized = NormalizedSchema<UiMuiReactComponentGeneratorSchema>;
