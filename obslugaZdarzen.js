

window.onload = init;


function init() {

    var images = document.getElementsByTagName("img");
    for (var i = 0; i < images.length; i++) {
        images[i].onmouseover = changeImgSrc;
        images[i].onmouseout = changeImgtoOrg;
    }


}


function changeImgSrc (eventObj) {

    var image = eventObj.target;
    var name = image.id;
    name = name + ".jpg";
    image.src = "imgObslugaZdarzen/" + name;
}

function changeImgtoOrg(eventObj) {
    var image = eventObj.target;
    var name = image.id;
    name = name + "blur.jpg";
    image.src = "imgObslugaZdarzen/" + name;
}

    // Po 3 sek zmiana z powrotem na zdjecie oryginalne
    /* setTimeout(changeToOrgImg, 3000, image);
    function changeToOrgImg (image) {
        var name = image.id;
        name = image.id + "blur.jpg";
        image.src = "imgObslugaZdarzen/" + name;
    }
*/



