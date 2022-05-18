"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_gridfs_storage_1 = require("multer-gridfs-storage");
const express = require("express");
const _conectdb = require("./connect");
const multer = require("multer");
const crypto = require("crypto");
const methodoveride = require("method-override");
const Grid = require("gridfs-stream");
const path = require("path");
const mongoose = require("mongoose");
// methidoveride 
// const ejs = require("ejs")
const app = express();
const cookieparser = require("cookie-parser");
app.use(cookieparser("29i2009i41i92093902032903921"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodoveride("_method"));
const connection = `mongodb+srv://prince1:123prince1@cluster0.4vxre.mongodb.net/images?retryWrites=true&w=majority`;
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "./uploads/");
//     },
//     filename: function (req:any, files:any, cb:any) {
//         console.log("Gggggggggggggg");
//         cb(null, files.originalname);
//     }
// });
const connect = mongoose.createConnection(connection, { useNewUrlParser: true });
let gfs;
connect.once("open", () => {
    console.log("hllo");
    // gfs = new mongoose.mongo.gridFsBucket(connect.db,{
    //     bucketName:"uploads2"
    // })
    gfs = Grid(connect.db, mongoose.mongo);
    gfs.collection("uploads2");
    console.log("Ddd");
});
const _storage = new multer_gridfs_storage_1.GridFsStorage({
    url: connection,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                const filename = buf.toString("hex") + path.extname(file.originalname);
                const fileinfo = {
                    filename,
                    bucketName: "uploads2"
                };
                resolve(fileinfo);
            });
        });
    }
});
// const upload = multer({ storage});
const upload2 = multer({ storage: _storage });
// console.log(gfs)
let chunk = connect.model("uploads2.chunks", new mongoose.Schema({}, { strict: false }));
let file = connect.model("uploads2.files", new mongoose.Schema({}, { strict: false }));
module.exports = { chunk, file };
// setTimeout(async ()=>{
// console.log("timeout")
// let id__ = "62806dfc1a4e089150520cb1"
// file.findOneAndDelete({_id:id__}, function (err, docs) {
//     if (err){
//         console.log(err)
//     }
//     else{
//         console.log("Deleted User : ", docs);
//     }
// });
// chunk.find({}, function (err, docs) {
//     if (err){
//         console.log(err)
//     }
//     else{
//         if(docs!=null){
//             docs.forEach(e=>{
//                 // console.log(e.files_id=="62806e101a4e089150520cb5")
//                 if(e.files_id == id__){
//                      chunk.findOneAndDelete({_id:e._id}, function (err, docs) {
//                         if (err){
//                             console.log(err)
//                         }
//                         else{
//                         if(docs!=null){
//                                     console.log("Deleted User : ", docs._id);
//                                 }else{
//                             console.log("Deleted User : ", docs);
//                         }
//                         }
//                     });
//                 }
//             })
//         }
//         // console.log("Deleted User : ", docs);
//     }
// });
// const _authuser = require("./createccount").authuser;
// // _authuser()
//     // gfs.files.deleteOne({ filename
//     //     :
//     //     "ce4fa822c8b411911ae40bfe6af218a7.jpg",root:"uploads2" }, (err,data) => {
//     //     if(err){console.log(err)}
//     //     if(data){console.log(data)}
//     // });
//     // gfs.files.exist({ _id: new mongoose.Types.ObjectId("6280577338e4267b8da688dd"),root:"uploads" }, function (err, found) {
//     //     if (err) {console.log(err)};
//     //     found ? console.log('File exists') : console.log('File does not exist');
//     //   });
//     // gfs.deleteOne({ _id: "6280577538e4267b8da688de",root:"uploads" }, (err,data) => {});
// },10000)
// const bodyparser = require("body-parser")
// app.use(bodyparser.urlencoded({extended:true}))
// app.use(bodyparser.json())
app.set({ "view-engine": "ejs" });
app.use(express.static("public"));
const _create = require("./createccount").create;
const _withdrawandfund = require("./createccount").withdrawandfund;
const _transaction = require("./authenticate").transaction;
// import create from "./createccount "
const _authenticate = require("./authenticate").authenticate;
app.get("/", (req, res, next) => {
    if (req.signedCookies.oblivion) {
        _authenticate(req, res, next);
    }
    else {
        res.render("bankapp.ejs");
    }
}, (req, res) => {
    console.log(req.loggedin, "log");
    res.render("dashboard.ejs", { loggedin: req.loggedin, transactions: req.transactions, account_balance: req.account_balance, err: null, acctarr: req.acctarr });
});
app.get("/createaccount", (req, res) => {
    res.render("regform.ejs", { loggedin: null, err: null });
});
app.post("/register", upload2.fields([{ name: "nepabill", maxCount: 1 }, { name: "IDfile", maxCount: 1 }, { name: "passportpics", maxCount: 1 }]), _create);
// app.post("/register", upload2.array("/multiple"), _create);
app.get("/login", (req, res) => {
    res.render("login.ejs");
});
const _reguser = require("./authenticate").reguser;
app.post("/logggedin", _reguser, (req, res) => {
    res.redirect("/");
});
app.get("/logggedin", _authenticate, (req, res) => {
    // gfs.remove({ _id: "627fd2766470e8bc0c8ecd9b",root:"uploads" }, (err,data) => {});
    res.send("babaolowo");
});
app.get("/logout", _authenticate, (req, res) => {
    res.clearCookie("oblivion");
    // gfs.remove({ _id: "627fd2766470e8bc0c8ecd9b",root:"uploads" }, (err,data) => {});
    res.redirect("/");
});
app.get("/dashboard", _authenticate, (req, res) => {
    res.render("dashboard.ejs", { loggedin: false, transactions: false, err: false });
});
app.get("/fund-account", _authenticate, (req, res) => {
    res.render("populating.ejs", { url: "/fund-account_" });
});
app.get("/withdraw", _authenticate, (req, res) => {
    res.render("populating.ejs", { url: "/withdraw_" });
});
app.post("/fund-account_", _authenticate, _withdrawandfund, (req, res) => {
    res.render("err.ejs", { err: req.err });
});
app.post("/withdraw_", _authenticate, _withdrawandfund, (req, res) => {
    console.log(req.transactions, "llllll");
    res.render("err.ejs", { err: req.err });
});
app.get("/viewtransactions", _authenticate, _transaction);
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        // await  _conectdb
        // await connect
        // console.log(mongoose.connection)
        //     const mongoose = require("mongoose")
        // const taskschema = new mongoose.Schema({
        //     NAME:{
        //         type:String,
        //         required:[true,"must provide names"],
        //         trim:true,
        //         maxlength:[20,"name cannot be more than characters"]
        //     },
        //     completed:{
        //       type:Boolean ,
        //       required:[true,"must provide completed"],
        //     }
        // })
        // let bbb =new  mongoose.model("task",taskschema)
        // let bb =await  bbb.create({
        //   "NAME":"hello",
        //  "completed":true
        // })
        // let gg = await bb.save(
        // )
        // console.log(bb,gg)
        app.listen(3000);
        ;
    });
}
start();
