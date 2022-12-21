require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./routes/AuthRoute");
const notesRoute = require("./routes/NotesRoute");
const port = 4040;

app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/notes", notesRoute);

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`)
})

