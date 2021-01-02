 const  config = {
  s3: {
    REGION: "ap-southeast-2",
    BUCKET: "ax-note-app-upload",
  },
  apiGateway: {
    REGION: "ap-southeast-2",
    URL: " https://tzq6z9mphi.execute-api.ap-southeast-2.amazonaws.com/dev",
  },
  cognito: {
    REGION: "ap-southeast-2",
    USER_POOL_ID: "ap-southeast-2_9Ak1CzKrB",
    APP_CLIENT_ID: "62ojkm6girqavshhtleg5blb5q",
    IDENTITY_POOL_ID: "ap-southeast-2:534c926d-f27d-408d-9150-efd35f6c896a",
  },
  MAX_ATTACHMENT_SIZE: 5000000,
  STRIPE_KEY: "pk_test_51049QK41OY3pubkmJy75yZgoJOgxc0CZ9VC3KKzY73KLagXaHjCzcKILB8QY6T31UvxVnKBjNJU4YZnFrQSXrwc300gWTJzaVM"
};

export default config;