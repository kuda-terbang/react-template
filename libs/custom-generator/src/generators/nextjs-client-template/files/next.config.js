// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');
const semver = require('semver')
const { i18n } = require('./next-i18next.config');
const { execSync } = require('child_process');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  // Your existing module.exports
  pageExtensions: [
    'page.tsx'
  ],
  i18n,
  reactStrictMode: false,
  webpack: (config, { buildId }) => {
    const buildIdStringify = JSON.stringify(buildId)

    // TODO : show versioning of apps
    const version = '1.0.0'
    const name = 'nextjs-client-example'
    let nextVersion = version
    let releaseVersion = ''
    if (process.env.NX_ENVIRONMENT === 'production') {
      releaseVersion = `${name}@${nextVersion}-${buildIdStringify}`
    } else if (process.env.NX_ENVIRONMENT === 'development' ) {
      releaseVersion = 'development'
    } else {
      nextVersion = semver.inc(version, 'patch')
      let branchName = execSync('git rev-parse --abbrev-ref HEAD').toLocaleString()
      branchName = branchName.replace('/', '-').trim()
      releaseVersion = `${name}@${nextVersion}-${branchName}-${buildIdStringify}`
    }

    process.env.SENTRY_RELEASE = releaseVersion
    process.env.APP_VERSION = releaseVersion

    // Used to config getStaticProps with next-i18next https://stackoverflow.com/questions/64926174/module-not-found-cant-resolve-fs-in-next-js-application
    config.resolve.fallback = { fs: false, path: false };

    return config
  }
};

module.exports = withNx(nextConfig)
