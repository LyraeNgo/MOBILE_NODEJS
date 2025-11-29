//get all routes here
import express from "express";
import userRoutes from "./src/Routes/user_route.js";
import inviterRoutes from "./src/Routes/inviter_route.js";
import eventRoutes from "./src/Routes/event_route.js";
import authRoutes from "./src/Routes/auth_route.js";
import seatRoutes from "./src/Routes/seat_route.js";
import eventSeatRoutes from "./src/Routes/event_seat_route.js";
import ticketRoutes from "./src/Routes/ticket_route.js";
import reviewRoutes from "./src/Routes/review_route.js";
import mediaRoutes from "./src/Routes/media_route.js";
import tagRoutes from "./src/Routes/tag_route.js";
import orderRoutes from "./src/Routes/order_route.js";
import eventInviterRoutes from "./src/Routes/event_inviter_route.js";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/inviters", inviterRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/events", eventSeatRoutes);
app.use("/api/events-inviters/", eventInviterRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/seats", seatRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/orders", orderRoutes);
app.use("/", (req, res) => {
  console.log("API is running");

  res.status(200).send("Welcome to MOBILE API");
});

export default app;
