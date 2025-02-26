import cors from "cors";
import express from "express";
import prisma from "./prisma.js";

const app = express();
app.use(cors());
app.use(express.json());

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
  console.log(referrer);
  console.log(referral);
});

app.listen(3000, () => console.log("server running on port 3000"));
