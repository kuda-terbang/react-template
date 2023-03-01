//  External API

export const strapiUrl = process.env.NX_STRAPI_URL
export const strapiToken = process.env.NX_STRAPI_TOKEN
export const strapiTokenKey = process.env.NX_STRAPI_TOKEN_KEY

// General Config

export const environment = process.env.NX_ENVIRONMENT
export const siteUrl = process.env.NX_SITE_URL

// Analytics

// Firebase

export const firebaseApiKey = process.env.NX_API_KEY
export const firebaseAuthDomain = process.env.NX_AUTH_DOMAIN
export const firebaseProjectId = process.env.NX_PROJECT_ID
export const firebaseStorageBucket= process.env.NX_STORAGE_BUCKET
export const firebaseMessagingSenderId = process.env.NX_MESSAGING_SENDER_ID
export const firebaseAppId = process.env.NX_APP_ID
export const firebaseMeasurementId = process.env.NX_MEASUREMENT_ID
export const firebaseConfigInterval = process.env.NX_REMOTE_CONFIG_INTERVAL

// Google Tag Manager

export const gtmId = process.env.NX_GOOGLE_TAG_MANAGER_ID

// Sentry

export const sentryDsn = process.env.NX_SENTRY_DSN
export const sentryDebug = process.env.NX_SENTRY_DEBUG
export const sentryUrl = process.env.NX_SENTRY_URL
export const sentryIOrg = process.env.NX_SENTRY_ORG
export const sentryProject = process.env.NX_SENTRY_PROJECT
export const sentryAuthToken = process.env.NX_SENTRY_AUTH_TOKEN
export const sentryTraceRate = process.env.NX_SENTRY_TRACE_RATE
