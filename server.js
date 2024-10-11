require('dotenv').config();
const express =  require("express")
const cors = require("cors");
require("./db/dbConfig");
const mobileRouter = require("./route/mobile.route");
const userRouter = require("./route/user.route");
const app = express();
const Port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/v1",mobileRouter);
app.use("/v1",userRouter);

app.listen(Port,()=>{
    console.log(`server is running on port ${Port}`);
})