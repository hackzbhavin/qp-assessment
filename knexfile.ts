// knexfile.ts

module.exports = {
  development: {
    client: "mysql", // Specify MySQL as the database client
    connection: {
      host: "localhost", // Replace with your MySQL host
      user: "root", // Replace with your MySQL username
      password: "root", // Replace with your MySQL password
      database: "grocery", // Replace with the name of your MySQL database
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};
