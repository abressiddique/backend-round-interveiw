const express = require("express");
const connectDB = require("./utils");


const app = express()
const port = 1000

connectDB()
app.use(express.json())



app.use("/api/user", require("./routes/uesrroutes"))
app.use("/api/contact",require("./routes/contactroutes"))

app.listen(port,()=>{
    console.log("the tthingy start runing dude ")
})