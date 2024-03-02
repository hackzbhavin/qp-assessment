import mysql, { MysqlError } from "mysql";
import { generateOrderId } from "../helpers/helper";
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
    userId: number,
    itemDetails: any[],
    callback: (error: MysqlError | null) => void
  ) {
    let bookingId = generateOrderId(); 

    itemDetails.forEach((item) => {
      this.connection.query(
        "CALL BookGroceryItems(?, ?, ?, ?)",
        [bookingId, userId, item.ItemId, item.Quantity],
        (error: MysqlError | null, result) => {
          if (error) {
            console.log("Error:", error);
            callback(error);
          }
        }
      );
    });

    callback(null);
  }

  // =================================================================
  // GET ALL ITEM MODEL
  // =================================================================

  getOrderHistory(
    userId: number,
    callback: (error: MysqlError | null, existingItems?: any[]) => void
  ) {
    this.connection.query(
      "CALL GetOrderedItemsByUserId(?)",
      [userId],
      (error: MysqlError | null, results: any[][], fields) => {
        if (error) {
          callback(error);
          return;
        }

        const existingItems = results[0];
      
        const parsedExistingItems = existingItems.map((row: any) => {
          const item = JSON.parse(row.OrderedItem);
          return { Item: item.Items, OrderId: item.OrderId };
        });

        callback(null, parsedExistingItems);
      }
    );
  }
}