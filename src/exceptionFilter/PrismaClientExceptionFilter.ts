import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from "@nestjs/common";
import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

@Catch(
  Prisma.PrismaClientKnownRequestError,
  Prisma.PrismaClientUnknownRequestError,
  Prisma.PrismaClientInitializationError,
  Prisma.PrismaClientRustPanicError,
  Prisma.PrismaClientValidationError
)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(
    exception:
      | Prisma.PrismaClientKnownRequestError
      | Prisma.PrismaClientUnknownRequestError
      | Prisma.PrismaClientInitializationError
      | Prisma.PrismaClientRustPanicError
      | Prisma.PrismaClientValidationError,
    host: ArgumentsHost
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: HttpStatus;
    let message: string;

    // Known request errors
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      switch (exception.code) {
        case "P2000":
          status = HttpStatus.BAD_REQUEST;
          message = `The provided value for the column is too long. ${exception.meta?.target}`;
          break;
        case "P2001":
          status = HttpStatus.NOT_FOUND;
          message = `The record does not exist. ${exception.meta?.cause}`;
          break;
        case "P2002":
          status = HttpStatus.CONFLICT;
          message = `Unique constraint failed on the ${exception.meta?.target} field.`;
          break;
        case "P2003":
          status = HttpStatus.BAD_REQUEST;
          message = `Foreign key constraint failed on the ${exception.meta?.target} field.`;
          break;
        case "P2004":
          status = HttpStatus.BAD_REQUEST;
          message = `A constraint failed on the database. ${exception.meta?.cause}`;
          break;
        case "P2005":
          status = HttpStatus.BAD_REQUEST;
          message = `The value stored in the ${exception.meta?.target} column is invalid.`;
          break;
        case "P2006":
          status = HttpStatus.BAD_REQUEST;
          message = `The provided value for the ${exception.meta?.target} field is invalid.`;
          break;
        case "P2007":
          status = HttpStatus.BAD_REQUEST;
          message = `Data validation error. ${exception.meta?.cause}`;
          break;
        case "P2011":
          status = HttpStatus.BAD_REQUEST;
          message = `Null constraint violation on the ${exception.meta?.target} field.`;
          break;
        case "P2012":
          status = HttpStatus.BAD_REQUEST;
          message = `Missing a required value in the ${exception.meta?.target} field.`;
          break;
        case "P2013":
          status = HttpStatus.BAD_REQUEST;
          message = `Missing the required argument: ${exception.meta?.argument}.`;
          break;
        case "P2014":
          status = HttpStatus.BAD_REQUEST;
          message = `Relation violation: ${exception.meta?.relation}.`;
          break;
        case "P2015":
          status = HttpStatus.NOT_FOUND;
          message = `The record for the ${exception.meta?.target} was not found.`;
          break;
        case "P2021":
          status = HttpStatus.INTERNAL_SERVER_ERROR;
          message = `The table ${exception.meta?.target} does not exist.`;
          break;
        case "P2022":
          status = HttpStatus.INTERNAL_SERVER_ERROR;
          message = `The column ${exception.meta?.target} does not exist.`;
          break;
        default:
          status = HttpStatus.INTERNAL_SERVER_ERROR;
          message = `An unknown error occurred. ${exception.message}`;
          break;
      }
    } else if (exception instanceof Prisma.PrismaClientUnknownRequestError) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = "An unknown error occurred in the Prisma Client.";
    } else if (exception instanceof Prisma.PrismaClientInitializationError) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = "Failed to initialize the Prisma Client.";
    } else if (exception instanceof Prisma.PrismaClientRustPanicError) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = "The Prisma Client experienced a panic.";
    } else if (exception instanceof Prisma.PrismaClientValidationError) {
      status = HttpStatus.BAD_REQUEST;
      message = `Validation error occurred in the Prisma Client. ${exception.message}`;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = "An unexpected error occurred.";
    }

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
