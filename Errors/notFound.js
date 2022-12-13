import { StatusCodes } from "http-status-codes";

import CustomApiError from "./customApi.js";

class NotFoundError extends CustomApiError {
  constructor(message) {
    super(message);
    this.StatusCode = StatusCodes.NOT_FOUND;
  }
}

export default NotFoundError;
