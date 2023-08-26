const {StatusCodes}=require('http-status-codes')

class BadRequest extends Error{
    constructor(msg){
        super(msg)
        this.status=StatusCodes.BAD_REQUEST
    }
}

class UnAuth extends Error{
    constructor(msg){
        super(msg)
        this.status=StatusCodes.UNAUTHORIZED;
    }
}

class NotFound extends Error{
    constructor(msg){
        super(msg)
        this.status=StatusCodes.NOT_FOUND
    }
}

module.exports={BadRequest,UnAuth,NotFound}