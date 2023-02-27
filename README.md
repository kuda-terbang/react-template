# KudaTerbang

Nx plugin and template resources to help you create a production-ready frontend service using React with installed common packages that are generally used in production. This project was generated using [Nx](https://nx.dev).
Two main services could be generated with this package

- React Dashboard
  Use basic react, and all libraries or components needed to build a single-page app.
- NextJS Client
  Use NextJS to build a frontend service which optimized for a public website. Examples of use cases are E-commerce, blogs, and company websites.

For each of the main services, we develop service-template and service-example.

- service-example
  It is an example of an app that is generated by @kuda-terbang/custom-generator if you want to use an NX generator. All utils or libraries will depend on other packages.
- service-template
  Here you could start your frontend service with single repo, utilizing [create-react-app](https://create-react-app.dev/) (CRA) or [create-next-app](https://nextjs.org/docs/api-reference/create-next-app) (CNA). The difference with service-example is that here, no outside dependency so you could make single repo easily.

## Tech Stack

General Stack

- [Style Dictionary](https://github.com/amzn/style-dictionary). Used for generating design token.
- [Material UI](https://mui.com/material-ui/getting-started/overview/). Used for theming and atomic level components.
- [Axios](https://github.com/axios/axios). Used for creating a fetch instance.
- [SWR](https://swr.vercel.app/). Used for data fetching helper.

NextJS Stack

- [NextJS](https://nextjs.org/docs)
- [Sentry](https://docs.sentry.io/platforms/javascript/guides/nextjs/). For reporting errors in web client and server.
- [Firebase](https://firebase.google.com/docs/web). Mainly used for firebase remote config to set configuration for websites.
- [Next-i18next](https://github.com/i18next/next-i18next). For internationalization.
- [Next-SEO](https://github.com/garmeeh/next-seo). For handling SEO.

React Dashboard Stack

- [React](https://reactjs.org/docs/getting-started.html)

## Prerequisite

We use Figma to manage design tokens, design systems, and custom icons.

- You could duplicate [this Figma file](https://www.figma.com/file/Og24COnVDRmaJuijpSZS3x/Design-System?node-id=0%3A1) as the starter.
- Create a design system Figma file that contains these values: color, spacing, and Radii.
- Install [Plugin Figma Token](https://www.figma.com/community/file/867870823554195454/Figma-tokens) to generate design token.
- Install [SVG Export](https://www.figma.com/community/plugin/814345141907543603/SVG-Export) to generate SVG that will be used to generate optimized components.

## Getting Started

General steps to start using this template

1. Generate from template to initialize repo or apps directory
2. Check design token, icons, and UI MUI theme
3. Create third-party accounts such as Firebase or Sentry. Then implement in .env.
4. Start the service

### Using NX

For a better experience, I recommend installing [NX Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) in your VS Code. It helps you to generate, or run service. For all services, they depend on libs ranging from UI to logic function. The order of service you should install is

1. Generate design token project using @kuda-terbang/custom-generator:design-token-template
2. Follow the guidelines [here](/libs/design-token-example/README.md) to generate a design token build from your Figma.
3. Generate custom icons project using @kuda-terbang/custom-generator:icons-template.
4. Follow the guidelines [here](/libs/icons-example/README.md) to build icons from Figma.
5. Generate UI MUI React project using @kuda-terbang/custom-generator:ui-mui-react-template. It depends on the design token project created in the first step.
6. Generate NextJS Client apps using @kuda-terbang/custom-generator - nextjs-client-template or React Dashboard using @kuda-terbang/custom-generator - react-dashboard-template. This generator depends on the design token project generated in the first step and the design system project generated in the fifth step.
7. Create all third-party apps accounts needed and implement them in .env. Follow the guidelines [here](#creating-third-party-apps-accounts)
8. Start your service

### Using create-react-app or create-next-app

1. Generate app repo using this command

```bash
# React Dashboard
yarn create react-app <app-name> https://github.com/robbycp/design-system-template/tree/main/apps/react-dashboard-template
# NextJS Client
yarn create next-app --example https://github.com/robbycp/design-system-template/tree/main/apps/nextjs-client-template
```

2. I recommend creating a new repository to generate design tokens and icons from Figma. You could follow the implementation from the [design token project](/libs/design-token-example) to generate design token JSON and the [icons project](/libs/icons-example).
3. Put all the JSON files generated from step two in `/design-token-project/build/json` to `/src/design-system/token`
4. Check if you want to adjust the basic components in `/src/design-system/components`, and override component props in `/src/design-system/mui-theme`.
5. Create all third-party apps accounts needed and implement them in .env. Follow the guidelines [here](#creating-third-party-apps-accounts)
6. Start your service

## Creating third-party apps accounts

Follow the guideline to create third-party apps accounts

- [Firebase](https://firebase.google.com/docs/web/setup#create-firebase-project-and-app)
- [Sentry](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Google Tag Manager](https://support.google.com/tagmanager/answer/6103696)
- Strapi service. You could clone the server apps [here](/apps/strapi-template)
