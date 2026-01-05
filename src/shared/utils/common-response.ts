interface commonResponseReturn<T> {
  success: boolean;
  message: string;
  data?: T;
}

export function commonResponse<T>(
  success: boolean,
  message: string,
  data?: T
): commonResponseReturn<T> {
  return {
    success,
    message,
    ...(data && { data }),
  };
}
