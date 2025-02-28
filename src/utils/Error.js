export class RedirectError extends Error {
  constructor(redirectPath) {
    super("Redirect error");
    this.redirectPath = redirectPath;
  }
}

export class AxiosError extends Error {
  constructor(error) {
    super(error.message);
    this.response = error.response;
    this.axiosMessage = error.message;
    this.request = error.request;
  }
}
