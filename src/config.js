const dev = {
  STRIPE_KEY:
    "pk_test_51049QK41OY3pubkmJy75yZgoJOgxc0CZ9VC3KKzY73KLagXaHjCzcKILB8QY6T31UvxVnKBjNJU4YZnFrQSXrwc300gWTJzaVM",
  s3: {
    REGION: "ap-southeast-2",
    BUCKET: "dev-notes-infra-s3-uploads4f6eb0fd-boosk479fp8d",
  },
  apiGateway: {
    REGION: "ap-southeast-2",
    URL: "https://tzq6z9mphi.execute-api.ap-southeast-2.amazonaws.com/dev",
  },
  cognito: {
    REGION: "ap-southeast-2",
    USER_POOL_ID: "ap-southeast-2_rAi2t5YHp",
    APP_CLIENT_ID: "s63kcsf82frndptrj9lg2tdqj",
    IDENTITY_POOL_ID: "ap-southeast-2:9effdff8-f93a-4f89-8da5-671999d3dc58",
  },
};

const prod = {
  STRIPE_KEY: "YOUR_STRIPE_PROD_PUBLIC_KEY",
  s3: {
    REGION: "YOUR_PROD_S3_UPLOADS_BUCKET_REGION",
    BUCKET: "YOUR_PROD_S3_UPLOADS_BUCKET_NAME",
  },
  apiGateway: {
    REGION: "YOUR_PROD_API_GATEWAY_REGION",
    URL: "YOUR_PROD_API_GATEWAY_URL",
  },
  cognito: {
    REGION: "YOUR_PROD_COGNITO_REGION",
    USER_POOL_ID: "YOUR_PROD_COGNITO_USER_POOL_ID",
    APP_CLIENT_ID: "YOUR_PROD_COGNITO_APP_CLIENT_ID",
    IDENTITY_POOL_ID: "YOUR_PROD_IDENTITY_POOL_ID",
  },
};

const config = {
  MAX_ATTACHMENT_SIZE: 5000000,
  ...(process.env.REACT_APP_STAGE === "prod" ? prod : dev),
};

export default config;
