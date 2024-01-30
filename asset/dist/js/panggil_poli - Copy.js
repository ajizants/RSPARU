/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var base_uri;
if (window.location.host == "rsparu.kentoes.com") {
    base_uri = window.location.origin + "/";
}
else {
    base_uri = window.location.origin + "/rsparu/";
}

function get_data() {
    $('h2#sts').html("Mesin Pemanggil Antrian Berjalan");
    $.getJSON(base_uri + "API/panggil/tmp/loket", function (json) {
        if (json.metaData.code == 200) {
            $.each(json.response.data, function (index, t) {
                $('#nomer').html(t.noAntri);
                play_audio(t.noAntri, t.loket);
            });
        } else {
            setTimeout(function () {
                get_data();
            }, 1000);
        }
    }).fail(function () {
        get_data();
    });
}

function upd_data(noAntri, loket, panggil) {
    $.getJSON(base_uri + "API/panggil/tmp/updTmp/noAntri/" + noAntri + "/loket/" + loket + "/panggil/" + panggil, function (json) {
        console.log(json.metaData.code);
		if(json.metaData.code==201){
			setTimeout(function () {
				//console.log("nyahaha");
				get_data();
			}, 1000);
		}
    });
}

function panggilUlang() {
    $('#panggil').removeAttr('disabled');
    //console.log("Panggil Ulang");
    var alpha = "";
    var nomor = 0;
    var sisa = 0;
    var url = base_uri + "API/Antree/GET/Kategori/{kdKategori}/Action/recall/Loket/{noLoket}";
    $.getJSON(url, function (json) {
        //console.log(json);
        if (json.metaData.code == 200) {
            $.each(json.response.message, function (index, t) {
                alpha = t.alpha;
                nomor = t.noUrut;
            });
            sisa = json.response.sisa;
            console.log(json.response.sisa);
            $('#nomorAntrian').html(alpha + nomor);
            $('#sisaAntrian').html("Sisa : " + sisa);
            play_audio(nomor);
        }
    }, "json");
}

