var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

var users = ["AAA"];

io.on("connection", function(socket){
    console.log("A new user has been logged in: " + socket.id);
    
    socket.on("client-send-Username", function(data){
        if(users.indexOf(data) >= 0){
            socket.emit("server-send-failure-register");
        }else{
            users.push(data);
            socket.Username = data;
            socket.emit("server-send-successful-register", data);
            io.sockets.emit("server-send-list-Users", users);
        }
    })
    socket.on("logout", function(){
        users.splice(
            users.indexOf(socket.Username), 1
        );
        socket.broadcast.emit("server-send-list-Users", usres);
    })

    socket.on("user-send-message", function (data){
        io.sockets.emit("server-send-message", {userName: socket.Username, content: data});
    })
})

app.get("/", function(req, res){
    res.render("Home");
})