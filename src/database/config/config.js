module.exports = {
  "development": {
    "username": "dp",
    "password": "dp",
    "database": "prodental",
    "host": "127.0.0.1",
    "dialect": "mysql",
    dialectOptions: {
      useUTC: false, // for reading from database
    },
    timezone: '-03:00', // for writing to database
    define: {
      underscored: true,
      timestamps: false
    }
  }
}
