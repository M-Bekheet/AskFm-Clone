export const appResponse = (message: string, success: boolean, data?: any) => {
  return {
    message,
    success,
    payload: data || {},
  };
};
