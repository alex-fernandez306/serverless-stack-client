
const onError = (error) => {
  // Auth errors
  if (!(error instanceof Error) && error.message) {
    return error.message;
  }
  return '';
};

export  {
  onError
};