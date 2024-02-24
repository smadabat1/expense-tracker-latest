const express = require('express')
const router = express.Router();

router.use((req: any, res: any, next: any) => {
    console.log('Time: ', Date.now())
    next();
});

router.get("/", (req: any, res: any)=> {
    res.send("category mini app");
})

export {router as categoryRouter};