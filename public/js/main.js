var socket = io("http://localhost:3000");
socket.on("server-send-failure-register", function(){
    alert("Register unsuccessful! The username is exist");
})

socket.on("server-send-list-Users", function(data){
    $("#boxContent").empty();
    data.forEach(function(i){
        $("#boxContent").append(`<div class="user">` + i + `</div>`);
    })    
})

socket.on("server-send-successful-register", function(data){
    $("#currentUser").html(data);
    $("#loginForm").hide(2000);
    $("#chatForm").show(1000);
})

socket.on("server-send-message", function(data){
    $("#listMessages").append(`<div class="messages">` + data.userName + ": " + data.content + `</div>`);
})

$(document).ready(function () {
    $("#loginForm").show();
    $("#chatForm").hide();

    $("#btnRegister").click(function(){
        socket.emit("client-send-Username", $("#userName").val());
    })
    $("#btnLogout").click(function(){
        socket.emit("logout");
        $("#loginForm").show(1);
        $("#chatForm").hide(2);
    })

    $("#btnSendMessage").click(function(){
        socket.emit("user-send-message", $("#txtMessage").val());
    })
})