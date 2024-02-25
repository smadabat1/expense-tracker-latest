const express = require("express");
const router = express.Router();
import moment from "moment";
import db_connection from "../db/db"; //importing the connection client to the DB.
import {
  getAllDebitTransactions,
  getDebitTransactionById,
  getDebitTransactionByUserId,
  getDebitTransactionByCategoryId,
  getDebitTransactionByDate,
  setDebitTransaction,
  updateDebitTransaction,
  deleteDebitTransaction,
} from "./helpers/debitRouterHelper";

if (!db_connection) {
  console.error("(-) Error connecting with the DB, please try again");
}

//Middleware
router.use((req: any, res: any, next: any) => {
  console.log("Time: ", Date.now());
  next();
});

router.get("/", async (req: any, res: any) => {
  if (!db_connection) {
    return res.status(500).send({
      error: "Internal Error, please try again",
    });
  }

  const result = await getAllDebitTransactions(db_connection);
  if (!result.status) {
    return res.status(500).send({
      error: "Internal Error, please try again",
    });
  }
  res.status(200).send(result);
});

router.get("/id/:id", async (req: any, res: any) => {
  const id = req.params.id;

  if (Number.isNaN(Number(id)) || id === "") {
    return res.status(400).send({
      error: "Bad Request, Id should be an integer",
    });
  }

  if (!db_connection) {
    return res.status(500).send({
      error: "Internal Error, please try again",
    });
  }

  const result = await getDebitTransactionById(db_connection, id);
  if (!result.status) {
    return res.status(500).send({
      error: "Internal Error, please try again",
    });
  }
  res.status(200).send(result);
});

router.get("/userid/:userid", async (req: any, res: any) => {
  const userid = req.params.userid;

  if (Number.isNaN(Number(userid)) || userid === "") {
    return res.status(400).send({
      error: "Bad Request, UserID should be an integer",
    });
  }

  if (!db_connection) {
    return res.status(500).send({
      error: "Internal Error, please try again",
    });
  }

  const result = await getDebitTransactionByUserId(db_connection, userid);
  if (!result.status) {
    return res.status(500).send({
      error: "Internal Error, please try again",
    });
  }
  res.status(200).send(result);
});

router.get("/categoryid/:categoryid", async (req: any, res: any) => {
  const categoryid = req.params.categoryid;

  if (Number.isNaN(Number(categoryid)) || categoryid === "") {
    return res.status(400).send({
      error: "Bad Request, Category ID should be an integer",
    });
  }

  if (!db_connection) {
    return res.status(500).send({
      error: "Internal Error, please try again",
    });
  }

  const result = await getDebitTransactionByCategoryId(
    db_connection,
    categoryid
  );
  if (!result.status) {
    return res.status(500).send({
      error: "Internal Error, please try again",
    });
  }
  res.status(200).send(result);
});

router.get("/date/:date", async (req: any, res: any) => {
  const date = req.params.date;

  if (!moment(date).utc().isValid()) {
    return res.status(400).send({
      error: "Invalid Requst, date format is wrong",
    });
  }

  if (!db_connection) {
    return res.status(500).send({
      error: "Internal Error, please try again",
    });
  }

  const result = await getDebitTransactionByDate(
    db_connection,
    moment(date).format("YYYY/MM/DD")
  );
  if (!result.status) {
    return res.status(500).send({
      error: "Internal Error, please try again",
    });
  }
  res.status(200).send(result);
});

router.post("/", async (req: any, res: any) => {
  //headers: -> application/json;
  const data = req.body;

  if (!db_connection) {
    return res.status(500).send({
      error: "Internal Error, please try again",
    });
  }

  const result = await setDebitTransaction(db_connection, data);

  if (!result.status) {
    return res.status(500).send({
      error: "Internal Error, please try again",
    });
  }

  res.status(200).send(result);
});

router.put("/id/:id", async (req: any, res: any) => {
  //headers: -> application/json;
  const id = req.params.id;

  if (Number.isNaN(Number(id)) || id === "") {
    return res.status(400).send({
      error: "Bad Request, Id should be an integer",
    });
  }

  const data = req.body;

  if (!db_connection) {
    return res.status(500).send({
      error: "Internal Error, please try again",
    });
  }

  const result = await updateDebitTransaction(db_connection, id, data);

  if (!result.status) {
    if ("errorMessage" in result) {
      return res.status(400).send({
        error: "Invalid Request, provide valid data to update.",
      });
    }
    return res.status(500).send({
      error: "Internal Error, please try again",
    });
  }

  res.status(200).send(result);
});

router.delete("/id/:id", async (req: any, res: any) => {
  //headers: -> application/json;
  const id = req.params.id;

  if (Number.isNaN(Number(id)) || id === "") {
    return res.status(400).send({
      error: "Bad Request, Id should be an integer",
    });
  }

  if (!db_connection) {
    return res.status(500).send({
      error: "Internal Error, please try again",
    });
  }

  const result = await deleteDebitTransaction(db_connection, id);

  if (!result.status) {
    return res.status(500).send({
      error: "Internal Error, please try again",
    });
  }

  res.status(200).send(result);
});

router.all("*", (req: any, res: any) => {
  res.status(404).send({
    error: "Not found",
  });
});

export { router as debitRouter };
