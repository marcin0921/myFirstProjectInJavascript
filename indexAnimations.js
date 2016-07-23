/**
 * Created by Laptop on 2016-07-20.
 */

$(document).ready(function () {
    

    $(".tile1Index").fadeIn().animate({opacity: '1'}, {duration: 1500, queue: false});
    setTimeout(function () {
        $(".tile11Index").fadeIn().animate({opacity: '1'}, {duration: 1500, queue: false});
    }, 1000);
    setTimeout(function () {
        $(".tile2Index").fadeIn().animate({opacity: '1'},{duration: 1500, queue: false});
    }, 2000);




});

