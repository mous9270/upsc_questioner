import express from "express"
import mongoose from "mongoose"
import { PORT, mongodbURL } from "./config.js"
import { Question } from "./models/questionModel.js"
import questionRoute from "./routes/questionRoute.js"
import cors from "cors"

const app = express();
app.use(express.json());

app.use(cors());
app.use('/questions', questionRoute);


app.get('/', (req, res) => {
    console.log(req);
    return res.send("Hello Friend");
});

mongoose
    .connect(mongodbURL)
    .then(()=>{
        console.log("connected to database");
        app.listen(PORT, () => {
            console.log(`Listing to the port ${PORT}`);

        });   

    })
    .catch((error)=>{
         console.log(`error: ${error}`);

    })


