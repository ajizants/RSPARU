<!DOCTYPE html>
<html>
    <head>
        <title>Form Login SIM RS PARU-PARU</title>

        <!-- Core CSS -->
        <link rel="stylesheet" href="<?php echo base_url('asset'); ?>/bower_components/bootstrap/dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="<?php echo base_url('asset'); ?>/dist/css/AdminLTE.min.css?version=2.4">
        <link rel="stylesheet" href="<?php echo base_url('asset'); ?>/dist/css/skins/_all-skins.min.css?version=2.4">
        <link rel="stylesheet" href="<?php echo base_url('asset'); ?>/plugins/animate.css/animate.min.css">

    </head>

    <body class="hold-transition skin-black-light sidebar-mini">
        <div class="wrapper">
            <header class="main-header">
                <!-- Logo -->
                <a href="#" class="logo"> 
                    <!-- mini logo for sidebar mini 50x50 pixels -->
                    <span class="logo-mini"><b>S</b>RP</span>
                    <!-- logo for regular state and mobile devices -->
                    <span class="logo-lg"><b>SIMRS</b>Paru</span>
                </a> 
                <!-- Header Navbar -->
                <nav class="navbar navbar-static-top" role="navigation"></nav>
            </header>

            <div class="content">
                <div class="row">
                    <div class="col-sm-4"></div>
                    <div class="col-sm-4 animated zoomIn">
                        <div class="box box-solid box-warning">
                            <div class="box-header">
                                <h3 class="box-title">Form Login</h3>
                            </div>
                            <form id="frmLogin" action="#" method="post">
                                <div class="box-body">
                                    <div class="form-group has-warning">
                                        <label for="t_nip">Username</label>
                                        <input type="text" class="form-control" id="t_nip" placeholder="Username" required="required">
                                    </div>
                                    <div class="form-group has-warning">
                                        <label for="t_pswd">Password</label>
                                        <input type="password" class="form-control" id="t_pswd" placeholder="Password" required="required">
                                    </div>
                                </div><!-- /.box-body -->
                                <div class="box-footer">
                                    <button class="btn btn-warning btn-block">LOGIN</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="modal fade" id="loaderModal" tabindex="-1" role="dialog" aria-labelledby="viewModal" aria-hidden="true" data-backdrop="static">
            <div class="modal-dialog modal-sm" role="document">
                <div class="modal-content ">
                    <div class="modal-header">
                        <h5 class="modal-title" id="judul">Harap Tunggu...</h5>
                    </div>
                    <div class="modal-body" style="height: 180px;">
                        <!--<div class="container">-->
                        <div class="row">
                            <div id="loader">
                                <div class="dot"></div>
                                <div class="dot"></div>
                                <div class="dot"></div>
                                <div class="dot"></div>
                                <div class="dot"></div>
                                <div class="dot"></div>
                                <div class="dot"></div>
                                <div class="dot"></div>
                                <div class="lading"></div>
                            </div>
                        </div>
                        <!--</div>-->
                    </div>
                </div>
            </div>
        </div>


        <!-- Scripts -->
        <script src="<?php echo base_url('asset'); ?>/bower_components/jquery/dist/jquery.min.js"></script>
        <script src="<?php echo base_url('asset'); ?>/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
        <script src="<?php echo base_url('asset'); ?>/dist/js/adminlte.min.js"></script>
        <!-- Notify -->
        <script src="<?php echo base_url(); ?>asset/bower_components/notify/bootstrap-notify.min.js"></script>

        <script>
            $(document).ready(function () {
                $('#frmLogin').submit(function () {
                    $('#loaderModal').modal('show');
                    var nip = $('#t_nip').val();
                    var pswd = $('#t_pswd').val();
                    $.post('<?php echo base_url(); ?>DoLogin', {nip: nip, pswd: pswd}, function (json) {
                        if (json.metaData.code == 200) {
                            $.notify({
                                // options
                                message: json.response.message,
                            }, {
                                delay: 5000,
                                timer: 1000,
                                type: 'success'
                            });
                            setTimeout(function () {
                                window.location.href = "<?php echo base_url(); ?>"
                            }, "1000");
                        }
                        $('#loaderModal').modal('hide');
                    }, "json");
                    return false;
                });
            });
        </script>
        <!-- JS -->
    </body> 
</html>