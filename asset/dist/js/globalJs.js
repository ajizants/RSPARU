/*
 * Custom Function for SimRS
 */
//var _str = "";
var _src_icon = '<i class="fa fa-spinner fa-pulse fa-2x"></i>';
var _statXhr = "";

//Auto Select
function autoSelect(id, val) {
    $('select#' + id + ' option').each(function () {
        this.selected = (this.value == val);
    });
}

function autoSelectLike(id, val) {
    var ids = "";
//    console.log(val);
    $('select#' + id + ' option').each(function () {
        var rg = new RegExp(val, "gi");
        this.selected = (this.text.match(rg));
    });
    return $('#' + id).val();
}
//End Auto Select

//GET OPTION TEXT
function getOptText(id) {
    var str = "";
    $('#' + id + ' option:selected').each(function () {
        str = $(this).text();
    });
    return str;
}
//GET OPTION TEXT

//to Uppercase text
function toUpper(id) {
    var str = $('#' + id).val();
    str = str.toUpperCase();
    str = str.replace("'", "`");
    str = str.replace('"', '`');
    return $('#' + id).val(str);
}
//to Uppercase

//to Uppercase textarea
function toUpperTextarea(id) {
    var str = $('#'.id).val();
    str = str.toUpperCase();
    str = str.replace("'", "`");
    str = str.replace('"', '`');
    return $('#'.id).html(str);
}
//to Uppercase

//Kill Enter
$(document).ready(function () {
    $('form').bind("keypress", function (e) {
        if (e.keyCode == 13) {
            if (e.target.nodeName == 'INPUT' && e.target.type == 'text') {
                e.preventDefault();
                return false;
            }
        }
    });
});
//End Kill Enter

function tgl_sekarang() {
    var mydate = new Date();
    var tahun = mydate.getFullYear();
    var bulan = mydate.getMonth();
    bulan = bulan + 1;
    if (bulan < 10) {
        bulan = "0" + bulan;
    }
    var tgl = mydate.getDate();
    if (tgl < 10) {
        tgl = "0" + tgl;
    }
    var tglnya = tahun + "-" + bulan + "-" + tgl;

    return tglnya;
}

function jam_sekarang() {
    var mydate = new Date();
    var jam = mydate.getHours();
    var menit = mydate.getMinutes();
    //var detik=mydate.getSeconds();
    var detik = 1;

    if (jam.toString().length == 1) {
        jam = "0" + jam;
    }
    if (menit.toString().length == 1) {
        menit = "0" + menit;
    }
    if (detik.toString().length == 1) {
        detik = "0" + detik;
    }

    var jamnya = jam + ":" + menit + ":" + detik;

    return jamnya;
}

function showKelompok(uri, idKelompok) {
    var _str = "";
    $('#kkelompok').find('.optKelompok').remove().end();
    var jqXhr = $.getJSON(uri, function (json) {
        if (json.metaData.code == 200) {
            $.each(json.response.data, function (index, t) {
                if (t.kkelompok == idKelompok) {
                    _str = _str + '<option value="' + t.kkelompok + '" class="optKelompok" selected>' + t.kelompok + '</option>';
                    $('#biaya').val(t.biaya);
                } else {
                    _str = _str + '<option value="' + t.kkelompok + '" class="optKelompok">' + t.kelompok + '</option>';
                }
            });

            $('#kkelompok').append(_str);
//            $('#kkelompok').select2();

            if (idKelompok != "") {
//                $('#kkelompok').val(idKelompok).trigger("change");
                if (idKelompok == 1) {
                    $('#noasuransi').attr('readonly', 'readonly');
                } else {
                    $('#noasuransi').removeAttr('readonly');
                }
            } else {
                $('#kkelompok').val('1').trigger("change");
            }
        }
    })

    return jqXhr;
}

function showAgama(uri, id) {
    $('#kdAgama').html(_src_icon);
    var _str = "";
    $('#kdAgama').find('.optAgama').remove().end();
    var jqXhr = $.getJSON(uri, function (json) {
        if (json.metaData.code == 200) {
            $.each(json.response.data, function (index, t) {
                _str = _str + '<option value="' + t.kdAgama + '" class="optAgama" >' + t.agama + '</option>';
            });

            $('#kdAgama').append(_str);
//            $('#kdAgama').select2();

            if (id !== "") {
                $('#kdAgama').val(id).trigger("change");
            }
        }
    });
    return jqXhr;
}

function showPendidikan(uri, id) {
    $('#kdPendidikan').html(_src_icon);
    var _str = "";
    $('#kdPendidikan').find('.optPendidikan').remove().end();
    var jqXhr = $.getJSON(uri, function (json) {
        if (json.metaData.code == 200) {
            $.each(json.response.data, function (index, t) {
                _str = _str + '<option value="' + t.kdPend + '" class="optPendidikan" >' + t.pendidikan + '</option>';
            });

            $('#kdPendidikan').append(_str);
//            $('#kdAgama').select2();

            if (id !== "") {
                $('#kdPendidikan').val(id).trigger("change");
            }
        }
    });
    return jqXhr;
}

function showProvinsi(uri, idProv) {
    $('#fProv').html(_src_icon);
    var _str = "";
    $('#kprovinsi').find('option').remove().end();
    $.getJSON(uri + "API/provinsi", function (json) {
        if (json.metaData.code == 200) {
            $.each(json.response.data, function (index, t) {
                _str = _str + '<option value="' + t.kdProv + '" class="optProv">' + t.provinsi + '</option>';
            });

            $('#kprovinsi').append(_str);
            $('#kprovinsi').select2();

            if (idProv !== "") {
                $('#kprovinsi').val(idProv).trigger("change");
            } else {
                $('#kprovinsi').val('33').trigger("change");
            }
        } else {
//            alert(json.metaData.message);
        }
    }).fail(function () {
        $('#fProv').html("");
        showProvinsi(uri, idProv);
    }).always(function () {
        $('#fProv').html("");
    });
}

