/**
 * Created by Laptop on 2016-07-20.
 */

$(document).ready(function () {

    $(".tile1Index").fadeIn().animate({left: '241px', opacity: '1'}, {duration: 1000, queue: false});
    setTimeout(function () {
        $(".tile11Index").fadeIn().animate({left: '495px', opacity: '1'}, {duration: 1300, queue: false});
    }, 1000);
    setTimeout(function () {
        $(".tile2Index").fadeIn().animate({right: '181px', opacity: '1'},{duration: 900, queue: false});
    }, 2300);




});