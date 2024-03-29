import "reflect-metadata";
import "./database";
import "express-async-errors";

import express, { Request, Response, NextFunction } from "express";
import { router } from "./routes";

const app = express();

app.use(express.json());

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        error: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
);

// http://localhost:3000
app.listen(3000, () => {
  console.log("Server is running na porta 3000");
});
