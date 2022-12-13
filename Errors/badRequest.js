import { StatusCodes } from "http-status-codes";

import CustomApiError from "./customApi.js";

class BadRequestError extends CustomApiError {
  constructor(message) {
    super(message);
    this.StatusCode = StatusCodes.BAD_REQUEST;
  }
}
export default BadRequestError;
