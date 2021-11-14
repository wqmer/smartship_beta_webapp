export const notfication_remote_server_error = (message) => {
    return ({ message: '远程服务器报错', description: message })
}

export const message_success = (message) => {
    return message
}

 const format = {
    notfication_remote_server_error,
    message_success
}

export default format 