/**
 * Created by Laptop on 2016-07-20.
 */

$(document).ready(function () {

    $(".tile1Index").fadeIn().animate({left: '54%', opacity: '1'}, {duration: 1200, queue: false});
    setTimeout(function () {
        $(".tile11Index").fadeIn().animate({left: '9%', opacity: '1'}, {duration: 900, queue: false});
    }, 1000);
    setTimeout(function () {
        $(".tile2Index").fadeIn().animate({right: '37%', opacity: '1'},{duration: 900, queue: false});
    }, 2300);




});