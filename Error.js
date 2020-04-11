class UnknownSupplierException extends Error {

    constructor(message) {

      super(message)
      Error.captureStackTrace(this, noSupplierError)
    }
  }

class UnknownProductException extends Error {

  constructor(message) {

    super(message)
    Error.captureStackTrace(this, noProductError)
  }
}


module.exports = Error