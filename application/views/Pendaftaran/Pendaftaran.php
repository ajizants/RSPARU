<style>
    .form-control:focus,
    .select2-container *:focus {
        border-color: #FF0000;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(255, 0, 0, 0.6);
    }
</style>

<section class="content-header">
    <h1>
        Dashboard
        <small>Control panel</small>
    </h1>
    <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active">Dashboard</li>
    </ol>
</section>
<div class="content">
    <div class="row">
        <div class="col-md-6 border pt-3 pb-3" style="padding-right: 5px; padding-left: 15px;">
            <div class="box box-warning">
                {FormInput}
            </div>
        </div>

        <div class="col-md-6 border pt-3 pb-3" style="padding-right: 5px; padding-left: 15px;">
            <div class="box box-primary">
                {FormCari}
            </div>

            <div class="box box-primary">
                <div class="box box-header">
                    <h3 class="box-title">Riwayat Kunjungan Pasien</h3>
                </div>
                {FormRiwayatKunj}
            </div>
        </div>
    </div>
</div>

<!--Modal-->
<div class="modal fade" id="displayModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <table class="table bordered striped" id="lAntri">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Kelompok</th>
                            <th>Loket</th>
                            <th>KD</th>
                            <th>lewati</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody id="listAntri">
                        <tr>
                            <td colspan="4">Tidak Ada Data!</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="displayDaftarTungguModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
    <div class="modal-dialog  modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Daftar Tunggu Pasien</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="box box-warning">
                    <div class="box-body" style="border-bottom: solid 1px #0004;">
                        <div class="form-group">
                            <label for="tgldaftar" class="col-sm-1 col-form-label text-right">Tanggal</label>
                            <div class="col-sm-2" style="min-width: 180px;">
                                <div class="input-group date" data-date-format="yyyy-mm-dd">
                                    <input type="text" name="tgl" id="tgl" class="form-control input-sm datepicker" required="required" placeholder="yyyy-mm-dd" value="<?php echo date("Y-m-d"); ?>" readonly="">
                                    <div class="input-group-addon">
                                        <span class="glyphicon glyphicon-th"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <button id="cariDaftarTunggu" class="btn btn-primary" onclick="cariDaftarTunggu();">CARI</button>
                            </div>
                            <div class="col-md-3 hidden" id="src_daftarTunggu">
                                <div class="input-group">
                                    <input type="text" value="Sedang Mencari..." readonly="" hidden="" class="form-control" style="background: red; color: white;">
                                    <div class="input-group-addon" style="background: red; color: white;">
                                        <span class="fa fa-spinner fa-pulse fa-1x"></span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div class="box-body">
                        <table id="listDaftarTunggu" class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th style="width: 75px;">Aksi</th>
                                    <th>Urut</th>
                                    <th>Norm</th>
                                    <th>NIK</th>
                                    <th>Kelompok</th>
                                    <th>No Asuransi</th>
                                    <th>Nama</th>
                                    <th>JKel</th>
                                    <th>Desa</th>
                                    <th>Kunjungan</th>
                                    <th>Poli</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="displayDaftarKominfo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
    <div class="modal-dialog  modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Daftar Pasien Kominfo</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="box box-warning">
                    <div class="box-body" style="border-bottom: solid 1px #0004;">
                        <div class="form-group">
                            <label for="tgldaftar" class="col-sm-1 col-form-label text-right">Tanggal</label>
                            <div class="col-sm-2" style="min-width: 180px;">
                                <div class="input-group date" data-date-format="yyyy-mm-dd">
                                    <input type="text" name="tgl" id="tgl" class="form-control input-sm datepicker" required="required" placeholder="yyyy-mm-dd" value="<?php echo date("Y-m-d"); ?>" readonly="">
                                    <div class="input-group-addon">
                                        <span class="glyphicon glyphicon-th"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <button id="cariDaftarTunggu" class="btn btn-primary" onclick="">CARI</button>
                            </div>
                            <div class="col-md-3 hidden" id="src_daftarTunggu">
                                <div class="input-group">
                                    <input type="text" value="Sedang Mencari..." readonly="" hidden="" class="form-control" style="background: red; color: white;">
                                    <div class="input-group-addon" style="background: red; color: white;">
                                        <span class="fa fa-spinner fa-pulse fa-1x"></span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div class="box-body">
                        <table id="listDaftarTungguKOminfo" class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th style="width: 75px;">Aksi</th>
                                    <th>Urut</th>
                                    <th>Norm</th>
                                    <th>NIK</th>
                                    <th>Kelompok</th>
                                    <th>No Asuransi</th>
                                    <th>Nama</th>
                                    <th>JKel</th>
                                    <th>Desa</th>
                                    <th>Kunjungan</th>
                                    <th>Poli</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<script src="<?php echo base_url('asset'); ?>/js/custom/pendaftaran.js"></script>
<script src="<?php echo base_url('asset'); ?>/js/custom/panggilan.js"></script>
<script src="<?php echo base_url('asset'); ?>/js/custom/daftarTunggu.js"></script>
<script src="<?php echo base_url('asset'); ?>/js/custom/pendaftaranKominfo.js"></script>