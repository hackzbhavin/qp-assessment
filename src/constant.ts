
export const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
};

export const API_MESSAGES = {
  SUCCESS: "Success",
  FAILURE: "Failure",
  ITEM_ADDED_SUCCESSFULLY: "New item added successfully",
  FAILED_TO_ADD_ITEM: "Failed to add new item",
  FAILED_TO_FETCH_ITEMS: "Failed to fetch existing items",
  ITEM_REMOVED_SUCCESSFULLY: "Item removed successfully",
  FAILED_TO_REMOVE_ITEM: "Failed to remove item",
  ITEM_UPDATED_SUCCESSFULLY: "Item updated successfully",
  FAILED_TO_UPDATE_ITEM: "Failed to update item",
  INVENTORY_MANAGED_SUCCESSFULLY: "Inventory managed successfully",
  FAILED_TO_MANAGE_INVENTORY: "Failed to manage inventory",
  INVALID_ACTION: "Invalid action",
  DATA_FETCHED_SUCCESSFULLY: "Data fetched successfully",
  FAILED_TO_BOOK_ORDER: "Failed to book order",
  BOOKED_ORDER: "Order is created successfully",
  NOT_AUTH: "You are not authorized",
  FORBIDDEN: "Forbidden",

  NOT_FOUND: "Route not found",
  INTERNAL_SERVER_ERROR: "Internal server error",
};

// KEYS
export const API_KEY = {
  SECRET: process.env.API_SECRET,
};

export const Config = {
  DB_HOST_NAME: process.env.DB_HOST_NAME,
  DB_USER_NAME: process.env.DB_USER_NAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
};

// Api Constants
export const API = "/api";
export const ADMIN_API = "/api/admin";

export const API_ENDPOINTS = {
  CREATE_TOKEN: "/createToken",

  // ADMIN
  ADMIN_ADD_ITEM: "/items/add",
  ADMIN_GET_ITEMS: "/items",
  ADMIN_DELETE_ITEM: "/items/delete/:itemId",
  ADMIN_UPDATE_ITEM: "/items/update/:itemId",
  ADMIN_MANAGE_INVENTORY: "/items/:itemId/inventory",

  // USERS
  GET_ITEMS: "/items",
  ADD_ORDER: "/orders/book",
  GET_ORDERS_HISTORY: "/orders/history",
};
