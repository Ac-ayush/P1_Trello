import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();

mongoose.connect(
  "mongodb+srv://ayushc9977:ayush@cluster0.mougxa1.mongodb.net/?retryWrites=true&w=majority"
);
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  details: {
    name: String,
    role: String,
    phone: Number,
  },
});

const User = mongoose.model("User", userSchema);

app.use(cors());
app.use(bodyParser.json());

app.post("/api/register", async (req, res) => {
  try {
    const { email, password, name, role, phone } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      details: { name, role, phone },
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        email: user.email,
        role: user.details.role,
        name: user.details.name,
        phone: user.details.phone,
      },
      "your-secret-key"
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.listen(8080, () => {
  console.log("server is connected");
});
