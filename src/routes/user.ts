const express = require("express");
const router = express.Router();
import db_connection from "../db/db"; //importing the connection client to the DB.
import {
  getAllusers,
  getUserById,
  getUserByUsername,
  setUser,
  updateUser,
  deleteUser
} from "./helpers/userRouteHelper";

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

  const result = await getAllusers(db_connection);
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

  const result = await getUserById(db_connection, id);
  if (!result.status) {
    return res.status(500).send({
      error: "Internal Error, please try again",
    });
  }
  res.status(200).send(result);
});

router.get("/username/:username", async (req: any, res: any) => {
  const username = req.params.username;

  if (username === "") {
    return res.status(400).send({
      error: "Bad Request, Id should be an integer",
    });
  }

  if (!db_connection) {
    return res.status(500).send({
      error: "Internal Error, please try again",
    });
  }

  const result = await getUserByUsername(db_connection, username);
  if (!result.status) {
    return res.status(500).send({
      error: "Internal Error, please try again",
    });
  }
  res.status(200).send(result);
});

const setUserValid = (data: any) => {};

router.post("/", async (req: any, res: any) => {
  //headers: -> application/json;
  const data = req.body;

  if (!db_connection) {
    return res.status(500).send({
      error: "Internal Error, please try again",
    });
  }

  const result = await setUser(db_connection, data);

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

  const result = await updateUser(db_connection, id, data);

  if (!result.status) {
    if("errorMessage" in result){
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

  const result = await deleteUser(db_connection, id);

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

export { router as userRouter };
