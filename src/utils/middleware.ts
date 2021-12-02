export const errorHandler = (error: any, request: any, response: any, next: (arg0: any) => void) => {

  return 'error';
  // console.log(error);
  next(error);
};