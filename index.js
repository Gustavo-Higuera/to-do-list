import express from "express";
import ejs from "ejs";
import dayjs from "dayjs";
import bodyParser from "body-parser";

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const days = ["Sunday", "Monday", "Tueday", "Wednesday", "Thursday", "Friday", "Saturday"];

const month = months[dayjs().month()];
const weekday = days[dayjs().day()];
const day = dayjs().date();
const formattedDate = `${weekday}, ${month} ${day}`;

let listItems = [];

app.listen(port, (err) => {
  console.log(`Server is active on Port ${port}`);
  if (err) console.log("Server failed to activate");
});

app.get("/", (req, res) => {
  res.render("index.ejs", {
    date: formattedDate,
    item: listItems
  });
});


app.post("/", (req, res) => {
  const userInput = req.body["newItem"];
  listItems.push(userInput);

  res.render("index.ejs", {
    date: formattedDate,
    item: listItems
  })
});
