/*
 * Custom Function for SimRS
 */

/* 
 * global base_uri
 * global $uname
 * global $kd_poli
 * global $aliases
 * global $name
 * global $user_access
 * global socket
 * global $tensiIO
 */

let base_uri;
let bi = window.location.host.split(".");
if (bi[(bi.length) - 1] == "local" || bi[(bi.length) - 1] == "local") {
    base_uri = window.location.origin + "/";
} else {
    base_uri = window.location.origin + "/rsparu/";
}

const $uname = $('#uname').val();
const $kd_poli = $('#kd_poli').val();
const $aliases = $('#aliases').val();
const $name = $('#name').val();
const $user_access = JSON.parse($('#user_access').val());
let socket;
let $tensiIO;
let loc = window.location.host;
let _src_icon = '<i class="fa fa-spinner fa-pulse fa-2x"></i>';
let _statXhr = "";

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

isEmpty = (value) => {
    return typeof value == 'string' && !value.trim() || typeof value == 'undefined' || value === null;
};

function showKelompok(uri, idKelompok) {
    var _str = "";
    var jqXhr;

    $('#kkelompok').find('.optKelompok').remove().end();

    jqXhr = $.getJSON(uri, function (json) {
        if (json.metaData.code == 200) {
            $.each(json.response.data, function (index, t) {
                if (t.kkelompok == idKelompok) {
                    _str = _str + '<option value="' + t.kkelompok + '" class="optKelompok" selected>' + t.kelompok + '</option>';
                    $('#biaya').val(t.biaya);
                } else if (idKelompok == null && t.kkelompok == 1) {
                    _str = _str + '<option value="' + t.kkelompok + '" class="optKelompok" selected>' + t.kelompok + '</option>';
                    $('#biaya').val(t.biaya);
                } else {
                    _str = _str + '<option value="' + t.kkelompok + '" class="optKelompok">' + t.kelompok + '</option>';
                }
            });

            $('#kkelompok').append(_str);

            if ($('#kkelompok').val() == 1) {
                $('#noasuransi').attr('readonly', 'readonly');
            } else {
                $('#noasuransi').removeAttr('readonly');
            }
        }
    });
    return jqXhr;
}

function showAgama(uri, id) {
    $('#kdAgama').html(_src_icon);
    var _str = "";
    var jqXhr;
    if (id == null) {
        $('#kdAgama').find('.optAgama').remove().end();
        jqXhr = $.getJSON(uri, function (json) {
            if (json.metaData.code == 200) {
                $.each(json.response.data, function (index, t) {
                    _str = _str + '<option value="' + t.kdAgama + '" class="optAgama" >' + t.agama + '</option>';
                });
                $('#kdAgama').append(_str);

                if (id !== "") {
                    $('#kdAgama').val("1").trigger("change");
                }
            }
        });
    } else {
        $('#kdAgama').val(id).trigger("change");
    }
    return jqXhr;
}

function showPendidikan(uri, id) {
    $('#kdPendidikan').html(_src_icon);
    var _str = "";
    var jqXhr;
    $('#kdPendidikan').find('.optPendidikan').remove().end();
    jqXhr = $.getJSON(uri, function (json) {
        if (json.metaData.code == 200) {
            $.each(json.response.data, function (index, t) {
                _str = _str + '<option value="' + t.kdPend + '" class="optPendidikan" >' + t.pendidikan + '</option>';
            });
            $('#kdPendidikan').append(_str);

            if (id == "") {
                $('#kdPendidikan').val('1').trigger("change");
            }
        }
    });
    return jqXhr;
}

function showProvinsi(uri, idProv) {
    $('#fProv').html(_src_icon);
    var _str = "";
    var jqXhr;
    $('#kprovinsi').find('option').remove().end();
    jqXhr = $.getJSON(uri + "API/provinsi", function (json) {
        if (json.metaData.code == 200) {
            $.each(json.response.data, function (index, t) {
                if (t.kdProv == idProv) {
                    _str = _str + '<option value="' + t.kdProv + '" class="optProv" selected>' + t.provinsi + '</option>';
                } else {
                    _str = _str + '<option value="' + t.kdProv + '" class="optProv">' + t.provinsi + '</option>';
                }
            });
            $('#kprovinsi').append(_str);
        }
    }).fail(function () {
        $('#fProv').html("");
        showProvinsi(uri, idProv);
    }).always(function () {
        $('#fProv').html("");
    });

    return jqXhr;
}

