const { execSync } = require('child_process');

const build = async () => {
  console.log('> build packages');
  execSync(
    'npx nx run-many --target build --projects=generator-utils,core-design-generator,core-util-generator,core-util-web-generator,react-generator,nextjs-client-template,react-dashboard-template'
  );
};

build();
