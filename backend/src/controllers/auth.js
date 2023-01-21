const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config/auth");
const { Users } = require("../db.js");
const axios = require("axios");
const { use } = require("../routes");

const Login = function (req, res, next) {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });
  if (!password)
    return res.status(400).json({ message: "Password is required" });

  Users.findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) {
        return res.status(401).json({ message: "Invalid password" });
      }
      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      req.session.token = token;
      res.cookie("token", token, { maxAge: 900000, httpOnly: true });

      res.status(200).json({
        message: "User logged in",
        token: token,
        user: user,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ message: "error in db" });
    });
};

const Register = async function (req, res, next) {
  const { email, password, nickname, role } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });
  if (!password)
    return res.status(400).json({ message: "Password is required" });
  if (!nickname)
    return res.status(400).json({ message: "Nickname is required" });

  const user = await Users.findOne({ where: { email } });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }
  
  const userNick = await Users.findOne({ where: { nickname } });
  if (userNick) {
    return res.status(400).json({ message: "Nickname already exists" });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);

  Users.create({
    email,
    password: hashedPassword,
    nickname,
    role,
  })
    .then((user) => {
      res.status(200).json({ message: "User created", user });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ message: "error in db" });
    });
};




const getDataUser = function (req, res, next) {
  //el toqueen el req.headers
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.userId = decoded.id;
    Users.findOne({ where: { id: req.userId } })
      .then((user) => {
        if (!user) {
          return res.status(400).json({ message: "User not found" });
        }
        user.avatar = `https://panel.mariana-re.com/avatar/${user.id}`;
        res.status(200).json(user);
     
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({ message: "error in db" });
      });
  });
};
const Logout = function (req, res) {
  req.session.destroy();
  res.clearCookie("token");
  res.status(200).json({ message: "User logged out" });
};


const getAllUsers = function (req, res) {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.userId = decoded.id;
      Users.findAll()
        .then((users) => {
          if (!users) {
            return res.status(400).json({ message: "Users not found" });
          }

          users.map((user) => {
            //si avatar es null, no lo muestro
            if (user.avatar) {
              user.avatar = `https://panel.mariana-re.com/avatar/${user.id}`;
            }
          });

          return res.status(200).json(users);
        })
        .catch((err) => {
          console.log(err);
          return res.status(400).json({ message: "error in db" });
        });
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = function (req, res) {
  const { id } = req.body;
  try {
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.userId = decoded.id;
      Users.findOne({ where: { id: req.userId } })
        .then((user) => {
          if (!user) {
            return res.status(400).json({ message: "User not found" });
          }
          if (user.role === "admin" || user.role === "op") {
            Users.destroy({ where: { id } })
              .then((user) => {
                return res.status(200).json({ message: "User deleted" });
              })
              .catch((err) => {
                console.log(err);
                return res.status(400).json({ message: "error in db" });
              });
          } else {
            return res.status(400).json({ message: "Unauthorized" });
          }
        })
        .catch((err) => {
          console.log(err);
          return res.status(400).json({ message: "error in db" });
        });
    });
  } catch (error) {
    console.log(error);
  }
};


module.exports = {
  Login,
  Logout,
  Register,
  getDataUser,
  getAllUsers,
  deleteUser,
};