function showKabupaten(uri, id) {
    $('#fKab').html(_src_icon);
    var _str = "";
    var kdProv = $('#kprovinsi').val();

    $('#kkabupaten').find('.optKab').remove().end();
    var jqXhr = $.getJSON(uri + "API/kabupaten/kdProv/" + kdProv, function (json) {
        if (json.metaData.code == 200) {
            $.each(json.response.data, function (index, t) {
                if (id == t.kdKab) {
                    _str = _str + '<option value="' + t.kdKab + '" class="optKab" selected>' + t.kabupaten + '</option>';
                } else {
                    _str = _str + '<option value="' + t.kdKab + '" class="optKab" >' + t.kabupaten + '</option>';
                }
            });
            $('#kkabupaten').append(_str);
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
                if (t.kdKec == id) {
                    _str = _str + '<option value="' + t.kdKec + '" class="optKec" selected>' + t.kecamatan + '</option>';
                } else {
                    _str = _str + '<option value="' + t.kdKec + '" class="optKec" >' + t.kecamatan + '</option>';
                }
            });
            $('#kkecamatan').append(_str);
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
                if (t.kdKel == id) {
                    _str = _str + '<option value="' + t.kdKel + '" class="optKel" selected>' + t.kelurahan + '</option>';
                } else {
                    _str = _str + '<option value="' + t.kdKel + '" class="optKel" >' + t.kelurahan + '</option>';
                }
            });
            $('#kkelurahan').append(_str);
        }
    }).fail(function () {
        $('#fKel').html("");
    }).always(function () {
        $('#fKel').html("");
    });
    return jqXhr;
}

function showTujuan(uri, id) {
    var _str = "";
    var jqXhr;
    $('#ktujuan').find('.optTujuan').remove().end();
    jqXhr = $.getJSON(uri, function (json) {
        if (json.metaData.code == 200) {
            $.each(json.response.data, function (index, t) {
                _str = _str + '<option value="' + t.kd_tujuan + '" class="optTujuan" >' + t.tujuan + '</option>';
            });
            $('#ktujuan').append(_str);
            $('.ktujuan').append(_str);

            $('#ktujuan').val(id).trigger('change');
        }
    });
    return jqXhr;
}

function showPetugas() {
    var _strAll = "";
    var _strPerawat = "";
    var _strDokter = "";
	var _strRO = "";
    var jqXhr = $.getJSON(base_uri + "API/Petugas/uname/" + $uname, (json) => {
        if (json.metaData.code == 200) {
            $.each(json.response.data, (index, t) => {
                //All Pegawai
                _strAll += '<option value="' + t.nip + '" class="optPetugas">' + t.gelar_d + " " + t.nama + ", " + t.gelar_b + '</option>';
                //Dokter
                if (t.kd_jab == 7 || t.kd_jab == 8 || t.kd_jab == 1) {
                    _strDokter += '<option value="' + t.nip + '" class="optPetugas">' + t.gelar_d + " " + t.nama + ", " + t.gelar_b + '</option>';
                }
                //Perawat
                if (t.kd_jab == 10) {
                    _strPerawat += '<option value="' + t.nip + '" class="optPetugas">' + t.gelar_d + " " + t.nama + ", " + t.gelar_b + '</option>';
                }
                //RO
                if (t.kd_jab == 12) {
                    _strRO += '<option value="' + t.nip + '" class="optPetugas">' + t.gelar_d + " " + t.nama + ", " + t.gelar_b + '</option>';
                }
            });
            if ($name == 'PENDAFTARAN'|| $name == 'PENDAFTARAN1'|| $name == 'PENDAFTARAN2'|| $name == 'PENDAFTARAN3') {
                $('.petugas').append(_strAll);
            } else if ($name == 'TENSI' || $name == 'TENSI TB'|| $name == 'TENSI 2') {
                $('.petugas').append(_strPerawat);
            } else if ( $name == 'POLI 1' || $name == 'POLI 2' ||$name == 'POLI 3' ||$name == 'POLI 4' ||$name == 'POLI 5' ||$name == 'POLI UMUM' || $name == 'POLI TB') {
                $('.perawat').append(_strPerawat);
                $('.dokter').append(_strDokter);
            } else if ($name == 'RONTGEN') {
                $('.petugas').append(_strRO);
            }
        }
    })
}

