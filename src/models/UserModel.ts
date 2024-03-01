// UserModel.ts

import mysql, { MysqlError } from "mysql";
const dbConfig = require("../config/dbConfig");

export class UserModel {
  private connection: mysql.Connection;

  constructor() {
    this.connection = mysql.createConnection(dbConfig);
  }

  // =================================================================
  // GET ALL ITEM MODEL
  // =================================================================
  getAvailableItems(
    callback: (error: MysqlError | null, items?: any[]) => void
  ) {
    this.connection.query(
      "CALL GetItems()",
      (error: MysqlError | null, results: any[][], fields) => {
        if (error) {
          callback(error);
          return;
        }
        const items = results[0].map((row: any) => JSON.parse(row.Item));
        callback(null, items);
      }
    );
  }

  // =================================================================
  // BOOK ORDER MODEL
  // =================================================================
  bookGroceryItems(
    orderId: number,
    itemDetails: any[],
    callback: (error: MysqlError | null) => void
  ) {
    const values = itemDetails.map((item) => [
      orderId,
      item.ItemId,
      item.Quantity,
    ]);

    const totalItems = itemDetails.length;
    let itemsProcessed = 0;

    itemDetails.forEach((item) => {
      this.connection.query(
        "CALL BookGroceryItems(?, ?)",
        [orderId, JSON.stringify(item)],
        (error: MysqlError | null, result) => {
          if (error) {
            callback(error);
            return;
          }
          itemsProcessed++;
          if (itemsProcessed === totalItems) {
            callback(null);
          }
        }
      );
    });
  }
}
