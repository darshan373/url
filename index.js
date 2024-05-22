const express=require("express");
const app = express();
const PORT=8000;
const cookieParser = require("cookie-parser");

const bodyParser=require("body-parser")
const path=require("path")
const URL=require("./models/url")

const {connectmongoDB}=require("./connection/connect");
const urlrouter=require("./routes/router")
const userRouter=require("./routes/user")
const staticRouter=require("./routes/staticRouter")
const {restrictToLoggedinUserOnly,checkAuth}=require("./middlewares/auth")
const { handleshorturl, handleurlanalytics } = require("./controllers/url");

connectmongoDB(process.env.MONGODB ?? "mongodb://localhost:27017/url").then(() =>
    console.log("Mongodb connected")
  );
app.set("view engine","ejs")
app.set("views",path.resolve("./view"))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())


app.use("/url",restrictToLoggedinUserOnly,urlrouter)
app.use("/user",userRouter)
app.use("/",checkAuth,staticRouter)


app.get("/url/:shortid", async (req, res) => {
    const shortid = req.params.shortid;
    
    const entry = await URL.findOneAndUpdate(
      {
        shortid
      },
      {
        $push: {
          visithistory: {
            timestamp: Date.now(),
          },
        },
      },{ new: true }
    );
    res.redirect(entry.redirecturl)
  });




app.listen(PORT,()=>{
    console.log(`Server Started at PORT: ${PORT}`)
})