module.exports = {
  PORT : process.env.PORT || 3000,
  DATABASE : {
    HOST: 'mongodb://localhost:27017/',
    NAME: 'chatapp'
  },
  SECRET: 'IyiWm6SoyA5Wz3JEzDUo0W4QfVXigFII',
  GENERICERROR: {
    status: false,
    message: 'Something went wrong, try later'
  },
  ENDPOINTAPI: '/api'
}
