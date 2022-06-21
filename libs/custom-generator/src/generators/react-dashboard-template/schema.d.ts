import type { Linter, SupportedStyles } from '@nrwl/linter'

export interface ReactDashboardTemplateGeneratorSchema {
    name: string;
    style: SupportedStyles;
    skipFormat: boolean;
    directory?: string;
    tags?: string;
    unitTestRunner: 'jest' | 'none';
    e2eTestRunner: 'cypress' | 'none';
    linter: Linter;
    pascalCaseFiles?: boolean;
    classComponent?: boolean;
    routing?: boolean;
    skipWorkspaceJson?: boolean;
    js?: boolean;
    globalCss?: boolean;
    strict?: boolean;
    setParserOptionsProject?: boolean;
    standaloneConfig?: boolean;
    compiler?: 'babel' | 'swc';
    remotes?: string[];
    devServerPort?: number;
    isCraTemplate?: boolean;
    isUseDesignTheme?: boolean;
    isUseUtilApi?: boolean;
}