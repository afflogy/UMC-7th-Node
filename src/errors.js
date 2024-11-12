export class DuplicateUserEmailError extends Error {
    errorCode = "U001";
  
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }

export class DuplicateStoreError extends Error {
  errorCode = "U002";
  
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
      this.data = data;
  }
}

export class InvalidReview extends Error {
  errorCode = "U003";
  
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
      this.data = data;
  }
}


export class InvalidMission extends Error {
  errorCode = "U004";
  
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
      this.data = data;
  }
}