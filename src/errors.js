export class DuplicateUserEmailError extends Error {
    errorCode = "400_U001";
    statusCode = 400;
  
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }

export class DuplicateStoreError extends Error {
  errorCode = "400_S001";
  statusCode = 400;
  
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
      this.data = data;
  }
}

export class InvalidReview extends Error {
  errorCode = "400_R001";
  statusCode = 400;
  
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
      this.data = data;
  }
}


export class InvalidMission extends Error {
  errorCode = "400_M001";
  statusCode = 400;
  
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
      this.data = data;
  }
}