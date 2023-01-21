const { History } = require("../db.js");
const jwt = require("jsonwebtoken");
const config = require("../config/auth");

const path = require("path");
const multer = require("multer");


const registerSancion = async (req, res) => {
  const {
    nickname,
    faction,
    reason,
    strike,
    points,
    modalidad,
    time,
    staffnickname,
  } = req.body;

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


    if (!nickname)
      return res.status(400).json({ message: "Nickname is required" });
    if (!faction)
      return res.status(400).json({ message: "Faction is required" });
    if (!reason) return res.status(400).json({ message: "Reason is required" });
    if (!points) return res.status(400).json({ message: "Points is required" });
    if (!modalidad)
      return res.status(400).json({ message: "Modalidad is required" });
    if (!time) return res.status(400).json({ message: "Time is required" });
    if (!staffnickname)
      return res.status(400).json({ message: "Staffnickname is required" });



    const history = await History.findOne({
      where: { nickname: nickname },
      order: [["createdAt", "DESC"]],
    }).then((history) => {
      return history;
    });

     if (!history) {
      const history = await History.create({
          nickname,
          faction,
          reason,
          strike,
          points: points,
          modalidad,
          time,
          staffnickname,
        });

       return res.status(200).json({ message: "Sancion registrada", id: history.id });
     }

     if (history) {
       if (history.faction !== faction) {
         //crear un nuevo historial
         await History.create({
           nickname,
           faction,
           reason,
           strike,
           points: points,
           modalidad,
           time,
           staffnickname,
         });
         return res.status(200).json({ message: "Sancion registrada", id: history.id });
       }
     }
     await History.create({
       nickname,
       faction,
       reason,
       strike: Number(history.strike) + Number(strike),
       points: points,
       modalidad,
       time,
       staffnickname,
     });

    
      return res.status(200).json({ message: "Sancion registrada", id: history.id });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const uploadProofs = async (req, res) => {
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

    const history = await History.findOne({
      where: { id: id },
    }).then((history) => {
      return history;
    });

    if (!history) {
      return res.status(404).json({ message: "History not found" });
    }

    const storage = multer.diskStorage({
          destination: function (req, file, cb) {
            // Uploads is the Upload_folder_name
            cb(null, "./public/uploads");
          },
          filename: function (req, file, cb) {
            cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
          },
        });

        //pueden ser varios archivos como videos, imagenes, etc
        const maxSize = 1024 * 1024 * 200;

         const upload = multer({
           storage: storage,
           limits: { fileSize: maxSize },
           fileFilter: function (req, file, cb) {
             // los tipos de archivos que se pueden subir son videos, imagenes, etc
             var filetypes =
               /jpeg|jpg|png|gif|mp4|mov|avi|wmv|flv|mkv|mpeg|mpg/;
             var mimetype = filetypes.test(file.mimetype);

             var extname = filetypes.test(
               path.extname(file.originalname).toLowerCase()
             );

             if (mimetype && extname) {
               return cb(null, true);
             }
             cb(
               "Error: File upload only supports the following filetypes - " +
                 filetypes
             );
           },
         }).array("proofs", 10);

        upload(req, res, async function (err) {
          if (err) {
            // ERROR occured (here it can be occured due to uploading image of size greater than 1MB or uploading different file type)  
            res.json({ message: err });
          } else {
            // SUCCESS, image successfully uploaded

           


            const proofs = req.files.map((file) => {
              return file.filename;
            });


            await History.update(
              {
                proofs: proofs,
              },
              {
                where: {
                  id: id,
                },
              }
            );

            res.json({ message: "Proofs uploaded" });
          }
        });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};




module.exports = {
  registerSancion,
  uploadProofs,
};


