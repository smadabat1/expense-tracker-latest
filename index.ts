import express from "express";

const app = express();
const port: number = 8081;
const apiVersion: string = "v1";

//MIDDLEWARE
import("dotenv/config");


//IMPORT routes
import { userRouter } from "./src/routes/user";
import { categoryRouter } from "./src/routes/category";

app.get("/", (req : any, res : any)=> {
    res.send("Hello world!");
})
app.use(`/${apiVersion}/user/`, userRouter);
app.use(`/${apiVersion}/category`, categoryRouter);


app.listen(port, ()=> {
    console.log(`Server listening on port - ${port}`);
})