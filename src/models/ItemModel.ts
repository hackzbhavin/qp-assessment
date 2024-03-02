import mysql, { MysqlError } from "mysql";
const dbConfig = require("../config/dbConfig");

export class ItemModel {
  private connection: mysql.Connection;

  constructor() {
    this.connection = mysql.createConnection(dbConfig);
  }

  // =================================================================
  // ADD ITEM MODEL
  // =================================================================
  addNewItem(
    itemData: any,
    adminId: number,
    callback: (error: MysqlError | null, newItem?: any) => void
  ) {
    const { Name, CurrencyId, Price, Quantity } = itemData;
    this.connection.query(
      "CALL InsertItem(?, ?, ?, ?, ?)",
      [Name, CurrencyId, Price, Quantity, adminId],
      (error: MysqlError | null, result: any) => {
        if (error) {
          callback(error);
          return;
        }

        delete itemData.CurrencyId;
        const newItem = itemData;
        callback(null, newItem);
      }
    );
  }

  // =================================================================
  // GET EXISTING ITEMS MODEL
  // =================================================================
  getExistingItems(
    callback: (error: MysqlError | null, existingItems?: any[]) => void
  ) {
    this.connection.query(
      "CALL GetExistingItems()",
      (error: MysqlError | null, results: any[][], fields) => {
        if (error) {
          callback(error);
          return;
        }

        const existingItems = results[0];

        const parsedExistingItems = existingItems.map((item) => ({
          Item: JSON.parse(item.Item),
        }));

        callback(null, parsedExistingItems);
      }
    );
  }

  // =================================================================
  // REMOVE ITEM MODEL
  // =================================================================
  removeItem(
    itemId: string,
    adminId: number,
    callback: (error: MysqlError | null) => void
  ) {
    console.log(itemId);

    this.connection.query(
      "CALL RemoveItem(?, ?)",
      [itemId, adminId],

      (error: MysqlError | null, result: any) => {
        if (error) {
          callback(error);
          return;
        }
        if (result.affectedRows === 0) {
          callback({
            code: "NOT_FOUND",
            message: "Item not found",
          } as MysqlError);
          return;
        }
        callback(null);
      }
    );
  }

  // =================================================================
  // UPDATE ITEM MODEL
  // =================================================================
  updateItem(
    itemId: string,
    itemData: any,
    adminId: number,
    callback: (error: MysqlError | null, updatedItem?: any) => void
  ) {
    const { Name, CurrencyId, Price, Quantity } = itemData;
    this.connection.query(
      "CALL UpdateItem(?, ?, ?, ?, ?, ?)",
      [itemId, Name, CurrencyId, Price, Quantity, adminId],
      (error: MysqlError | null, result: any) => {
        if (error) {
          callback(error);
          return;
        }
        if (result.affectedRows === 0) {
          callback({
            code: "NOT_FOUND",
            message: "Item not found",
          } as MysqlError);
          return;
        }
        callback(null, { id: itemId, ...itemData });
      }
    );
  }

  // =================================================================
  // MANAGE INVENTORY MODEL
  // =================================================================
  manageInventory(
    itemId: string,
    action: "increase" | "decrease",
    amount: number,
    callback: (error: MysqlError | null, updatedInventory?: any) => void
  ) {
    this.connection.query(
      "CALL ManageInventory(?, ?, ?)",
      [itemId, action, amount],
      (error: MysqlError | null, results: any[][]) => {
        if (error) {
          callback(error);
          return;
        }
        callback(null);
      }
    );
  }
}
