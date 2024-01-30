/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
let base_uri;
if (window.location.host == "dev-rsparu.kentoes.com") {
    base_uri = "http://dev-rsparu.kentoes.com/";
}
else {
    base_uri = window.location.origin + "/rsparu/";
}

let $socket;
$(function () {
    $socket = io.connect(window.location.origin + ":3001");

    $socket.on('data panggil', function (data) {
	  play_audio(data.urut, data.loket);
    });
});

function upd_data(noAntri, loket, panggil) {
    $.getJSON(base_uri + "API/panggil/tmp/updTmp/noAntri/" + noAntri + "/loket/" + loket + "/panggil/" + panggil, function (json) {});
}

function play_audio(nomor, loket) {
    let uri_suara, loc;
    let teks = "nomor antrian " + nomor + ", di-loket " + loket;
    $('#nomer').html(teks);
    loc = window.location.host;
    // if (loc === 'dev-rsparu.kentoes.com') {
	  // uri_suara = 'http://bkpm.kentoes.com';
    // }
    // else {
	  uri_suara = 'http://'+loc + '/auahgelap/getvoice.php?teks=';
    // }
	console.log(teks);
    $.get(uri_suara  + teks.toLowerCase(), function (data) {
    }).always(function (data) {
	  play_suara(data, nomor, loket);
    }, "json");
}

function play_suara(str, nomor, loket) {
    let audioBell = new Audio(base_uri + 'asset/sound/dingdong.wav');
    let snd = new Audio(str);
    // let snd = new Audio("data:audio/wav;base64," + str);
    audioBell.play();
    audioBell.onended = function () {
	  snd.play();
    }

    snd.onended = function () {
	  upd_data(nomor, loket, 1);
    }
}