function errorMessageHandler(status, msg) {
  return msg ? [status, msg] : false;
}

export default errorMessageHandler;
