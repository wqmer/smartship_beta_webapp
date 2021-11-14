module.exports = {
    // host:process.env.HOST || '127.0.0.1',
    port:process.env.PORT || (process.env.NODE_ENV === 'production'?8080:3000),
    apiUrl:'https://smartship-beta-api-server.herokuapp.com',
    apiHost:process.env.APIHOST || '127.0.0.1',
    apiPort:process.env.APIPORT || '3030',
    dbHost:"localhost",
    dbPort:"27017",
    // app:{
    // }
};