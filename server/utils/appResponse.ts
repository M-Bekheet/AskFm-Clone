export const appResponse = (msg: string, success: boolean, data?: any) => {
  return {
    message: msg,
    success: success,
    payload: data || {},
  };
};
