var base_uri = window.location.origin + "/antrian/";

function reset_form() {
    $('#frm')[0].reset();
	
    $('#kkecamatan').val('').trigger("change");
    $('#kkabupaten').val('').trigger("change");
	
	var sKelompok = showKelompok(base_uri + "API/kelompok", "");
	sKelompok.always(function () {
		var sAgama = showAgama(base_uri + "API/Agama", "");
		sAgama.always(function () {
			var sPendidikan = showPendidikan(base_uri + "API/Pendidikan", "");
			sPendidikan.always(function () {
				showProvinsi(base_uri, "");
			});
		});
	});
		
    $('#status').val('BK').trigger("change");
    $('#bt_grup').hide();
    $('#rst').show();
}

function genNoRm() {
    var url = base_uri + "API/daftar/generateNoRm";
    $.getJSON(url, function (json) {
        if (json.metaData.code == 200) {
            $('#norm').val(json.response.norm);
            $('#normd').val(json.response.normd);
            $('#normb').val(json.response.normb);
        }
    });
}

function findData(val) {
    $('#' + val.replace('.', '')).css("background-color", "blue");
    $('#' + val.replace('.', '')).css("color", "white");
    var b = val.split("_");
    var uri = "";
//        console.log(b[0]);
    if (b[0] == "rmlama") {
        uri = base_uri + 'API/daftar/pasien/old/norm';
    } else {
        uri = base_uri + 'API/daftar/pasien/new/norm';
    }

    if (b[0] == "rmlama" || b[0] == "norm") {
        console.log('norm');
        $.post(uri, {norm: b[1]}, function (json) {
            if (json.metaData.code == 200) {
                set_form(b[0], json.response.data[0], "");
            }
        }, "json");
    } else {
        console.log("!rmlama || !norm");
        $.post(uri, {norm: val}, function (json) {
            if (json.metaData.code == 200) {
                set_form("", json.response.data[0], "cetak");
            }
        }, "json");
    }
}

function set_form(tag, data, cetak) {
    var uri = base_uri;
    $('#norm').val(data.norm);
    $('#rmlama').val(data.rmlama);
    autoSelect('kkelompok', data.kkelompok);
    $('#kkelompok').trigger("change");
    if (cetak == "cetak") {
        autoSelect('kkunjungan', 'B');
    } else {
        autoSelect('kkunjungan', 'L');
    }
    $('#noasuransi').val(data.noasuransi);
    $('#noktp').val(data.noktp);
    $('#nama').val(data.nama);
    $('#alamat').val(data.alamat);
    if (tag == "rmlama") {
        autoSelectLike("kkabupaten", data.kkabupaten);
        var sKab = showKabupaten(uri, $('#kkabupaten').val());
        sKab.always(function () {
            setTimeout(function () {
                autoSelectLike('kkecamatan', data.kkecamatan);
                var sKec = showKecamatan(uri, $('#kkabupaten').val(), $('#kkecamatan').val());
                sKec.always(function () {
                    setTimeout(function () {
                        autoSelectLike('kkelurahan', data.kkelurahan);
                        $('#kkelurahan').select2().trigger('change');
                    }, 1000);
                });
            }, 1000);
        });
    } else {
//            console.log(data.kkabupaten);
        var sKab = showKabupaten(uri, data.kkabupaten);
        sKab.always(function () {
            var sKec = showKecamatan(uri, data.kkabupaten, data.kkecamatan);
            sKec.always(function () {
                var sKel = showKelurahan(uri, data.kkecamatan, data.kkelurahan);
            });
        });
    }
    $('#rtrw').val(data.rtrw);
    autoSelect('jeniskel', data.jeniskel);
    $('#kdAgama').select2().val(data.kdAgama).trigger("change");
    $('#kdPendidikan').val(data.kdPendidikan).trigger("change");
    $('#nohp').val(data.nohp);
    $('#tmptlahir').val(data.tmptlahir);
    $('#tgllahir').val(data.tgllahir);
    src_umur();
    $('#status').val(data.status).trigger('change');
    $('#pekerjaan').val(data.pekerjaan);
    $('#pjwb').val(data.pjwb);
    $('#sts_pasien').val(1);
    $('#bt_grup').show();
    $('#rst').hide();
}

$(document).ready(function () {
//    $('#rmlama').bind("keypress", function (e) {
//        if (e.keyCode == 13) {
//
//        }
//    });
});