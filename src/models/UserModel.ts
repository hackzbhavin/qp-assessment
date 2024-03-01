// UserModel.ts

import mysql, { MysqlError } from "mysql";
const dbConfig = require("../config/dbConfig");

export class UserModel {
  private connection: mysql.Connection;

  constructor() {
    this.connection = mysql.createConnection(dbConfig);
  }

  getAvailableItems(
    callback: (error: MysqlError | null, items?: any[]) => void
  ) {
    this.connection.query(
      "SELECT * FROM items WHERE quantity > 0",
      (error: MysqlError | null, items: any[], fields) => {
        if (error) {
          callback(error);
          return;
        }
        callback(null, items);
      }
    );
  }

  bookOrder(
    userId: number,
    items: any[],
    callback: (error: MysqlError | null) => void
  ) {
    // Example order processing logic (to be replaced with actual implementation)
    // Here you can insert orders into the database, update inventory, etc.
    // For simplicity, let's just log the order information
    console.log(`User ${userId} is booking the following items:`, items);

    // After processing the order, you can call the callback
    // For simplicity, let's assume the order is successful
    callback(null);
  }
}
