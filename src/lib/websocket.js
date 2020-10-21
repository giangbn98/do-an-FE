import StockJS from "sockjs-client"
import Stomp from "webstomp-client"
import {app} from "@/lib/app";
import {eventBus} from "@/main";

var stompClient = null;
var connecting = false;
var notification = null;
var connect = function () {
    connecting = true;
    var socket = new StockJS("http://localhost:9090/websocket");
    stompClient = Stomp.over(socket);

    stompClient.debug = () => {};

    stompClient.connect({},
        frame => {
            console.log(frame);
            stompClient.subscribe("/queue/notification/" + app.user.id, tick => {
                console.log(JSON.parse(tick.body));
                notification = JSON.parse(tick.body);
                eventBus.$emit('notification', JSON.parse(tick.body));
            })
        });
    console.log(notification);
};

const disconnect = function() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
};

const isConnected = function() {
    return (stompClient !== null && stompClient.status === 'CONNECTED')
};

const requestConnect = function() {
    // if(!isConnected()) {
    //     if(!connecting) {
    //         connect(callback);
    //     }else {
    //         //connect affter 1s
    //         setTimeout(() => {
    //             requestConnect(callback);
    //         }, 1000);
    //     }
    // }
    // else {
    //     callback(stompClient);
    // }
    if (!isConnected()){
        if (!connecting){
            connect();
        }else {
            setTimeout(() => {
                requestConnect();
            },1000);
        }
    }
};

export default {connect, disconnect, isConnected, requestConnect}