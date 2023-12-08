enum HttpCodes {
  // 200 Http Request
  SUCCESS = 200,

  // 400 Http Request
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICTS = 409,

  // 500 Http Request
  SERVER_ERROR = 500,
}

export default HttpCodes;
