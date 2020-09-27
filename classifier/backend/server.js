var express=require("express");
var cors=require("cors");
var bodyParser=require("body-parser");
const app=express();
const path=require('path');
const spawn = require('child_process').spawn;



app.use(cors());
app.use(bodyParser.json());
app.get("/",(req,res)=>{
    res.send("Hello World");
});


app.listen("8080","localhost");


const multer=require("multer");
//Setting the destination path and file name
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

//creating the multer object
const upload = multer({ storage: storage });

app.post("/upload",upload.single("myImage"), (req, res) => {
    var path=req.file.path;
    var file_name=path.substr(8);
    console.log(file_name);

        var classify_image = (file_name) => {
            const scriptExecution = spawn("python.exe", ["classify.py"]);
            var data_recieved;
            // Handle normal output
            scriptExecution.stdout.on('data', (data) => {
                data_recieved = data.toString();
                console.log(data_recieved);
                res.send(data_recieved);
            });
            //Send symbol to python Script
            scriptExecution.stdin.write(file_name);
            // End data write
            scriptExecution.stdin.end();
        };
    
    classify_image(file_name);
});




