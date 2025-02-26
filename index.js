import cors from "cors";
import express from "express";
import prisma from "./prisma.js";

const corsOptions = {
  origin: [
    "https://accredian-frontend-task-five-umber.vercel.app/",
    "http://localhost:5173",
  ],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("welcome to website"));

app.post("/form", async (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Please enter the details",
      success: false,
    });
  }

  const {
    referrerName,
    referrerEmail,
    referrerPhone,
    referrerRelation,
    referrerCourse,
    refereeName,
    refereeEmail,
    refereePhone,
    refereeSuggestedCourse,
  } = req.body;

  let referrer = await prisma.Referrer.findUnique({
    where: { email: referrerEmail },
  });

  if (!referrer) {
    referrer = await prisma.Referrer.create({
      data: {
        name: referrerName,
        email: referrerEmail,
        phone: referrerPhone,
      },
    });
  }

  const referral = await prisma.Referral.create({
    data: {
      referrerId: referrer.id,
      name: refereeName,
      email: refereeEmail,
      phone: refereePhone,
      course: refereeSuggestedCourse,
    },
  });
});

app.listen(port, () => console.log("server running on port 3000"));
