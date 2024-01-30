/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var base_uri;
if (window.location.host == "rsparu.kentoes.com") {
    base_uri = window.location.origin + "/";
} else {
    base_uri = window.location.origin + "/rsparu/";
}

var $socket;
$(function () {
    $socket = io.connect(window.location.origin + ":3000");

    $socket.on('data panggil', function (data) {
        play_audio(data.urut, data.loket);
    });
});

function upd_data(noAntri, loket, panggil) {
    $.getJSON(base_uri + "API/panggil/tmp/updTmp/noAntri/" + noAntri + "/loket/" + loket + "/panggil/" + panggil, function (json) {});
}

function play_audio(nomor, loket) {
    var teks = "nomor antrian " + nomor + ", di-loket " + loket;
	$('#nomer').html(teks);
    $.get(window.location.origin + '/auahgelap/getvoice.php?teks=' + teks, function (data) {
    }).always(function (data) {
        play_suara(data, nomor, loket);
    }, "json");
}

function play_suara(str, nomor, loket) {
    var audioBell = new Audio(base_uri + 'asset/sound/dingdong.wav');
    var snd = new Audio(str);
    // var snd = new Audio("data:audio/wav;base64," + str);
    audioBell.play();
    audioBell.onended = function () {
        snd.play();
    }

    snd.onended = function () {
        upd_data(nomor, loket, 1);
    }
}