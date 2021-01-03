const varPrefix = process.env.REACT_APP_STAGE === "prod" ? "PROD" : "DEV";

const getKey = (key) => {
  const targetVar = `${varPrefix}_${key}`;
  const reactAppPrefixVar = `REACT_APP_${varPrefix}_${key}`;

  if (process.env[targetVar] && process.env[targetVar] !== "") {
    return process.env[targetVar];
  }

  return process.env[reactAppPrefixVar];
};
const config = {
  MAX_ATTACHMENT_SIZE: 5000000,
  STRIPE_KEY: getKey("STRIPE_KEY"),
  s3: {
    REGION: getKey("REGION"),
    BUCKET: getKey("BUCKET"),
  },
  apiGateway: {
    REGION: getKey("REGION"),
    URL: getKey("API_GW_URL"),
  },
  cognito: {
    REGION: getKey("REGION"),
    USER_POOL_ID: getKey("USER_POOL_ID"),
    APP_CLIENT_ID: getKey("APP_CLIENT_ID"),
    IDENTITY_POOL_ID: getKey("IDENTITY_POOL_ID"),
  },
  sentry: {
    URL: getKey("SENTRY_URL"),
  },
};

export default config;
