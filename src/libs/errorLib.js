import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

const isLocal = process.env.NODE_ENV === "development";

const initSentry = () => {
  if (isLocal) {
    return;
  }

  Sentry.init({
    dsn: "https://bcbd91c7ac074aacb6f6f60533261461@o499122.ingest.sentry.io/5577332",
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

  alert(message);
};

export  {
  onError,
  initSentry,
  logError
};