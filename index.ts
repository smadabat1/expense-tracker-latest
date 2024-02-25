import express from "express";

const app = express();

//CONSTANTS
const port: number = 8081;
const apiVersion: string = "v1";

//MIDDLEWARE
app.use(express.json())
import("dotenv/config");


//IMPORT routes
import { userRouter } from "./src/routes/user";
import { categoryRouter } from "./src/routes/category";
import { debitRouter } from "./src/routes/debit";

app.get("/", (req : any, res : any)=> {
    res.status(200).send({
        status: "online"
    });
})
app.use(`/${apiVersion}/user`, userRouter);
app.use(`/${apiVersion}/category`, categoryRouter);
app.use(`/${apiVersion}/debit`, debitRouter);

app.all("*", (req: any, res: any)=> {
    res.status(404).send({
        error: "Not found"
    })
});

app.listen(port, ()=> {
    console.log(`Server listening on port - ${port}`);
})