function play_audio(nomor, loket) {
    var audioBell = new Audio(base_uri + 'asset/sound/dingdong.wav');
    var audioUrut = new Audio(base_uri + 'asset/sound/nomor_antrian.mp3');
    var audioLoket = new Audio(base_uri + 'asset/sound/di_loket.wav');
    var audioNomorLoket = new Audio(base_uri + 'asset/sound/' + loket + '.wav');
	

    if (nomor <= 11 || nomor == 100) {
		nomor=parseInt(nomor);
		console.log(nomor);
		console.log(base_uri + 'asset/sound/' + nomor + '.wav');
        var audioNomorDepan = new Audio(base_uri + 'asset/sound/' + nomor + '.wav');
        audioBell.play();
        audioBell.onended = function () {
            audioUrut.play();
        }

        audioUrut.onended = function () {
            audioNomorDepan.play();
        }

       // audioUrut.onended = function () {
           // audioNomor.play();
       // }

        audioNomorDepan.onended = function () {
            audioLoket.play();
        }

        audioLoket.onended = function () {
            audioNomorLoket.play();
            upd_data(nomor, loket, 1);
        }
    }

    if (nomor > 11 && nomor < 20) {
		n_nomor=parseInt(nomor)-10;
        n_nomor = n_nomor.toString();
        var audioNomor = new Audio(base_uri + 'asset/sound/' + n_nomor + '.wav');
        var audioNomorBelas = new Audio(base_uri + 'asset/sound/belas.wav');

        audioBell.play();
        audioBell.onended = function () {
            audioUrut.play();
        }

        audioUrut.onended = function () {
            audioNomor.play();
        }

//        audioAlphaLoket.onended = function () {
//            audioNomor.play();
//        }

        audioNomor.onended = function () {
            audioNomorBelas.play();
        }

        audioNomorBelas.onended = function () {
            audioLoket.play();
        }

        audioLoket.onended = function () {
            audioNomorLoket.play();
            upd_data(nomor, loket, 1);
        }
    }

    if (nomor >= 20 && nomor < 100) {
        var str = nomor.toString();
        var xplode = str.split('');
        var str1 = parseInt(xplode[0]);
        var str2 = parseInt(xplode[1]);

//            console.log(str);

        var audioNomorDepan = new Audio(base_uri + 'asset/sound/' + str1 + '.wav');
        var audioNomorPuluh = new Audio(base_uri + 'asset/sound/puluh.wav');

        audioBell.play();
        audioBell.onended = function () {
            audioUrut.play();
        }

        audioUrut.onended = function () {
            audioNomorDepan.play();
        }

//        audioAlphaLoket.onended = function () {
//            audioNomorDepan.play();
//        }

        audioNomorDepan.onended = function () {
            audioNomorPuluh.play();
        }

        if (str2 > 0) {
            var audioNomorBelakang = new Audio(base_uri + 'asset/sound/' + str2 + '.wav');

            audioNomorPuluh.onended = function () {
                audioNomorBelakang.play();
            }

            audioNomorBelakang.onended = function () {
                audioLoket.play();
            }
        } else {
            audioNomorPuluh.onended = function () {
                audioLoket.play();
            }

        }

        audioLoket.onended = function () {
            audioNomorLoket.play();
            upd_data(nomor, loket, 1);
        }
    }

    if (nomor > 100) {
        var str = nomor.toString();
        var xplode = str.split('');
        var str1 = parseInt(xplode[0]);
        var str23 = parseInt(xplode[1] + "" + xplode[2]);
        var str2 = parseInt(xplode[1]);
        var str3 = parseInt(xplode[2]);

        console.log(str23);

        var audioNomorRatus = new Audio(base_uri + 'asset/sound/ratus.wav');
        //var audioNomorTengah = new Audio(base_uri+'asset/sound/' + str2 + '.wav');

        if (str1 > 1) { //lebih dari seratus
            var audioNomorDepan = new Audio(base_uri + 'asset/sound/' + str1 + '.wav');
        } else { //tepat seratus
            var audioNomorDepan = new Audio(base_uri + 'asset/sound/100.wav');
        }

        if (str23 > 0 && str23 <= 11) { //kurang dari 111
            var audioNomorBelakang = new Audio(base_uri + 'asset/sound/' + str23 + '.wav');
        } else if (str23 > 11 && str23 < 20) { //seratus belasan
            var audioNomorBelakang1 = new Audio(base_uri + 'asset/sound/' + str3 + '.wav');
            var audioNomorBelakang = new Audio(base_uri + 'asset/sound/belas.wav');
        } else {
            if (str3 > 0) {
                var audioNomorBelakang1 = new Audio(base_uri + 'asset/sound/' + str2 + '.wav');
                var audioNomorBelakang2 = new Audio(base_uri + 'asset/sound/puluh.wav');
                var audioNomorBelakang = new Audio(base_uri + 'asset/sound/' + str3 + '.wav');
            } else {
                var audioNomorBelakang1 = new Audio(base_uri + 'asset/sound/' + str2 + '.wav');
                var audioNomorBelakang = new Audio(base_uri + 'asset/sound/puluh.wav');
            }
        }

        audioBell.play();
        audioBell.onended = function () {
            audioUrut.play();
        }

        audioUrut.onended = function () {
            audioNomorDepan.play();
        }

//        audioAlphaLoket.onended = function () {
//            audioNomorDepan.play();
//        }
        if (str23 > 0 && str23 <= 11) { //kurang dari 111
            audioNomorDepan.onended = function () {
                audioNomorBelakang.play();
            }
        } else if (str23 > 11 && str23 < 20) { //seratus belasan
            audioNomorDepan.onended = function () {
                audioNomorBelakang1.play();
            }

            audioNomorBelakang1.onended = function () {
                audioNomorBelakang.play();
            }
        } else {
            if (str3 > 0) {
                audioNomorDepan.onended = function () {
                    audioNomorBelakang1.play();
                }

                audioNomorBelakang1.onended = function () {
                    audioNomorBelakang2.play();
                }

                audioNomorBelakang2.onended = function () {
                    audioNomorBelakang.play();
                }
            } else {
                audioNomorDepan.onended = function () {
                    audioNomorBelakang1.play();
                }

                audioNomorBelakang1.onended = function () {
                    audioNomorBelakang.play();
                }
            }
        }

        audioNomorBelakang.onended = function () {
            audioLoket.play();
        }

        audioLoket.onended = function () {
            audioNomorLoket.play();
            upd_data(nomor, loket, 1);
        }
    }
}