function showKabupaten(uri, id) {
    $('#fKab').html(_src_icon);
    var _str = "";
    var kdProv = $('#kprovinsi').val();
    $('#kkabupaten').find('.optKab').remove().end();
    var jqXhr = $.getJSON(uri + "API/kabupaten/kdProv/" + kdProv, function (json) {
        if (json.metaData.code == 200) {
            $.each(json.response.data, function (index, t) {
                _str = _str + '<option value="' + t.kdKab + '" class="optKab" >' + t.kabupaten + '</option>';
            });

            $('#kkabupaten').append(_str);
            $('#kkabupaten').select2();

            if (id !== "") {
                $('#kkabupaten').val(id).trigger("change");
            }
        } else {
//            alert(json.metaData.message);
        }
    }).fail(function () {
        $('#fKab').html("");
    }).always(function () {
        $('#fKab').html("");
    });

    return jqXhr;
}

function showKecamatan(uri, kdKab, id) {
    $('#fKec').html(_src_icon);
    var _str = "";
    $('#kkecamatan').find('.optKec').remove().end();
    var jqXhr = $.getJSON(uri + "API/kecamatan/kdKab/" + kdKab, function (json) {
        if (json.metaData.code == 200) {
            $.each(json.response.data, function (index, t) {
                _str = _str + '<option value="' + t.kdKec + '" class="optKec" >' + t.kecamatan + '</option>';
            });

            $('#kkecamatan').append(_str);
            $('#kkecamatan').select2();

            if (id !== "") {
                $('#kkecamatan').val(id).trigger("change");
            }
        } else {
//            alert(json.metaData.message);
        }

    }).fail(function () {
        $('#fKec').html("");
    }).always(function () {
        $('#fKec').html("");
    });

    return jqXhr;
}

function showKelurahan(uri, kdKec, id) {
    $('#fKel').html(_src_icon);
    var _str = "";
    $('#kkelurahan').find('.optKel').remove().end();
    var jqXhr = $.getJSON(uri + "API/kelurahan/kdKec/" + kdKec, function (json) {
        if (json.metaData.code == 200) {
            $.each(json.response.data, function (index, t) {
                _str = _str + '<option value="' + t.kdKel + '" class="optKel" >' + t.kelurahan + '</option>';
            });

            $('#kkelurahan').append(_str);
            $('#kkelurahan').select2();

            if (id !== "") {
                $('#kkelurahan').val(id).trigger("change");
            }
        } else {
//            alert(json.metaData.message);
        }

    }).fail(function () {
        $('#fKel').html("");
    }).always(function () {
        $('#fKel').html("");
    });

    return jqXhr;
}

function src_umur() {
    /*    var tahun = $('#tahun').val();
     var bulan = $('#bulan').val();
     var hari = $('#hari').val();
     if (tahun != '' && bulan != '' && hari != '') {*/
//    $('#ttgllahir').val();
    //cari umur
    var dob = new Date($('#tgllahir').val());
    var today = new Date();
    if ($('#ttgllahir').val() != "") {
        var umurBulan;
        var umurHari;
        var lahir = new Date($('#tgllahir').val());
        var today = new Date();
        //1tahun dalam ms
        var oneth = 365.25 * 24 * 60 * 60 * 1000;
        //1bulan dalam ms
        var onebl = 30.43 * 24 * 60 * 60 * 1000;
        //1hari dalam ms
        var onehr = 24 * 60 * 60 * 1000;
        //umur dalam ms
        var selisih = today - lahir;
        //Umur Tahun
        var umurTh = Math.floor(selisih / oneth);
        var umutThInms = umurTh * oneth;
        //Umur Bulan dalam Ms
        var selisihBulan = selisih - umutThInms;
        //Umur Bulan
        var umurBl = Math.floor(selisihBulan / onebl);
        var umurBlInms = umurBl * onebl;
        //Umur Hari dalam ms
        var selisihHr = selisihBulan - umurBlInms;
        //Umur Hari
        var umurHr = Math.floor(selisihHr / onehr);
        $('#umurthn').val(umurTh);
        $('#umurbln').val(umurBl);
        $('#umurhr').val(umurHr);
    }
//    }
}

function cek_umur() {
    if ($('#umurbln').val() > 12) {
        alert('Umur Bulan tidak boleh lebih dari 12!');
        return false;
    } else if ($('#umurhr').val() > 31) {
        alert('Umur Hari tidak boleh lebih dari 31');
        return false;
    } else {
        return true;
    }
}
//}));

function upd_data(base_url, noAntri, loket, panggil) {
    $.getJSON(base_url + "API/panggil/tmp/updTmp/noAntri/" + noAntri + "/loket/" + loket + "/panggil/" + panggil, function (json) {
        console.log(json.metaData.code);
    });
}

function lewati(base_url, noAntri, tanggal) {
    $.getJSON(base_url + "API/panggil/tmp/lewati/" + noAntri + "/tanggal/" + tanggal, function (json) {
        $('#ulangBtn').removeAttr("onClick");
        $('#lewatiBtn').removeAttr("onClick");
        $("#nourut").val("");
    });
}