function showDiagnosa(kdDiag) {
    var uriDiag = "";
    var _str = "";
    if (kdDiag == null || kdDiag == "") {
        uriDiag = base_uri + "API/Diagnosa/showAll";
    }

    var jqXhr = $.getJSON(uriDiag, (json) => {
        if (json.metaData.code == 200) {
            $.each(json.response.data, (index, t) => {
                _str += '<option value="' + t.kdDiag + '" class="optDiagnosa">' + t.kdDiag + " - " + t.diagnosa + '</option>';
            });
            $('.diagnosa').append(_str);
        }
    });
}

function showFotoRontgen() {
    var _str = "";
    uriDiag = base_uri + "API/Rontgen/Foto";

    var jqXhr = $.getJSON(uriDiag, (json) => {
        if (json.metaData.code == 200) {
            $.each(json.response.data, (index, t) => {
                _str += '<option value="' + t.kdFoto + '" class="optkdFoto">' + t.nmFoto + '</option>';
            });
            $('#kdFoto').append(_str);
        }
    });
}

function showKondisiRontgen() {
    var _str = "";
    uriDiag = base_uri + "API/Rontgen/Kondisi";

    var jqXhr = $.getJSON(uriDiag, (json) => {
        if (json.metaData.code == 200) {
            $.each(json.response.data, (index, t) => {
                _str += '<option value="' + t.kdKondisiRo + '" class="optkdKondisiRo">' + t.kondisiRo + '</option>';
            });
            $('#kdKondisiRo').append(_str);
        }
    });
}

function showFilmRontgen() {
    var _str = "";
    uriDiag = base_uri + "API/Rontgen/Film";

    var jqXhr = $.getJSON(uriDiag, (json) => {
        if (json.metaData.code == 200) {
            $.each(json.response.data, (index, t) => {
                _str += '<option value="' + t.kdFilm + '" class="optkdKondisiRo">' + t.ukuranFilm + '</option>';
            });
            $('#kdFilm').append(_str);
        }
    });
}

function showMesinRontgen() {
    var _str = "";
    uriDiag = base_uri + "API/Rontgen/Mesin";

    var jqXhr = $.getJSON(uriDiag, (json) => {
        if (json.metaData.code == 200) {
            $.each(json.response.data, (index, t) => {
                _str += '<option value="' + t.kdMesin + '" class="optkdKondisiRo">' + t.nmMesin + '</option>';
            });
            $('#kdMesin').append(_str);
        }
    });
}

showMenu = () => {
    var _str = "";
    uriDiag = base_uri + "API/Menu";

    var jqXhr = $.getJSON(uriDiag, (json) => {
        if (json.metaData.code == 200) {
            $.each(json.response.data, (index, t) => {
                _str += '<option value="' + t.kd_menu + '" class="optMenu">' + t.nm_menu + '</option>';
            });
            $('#kd_menu').append(_str);
        }
    });
};

function src_umur() {
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
}

function buka_uri() {
    $('#loaderModal').modal('show');
    setTimeout(function () {
        location.replace('#' + lua());
        var curUri = window.location.hash;
        if (curUri != "") {
            curUri = curUri.replace('#', '');
        } else {
            curUri = 'Dasboard';
        }
        $.ajax({
            async: false,
            timeout: 3000,
            type: "GET",
            url: curUri,
            beforeSend: function () {

            }
        }).always(function (data) {

            $('#content').html(data);
            disable_enter();
            $('.datepicker').datepicker({
                autoclose: true,
                todayBtn: "linked",
                format: "yyyy-mm-dd"
            });
            $('#loaderModal').modal('hide');
        }).fail(function () {
            $('#loaderModal').modal('hide');
        });
    }, 100);
}

function disable_enter() {
    $('input[type=text]').on("keydown", function (e) {
        var keyCode = e.keyCode;
        if (keyCode === 13) {
            e.preventDefault();
            return false;
        }
    });
}

lua = () => {
    var curUri = window.location.hash;
    curUri = curUri.replace('#', '');
    var splt = curUri.split("/");
    var mn = "";
    if (splt[0] != "Report") {
        mn = $user_access.list[0].nm_menu;
        if (curUri != "") {
            $.each($user_access.list, (i, v) => {
                if (curUri == v.uname) {
                    mn = v.nm_menu;
                }
            });
        } else {
            mn = '';
        }
    } else {
        mn = curUri;
    }

    return mn;
};

$(document).ready(function () {
    buka_uri();
});