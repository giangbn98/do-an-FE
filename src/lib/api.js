//
// const HOST = "http://localhost:9090"
//
// function call(method, url, body, loading) {
//     return new Promise((resolve) => {
//         fetch(HOST + url,{
//             method : method,
//             headers :{
//                 "Content-Type": "application/json",
//                 // Authorization: "Bearer " + app.local.token,
//                 "Access-Control-Allow-Origin": "*",
//             },
//             body: JSON.stringify(body)
//         }).then((res) => {
//             return res.json();
//         })
//     }))
// }
//
// export default call
import {app} from "@/lib/app";
// const HOST = "localhost:8080"

const HOST = "https://gb-app.herokuapp.com"

function callAPI(method, url, body) {
     return new Promise((resolve) => {
         fetch(HOST+ url, {
             method: method,
             headers: {
                 "Content-Type": "application/json",
                 Authorization : "Bearer " + localStorage.getItem("gbapp"),
                 "Access-Control-Allow-Origin": "*",
             },
             body: method == "POST" ? JSON.stringify(body) : undefined,
         })
             .then((res) => {
                 return res.json();
             })
             .then((res) => {
                 if(res.status == "success"){
                     resolve(res);
                     return;
                 }
                 if (res.status == 500 || res.status == 400){
                     app.vue.$message({
                         showClose: true,
                         message: "Có lỗi xảy ra",
                         type: "error"
                     });
                     return;
                 }

                 if (res.status == 403){
                     app.vue.$router.push("/login");
                     return;
                 }

                 app.vue.$message({
                     showClose: true,
                     message: res.message || res.error.message,
                     type: "error"
                 });
                 resolve(undefined);
             })
             .catch((err) => {
                 console.log(err)
                 app.vue.$message({
                     showClose: true,
                     message: err.message,
                     type: "error",
                 });
                 resolve(undefined);
             });
     });
}

async function me() {
    // var res = await fetch(HOST+ "/api/auth",{
    //     method: "GET",
    //     headers:{
    //         "Content-Type" : "application/json",
    //         Authorization: "Bearer " + localStorage.getItem("gbapp"),
    //         "Access-Control-Allow-Origin": "*",
    //     }
    // });

    return new Promise((resolve) => {
        fetch(HOST+ "/api/auth",{
            method: "GET",
            headers:{
                "Content-Type" : "application/json",
                Authorization: "Bearer " + localStorage.getItem("gbapp"),
                "Access-Control-Allow-Origin": "*",
            }
        })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if(res.status == "success"){
                    resolve(res);
                    return;
                }
                resolve(undefined);
                window.location.href = "/login";
            })
            .catch((err) => {
                resolve(err);
            });
    })

}

function uploadFile(url,fileList) {
    var formData = new FormData();
    for (var index in fileList) formData.append("files",fileList[index]);
    return new Promise((resolve) => {
        fetch(HOST+ url,{
            method: "POST",
            headers:{
                Authorization: "Bearer " + localStorage.getItem("gbapp"),
            },
            body: formData,
        }).then((res) => {
            res.json();
        }).then((res) =>{
            if (res.status == "success"){
                resolve(res);
                return;
            }
        })
    })

}


export var api = {
    callAPI,
    me,
    uploadFile
}