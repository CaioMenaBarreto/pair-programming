export function badRequestError(message?: string) {
    const errorMsg = message || "Bad Request";
    return {
      message: errorMsg,
      status: 400
    }
  }