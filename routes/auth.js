const express = require("express");
const router = express.Router();
//const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");
const con = require("../dbmysql");

const JSON_SEC_KEY = "arundev@code";

router.post(
  "/createuser",
  [
    body("name", "name must be  equal or greater than 5 ").isLength({ min: 5 }),
    body("password", "password must be 5").isLength({ min: 5 }),
    body("email", "email must be  valid").isEmail(),
  ],
  async (req, res) => {
    // this code run if request parameter fail in validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const checkEmail =
        "SELECT * FROM users WHERE email='" + req.body.email + "'";
      await con.query(checkEmail, function (err1, result1) {
        if (err1) throw err1;
        /// console.log(result1);
        if (result1.length > 0) {
          return res
            .status(400)
            .json({ message: "user already exist with this email" });
        } else {
          const salt = bcrypt.genSaltSync(10);
          const secPass = bcrypt.hashSync(req.body.password, salt);
          const sql =
            "INSERT INTO users (email,password,name) VALUES ('" +
            req.body.email +
            "', '" +
            secPass +
            "','" +
            req.body.name +
            "')";
          con.query(sql, function (err, result) {
            if (err) throw err;
            //console.log(result);
            const userToken = {
              user: {
                id: result.insertId,
              },
            };

            const jwtToken = jwt.sign(userToken, JSON_SEC_KEY);

            return res.status(200).json({ jwtToken });
          });
        }
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("some error occured");
    }
  }
);

/// login api

router.post(
  "/login",
  [
    body("email", "email must be  valid").isEmail(),
    body("password", "password must be required").exists(),
  ],
  async (req, res) => {
    // this code run if request parameter fail in validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const checkEmaila =
        "SELECT * FROM users WHERE email='" + req.body.email + "' ";
      // console.log(checkEmail);
      await con.query(checkEmaila, function (err, results) {
        if (err) throw err;

        if (results.length === 0) {
          console.log(results);
          return res
            .status(400)
            .json({ message: "please enter correct credentials" });
        }
        console.log(results);
        const comparePass = bcrypt.compareSync(
          req.body.password,
          results[0].password
        ); // true

        if (!comparePass) {
          return res
            .status(400)
            .json({ message: "please enter correct credentials" });
        }

        const userToken = {
          user: {
            id: results[0].id,
          },
        };

        const jwtToken = jwt.sign(userToken, JSON_SEC_KEY);

        return res.status(200).json({ jwtToken });
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("some error occured");
    }
  }
);

//  get login user detail with jwt token
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;

    const checkEmail = "SELECT * FROM users WHERE id='" + userId + "'";
    await con.query(checkEmail, function (err, result) {
      if (err) throw err;
      //console.log(result[0])
      // if (result) {
      //console.log(result[0])
      if (result !== 0) {
        return res.send(result[0]);
      }
    });

    // let user = await User.findById(userId).select("-password");
    // res.send(user);
  } catch (error) {
    //console.log(error.message);
    res.status(401).json({ message: "some error occured" });
  }
  // return res.status(401).json({ message: "some error occuredwww" });
});

//  get login user detail with jwt token
router.post(
  "/updateUser",
  fetchUser,
  [
    body("name", "name must be  equal or greater than 5 ").isLength({ min: 5 }),
    body("email", "email must be  valid").isEmail(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const userId = req.user.id;

      //console.log(userId);
      const checkEmail =
        "SELECT * FROM users WHERE email = '" +
        req.body.email +
        "' && id !='" +
        userId +
        "'";
      await con.query(checkEmail, function (err, result) {
        if (err) throw err;

        if (result.length > 0) {
          return res
            .status(400)
            .json({ message: "email already take by other user" });
        } else {
          const sqlUpdateUser =
            "UPDATE users SET name = '" +
            req.body.name +
            "', email= '" +
            req.body.email +
            "' WHERE id = '" +
            userId +
            "'";
          con.query(sqlUpdateUser, function (err, result) {
            if (result.affectedRows == 1) {
              return res
                .status(200)
                .json({ message: "profile update successfully" });
            } else {
              return res
                .status(400)
                .json({ message: "some thinks went wrong" });
            }
          });
        }
      });
    } catch (error) {
      //console.log(error.message);
      res.status(401).json({ message: "some error occured" });
    }
  }
);

module.exports = router;
