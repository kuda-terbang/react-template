import { getProjects, Tree } from '@nx/devkit';

export type ProjectExist = {
  name: string;
  isExist: boolean;
};
export const areProjectsExist = (tree: Tree, projectNames: string[]) => {
  const projects = getProjects(tree);
  const existProjects: Record<string, ProjectExist> = projectNames.reduce((prev, curr) => {
    prev[curr] = {
      name: curr,
      isExist: false,
    };
    return prev;
  }, {});
  projects.forEach((project) => {
    if (projectNames.includes(project.name)) {
      existProjects[project.name].isExist = true;
    }
  });
  return existProjects;
};
