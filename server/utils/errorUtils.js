export const createErrorResponse = (message, status = 500) => {
    return {
        statusCode: status, // Use the status parameter here
        body: JSON.stringify({
            error: message
        })
    };
};

export const createBadRequestResponse = (message) => {
    return createErrorResponse(message, 400); // Calls createErrorResponse with status 400
};
