const { Times, Rules, Users, History } = require("../db.js");
const jwt = require("jsonwebtoken");
const config = require("../config/auth");

const path = require("path");
const multer = require("multer");


const getAllTimes = async (req, res) => {
    try {
        const times = await Times.findAll();
        res.json(times);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    }

const getAllRules = async (req, res) => {
    try {
        const rules = await Rules.findAll();
        res.json(rules);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    }

const newRule = async (req, res) => {
    try {
        const { title, description } = req.body;
        if(!title) return res.status(400).json({ message: "Tittle is required" });
        if(!description) return res.status(400).json({ message: "Description is required" });
        const newRule = await Rules.create({
            title,
            description,
        });
        res.json(newRule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    }
    
const newTime = async (req, res) => {
    try {
        const { sanction, time, description } = req.body;
        if(!sanction) return res.status(400).json({ message: "Sanction is required" });
        if(!time) return res.status(400).json({ message: "Time is required" });
        if(!description) return res.status(400).json({ message: "Description is required" });
        const newTime = await Times.create({
            sanction,
            time,
            description,
        });
        res.json(newTime);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


const authoRizeSanction = async (req, res) => {
    try {
        const { id } = req.params;
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

        const historial = await History.findOne(
            { where: { id: id } },
            { order: [["createdAt", "DESC"]] }
        );

    
        const user = await Users.findOne({ where: { id: req.userId } });


        if(!user) return res.status(400).json({ message: "User not found" });
        if(!historial) return res.status(400).json({ message: "History not found" });
        if(historial.check === true) return res.status(400).json({ message: "Sanction already authorized" });

        historial.check = true;
        user.earnings = user.earnings + 0.25;
        await historial.save();
        await user.save();


        return res.status(200).json({ message: "Sanction authorized" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}




const updateAvatar = async (req, res) => {
    try {
        //debe guardar la imagen en la carpeta files y luego guardar la ruta en la base de datos para luego mostrarla en el front
        const { id } = req.params;
        const user = await Users.findOne({ where: { id: id } });
        if(!user) return res.status(400).json({ message: "User not found" });
        if(user.id !== id) return res.status(400).json({ message: "You are not the owner of this account" });
        const storage = multer.diskStorage({
          destination: function (req, file, cb) {
            // Uploads is the Upload_folder_name
            cb(null, "./public");
          },
          filename: function (req, file, cb) {
            cb(null, file.fieldname + "-" + Date.now() + ".jpg");
          },
        });

        const maxSize = 1024 * 1024 * 15;

       const upload = multer({
         storage: storage,
         limits: { fileSize: maxSize },
         fileFilter: function (req, file, cb) {
           // Set the filetypes, it is optional
           var filetypes = /jpeg|jpg|png/;
           var mimetype = filetypes.test(file.mimetype);

           var extname = filetypes.test(
             path.extname(file.originalname).toLowerCase()
           );

           if (mimetype && extname) {
             return cb(null, true);
           }

           cb(
             "Error: File upload only supports the " +
               "following filetypes - " +
               filetypes
           );
         },

         // mypic is the name of file attribute
       }).single("avatar");
        upload(req, res, async (err) => {
            if (err) {
                // ERROR occured (here it can be occured due to uploading image of size greater than 1MB)
                res.status(400).json({ message: err });
            } else {
                // SUCCESS, image successfully uploaded
                if(!req.file) { 
                    return res.status(400).json({ message: "Please upload an image" });
                }

                user.avatar = req.file.path;
                await user.save();
                res.status(200).json({ message: "Avatar updated" });
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getAvatar = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findOne({ where: { id: id } });
        if(!user) return res.status(400).json({ message: "User not found" });
        if(user.id !== id) return res.status(400).json({ message: "You are not the owner of this account" });
         res.sendFile(path.join(__dirname, `../../${user.avatar}`));
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
module.exports = {
  getAllTimes,
  getAllRules,
  newRule,
  newTime,
  authoRizeSanction,
  updateAvatar,
  getAvatar,
};