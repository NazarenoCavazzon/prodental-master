module.exports = {
  "development": {
    "username": "dp",
    "password": "dp",
    "database": "prodental",
    "host": "127.0.0.1",
    "dialect": "mysql",
    timezone: '-03:00', // for writing to database
    define: {
      underscored: true,
      timestamps: false
    }
  }
}
