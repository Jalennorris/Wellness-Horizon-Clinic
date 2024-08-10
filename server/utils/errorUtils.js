export const createErrorResponse = (message, status = 500) =>{
return {
    statusCode,
    body: JSON.stringify({
        error: message

    })
}

}

export const createBadRequestResponse = (message) =>{
    return createErrorResponse(message,400);
}