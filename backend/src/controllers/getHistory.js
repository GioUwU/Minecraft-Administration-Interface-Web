const jwt = require("jsonwebtoken");
const config = require("../config/auth");
const { History } = require("../db.js");
const path = require("path");
const fs = require("fs");

const getAllHistory = async (req, res) => {
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
      History.findAll()
        .then((history) => {
          if (!history) {
            return res.status(400).json({ message: "History not found" });
          }

          //las pruebas estan en un array, deben cambiar a un objeto con el url de la imagen para mostrarla en el front
         history.map((history) => {
             //las pruebas vienen asi [\"prueba1.jpg\",\"prueba2.jpg\"] y deben cambiar a un objeto con el url de la imagen para mostrarla en el front
              //debe convertir a un arrar legible para el front
              const toJson = JSON.parse(history.proofs);

              const converProofs = toJson.map((proof) => {

                  return { url: `https://panel.mariana-re.com/proofs/${proof}` };
              });
              console.log(converProofs);
              history.proofs = converProofs;
              return history;
          });

          
          
          return res.status(200).json(history);
        })
        .catch((err) => {
          console.log(err);
          return res.status(400).json({ message: "error in db" });
        });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getUserNameHistory = async (req, res) => {
  const { nickname } = req.params;
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
    });
    const history = await History.findAll({ where: { nickname } });
    if (history.length === 0) {
      return res.status(404).json({ message: "History not found" });
    } 
    
    history.map((history) => {
      const converProofs = history.proofs.map((proof) => {
         return { url: `https://panel.mariana-re.com/proofs/${proof}` };
       });
       history.proofs = converProofs;
       return history;
    });
    return res.status(200).json(history);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getHistoryByFaction = async (req, res) => {
  const { faction } = req.params;
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
    });
    const history = await History.findAll({ where: { faction } });
    if (history.length === 0) {
      return res.status(404).json({ message: "History not found" });
    }
    
    history.map((history) => {
      const converProofs = history.proofs.map((proof) => {
         return { url: `https://panel.mariana-re.com/proofs/${proof}` };
       });
       history.proofs = converProofs;
       return history;
    });

    return res.status(200).json(history);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getHistoryBiId = async (req, res) => {
  const { id } = req.params;
  try {
   
    const history = await History.findAll({ where: { id } });
    if (history.length === 0) {
      return res.status(404).json({ message: "History not found" });
    }
    
    history.map((history) => {
      const converProofs = history.proofs.map((proof) => {
         return { url: `https://panel.mariana-re.com/proofs/${proof}` };
       });
       history.proofs = converProofs;
       return history;
    });

    return res.status(200).json(history);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const deleteHistory = async (req, res) => {
  const { id } = req.params;
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
    });
    const history = await History.destroy({ where: { id } });
    if (!history) return res.status(404).json({ message: "History not found" });

    return res.status(200).json({ message: "History deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const getProofs = async (req, res) => {
  try {
    const { id } = req.params;
    const history = await History.findOne({ where: { id } });
    if (!history) return res.status(404).json({ message: "History not found" });
    const proofs = history.proofs;
    //return res.sendFile(path.join(__dirname, `../../public/uploads/${proofs[0]}`));
    return res
      .status(200)
      .send(
        proofs.map((proof) => `https://panel.mariana-re.com/proofs/${proof}`)
      );

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getProofsByNameFile = async (req, res) => {
  try {
    const { name } = req.params;
    return res.sendFile(path.join(__dirname, `../../public/uploads/${name}`));
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



module.exports = {
  getAllHistory,
  getUserNameHistory,
  getHistoryByFaction,
  getHistoryBiId,
  deleteHistory,
  getProofs,
  getProofsByNameFile,
};
