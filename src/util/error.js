

export const handle_error = function (error) {
    let result = {
        "message": 'unknown error from response',
        "is_authed": true
    }
    try {
        if (error.response) {
            result.message = error.response.data ? error.response.data.message : error.response.statusText,
            result.is_authed = error.response.status == 401 ? false : true
            return result
        } else {
            result.message = error.message,
            result.is_authed = true
            return result
        }
    } catch (err) {
        return result
    }
}

