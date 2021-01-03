import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import config from "../config";

const isLocal = process.env.NODE_ENV === "development";

const initSentry = () => {
  if (isLocal) {
    return;
  }

  Sentry.init({
    dsn: config.sentry.URL,
    autoSessionTracking: true,
    integrations: [
      new Integrations.BrowserTracing(),
    ],
    tracesSampleRate: 1.0,
  });
}

const logError = (error, errorInfo = null) => {
  if (isLocal) {
    return;
  }

}

const onError = (error) => {
  let errorInfo = {};
  let message = error.toString();

  // Auth errors
  if (!(error instanceof Error) && error.message) {
    errorInfo = error;
    message = error.message;
    error = new Error(message);
    // API errors
  } else if (error.config && error.config.url) {
    errorInfo.url = error.config.url;
  }

  logError(error, errorInfo);
};

export  {
  onError,
  initSentry,
  logError
};