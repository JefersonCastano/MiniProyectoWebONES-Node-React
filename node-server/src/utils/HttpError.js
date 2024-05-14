class HttpError extends Error {
    constructor(errorCode, message) {
      super(message); 
      this.status = errorCode; 
    }
}

module.exports = HttpError;