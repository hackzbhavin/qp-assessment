import { HTTP_STATUS_CODES } from "../constant";
import { ApiResponseProps } from "./typesPorps";

export const sendSuccessResponse = ({
  res,
  message,
  data,
  statusCode = HTTP_STATUS_CODES?.OK,
}: ApiResponseProps) => {
  res.status(statusCode).json({
    status: statusCode,
    success: true,
    message: message,
    data: data || null,
  });
};

export const sendFailureResponse = ({
  res,
  message,
  statusCode = HTTP_STATUS_CODES?.INTERNAL_SERVER_ERROR,
  error,
}: ApiResponseProps) => {
  res.status(statusCode).json({
    status: statusCode,
    success: false,
    message: message,
    error: error,
  });
  return false;
};
