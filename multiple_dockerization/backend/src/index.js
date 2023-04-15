const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const Todo = require("./models/todo");

const app = express();

app.use(bodyParser.json());
app.use(cors());
mongoose.set('strictQuery', false)

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  return res.status(200).json({
    todos,
  });
});

app.post("/todos", async (req, res) => {
  const name = req.body.name;
  const todo = new Todo({
    name,
  });
  await todo.save();
  res.status(201).json({ message: "Goal saved", todo });
});

app.put("/todos/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  todo.completed = !todo.completed;

  await todo.save();

  return res.status(201).json({ message: "Todo saved", todo });
});

app.delete("/todos/:id", async (req, res) => {
  await Todo.deleteOne({
    id: req.params.id,
  });
  console.log("deleted")
  return res.status(201).json({ message: "Todo deleted" });
});

mongoose.connect(
  // `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongodb:27017/todos-app?authSource=admin`,

  `mongodb+srv://iadmin:mysecretpassword@cluster0.omv2svc.mongodb.net/?retryWrites=true&w=majority`,
  
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
  },
  (err) => {
    if (err) {
      console.log("Unable to connect to MongoDB");
      console.log(err);
      console.log("----username----",process.env.MONGODB_USERNAME)
      console.log("----password----",process.env.MONGODB_PASSWORD)
    } else {
      console.log("Connected to MongoDB");
      app.listen(8000, () => {
        console.log("Now listening on PORT 8000------");
      });
    }
  }
);
