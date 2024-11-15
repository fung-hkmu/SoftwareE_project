const express = require("express");
const User = require("../db/database");  
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const isAdmin = async (req, res, next) => {
  try {
      const user = await User.findOne({ userId: req.body.userId });
      if (!user || !user.isAdmin) {
          return res.status(403).json("Unauthorized: Admin access required");
      }
      next();
  } catch (error) {
      res.status(500).json({ message: "Error checking admin status", error: error.message });
  }
};


router.post("/register", async (req, res) => {
  try {
      const existingUser = await User.findOne({ username: req.body.username });
      if (existingUser) {
          return res.status(400).json("Username already taken");
      }

      const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      const passwordRegEx = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
      const phoneRegEx = /^[0-9]{8}$/;
      
      if (!req.body.email.match(emailRegEx)) {
          return res.status(401).json("Invalid email format");
      }
      if (!req.body.password.match(passwordRegEx)) {
          return res.status(401).json("Password must contain at least 8 characters, including uppercase, lowercase, and numbers");
      }
      if (!req.body.phone.toString().match(phoneRegEx)) {
        return res.status(401).json("Phone number must contain 8 numbers");
    }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const newUser = new User({
          username: req.body.username,
          useremail: req.body.email,
          password: hashedPassword,
          userphone: req.body.phone,
          isAdmin: req.body.isAdmin,
      });

      const savedUser = await newUser.save();
      res.status(201).json({ message: "User registered successfully", user: savedUser });

  } catch (error) {
      res.status(500).json({ message: "Error registering user", error: error.message });
  }
});


router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json("No this user or incorrect password");
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json("No this user or incorrect password");
    }

    res.status(200).json({
      userId: user.userId,
      username: user.username,
      useremail: user.useremail,
      userphone: user.userphone,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});


router.post("/forgot-password", async (req, res) => {
  try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
          return res.status(404).json("User not found");
      }

      const resetToken = jwt.sign(
          { userId: user.userId },
          "mpvpNehT7p0wzKNjP2drPDmMRRG6SwcyPnUCwKTafb6iCWQgcg0Xq5qeH46PhKMD0GIYGCXu388ygkbgmG7lB4ixxBMKIQ3duFcY3LwSZ8egAEcLzkl71EHx1OFeLohZQwUqGIg6qbkPf2tokeQv98q1h6TLtTOzh614SCIrpZ6TWNdwRri5LEV7vHEsw",
          { expiresIn: '1h' }
      );

      res.status(200).json({ 
          message: "Password reset instructions sent", 
          resetToken: resetToken 
      });

  } catch (error) {
      res.status(500).json({ message: "Error processing request", error: error.message });
  }
});


router.post("/reset-password", async (req, res) => {
  try {
      const { resetToken, newPassword } = req.body;
      
      const decoded = jwt.verify(resetToken, "mpvpNehT7p0wzKNjP2drPDmMRRG6SwcyPnUCwKTafb6iCWQgcg0Xq5qeH46PhKMD0GIYGCXu388ygkbgmG7lB4ixxBMKIQ3duFcY3LwSZ8egAEcLzkl71EHx1OFeLohZQwUqGIg6qbkPf2tokeQv98q1h6TLtTOzh614SCIrpZ6TWNdwRri5LEV7vHEsw");
      const user = await User.findOne({ userId: decoded.userId });
      const passwordRegEx = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
      if (!req.body.newPassword.match(passwordRegEx)) {
        return res.status(401).json("Password must contain at least 8 characters, including uppercase, lowercase, and numbers");
    }
      if (!user) {
          return res.status(404).json("Invalid reset token");
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      
      user.password = hashedPassword;
      await user.save();

      res.status(200).json("Password updated successfully");

  } catch (error) {
      res.status(500).json({ message: "Error resetting password", error: error.message });
  }
});


router.get("/admin/display-all-users", isAdmin, async (req, res) => {
  try {
      const users = await User.find({});
      res.status(200).json(users);
  } catch (error) {
      res.status(500).json({ message: "Error fetching users", error: error.message });
  }
});


router.delete("/admin/delete/:userId", isAdmin, async (req, res) => {
  try {
      const user = await User.findOneAndDelete({ userId: req.params.userId });
      
      if (!user) {
          return res.status(404).json("User not found");
      }

      res.status(200).json({ message: "User deleted successfully" });

  } catch (error) {
      res.status(500).json({ message: "Error deleting user", error: error.message });
  }
});

module.exports = router;  