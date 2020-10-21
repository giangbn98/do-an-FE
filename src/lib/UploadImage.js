var init = function () {
    let anh4Script = document.createElement("script");
    anh4Script.setAttribute("id","anh-script");
    anh4Script.setAttribute("src","demo.chevereto.com/sdk/pup.js");
    anh4Script.setAttribute("data-url","https://demo.chevereto.com/upload");
    anh4Script.async = true;
    document.head.appendChild(anh4Script);

}

export default {init};