<!DOCTYPE HTML>
<html>
    <head>
        <title>Label</title>
        <style>
            @media print{
                @page{
                    size : 192mm 135mm;
                    size : landscape
                }
            }

            /*@page { sheet-size: 192mm 135mm; }*/

            * {
                box-sizing: border-box;
            }

            body{
                font-size: 8pt;
            }
            .fs9{
                font-size: 9pt;
            }
            .fs10{
                font-size: 10pt;
            }

            .box{
                float: left;
                /* border: solid 0.125mm black; */
                /* background-color: #f5f5f5; */
                width: 60mm;
                height: 28mm;
                margin-bottom: 0mm;
                padding-top:1mm;
                padding-bottom: 0mm;
                padding-left: 2mm;
                padding-right: 2mm;
            }
            .ml{
                margin-left: 2mm;
            }
            .clearfix::after {
                content: "";
                clear: both;
                display: table;
            }
        </style>
    </head>
    <body>
        <?php
for ($i = 0; $i < 4; $i++) {
    ?>
            <div class="box">
                <table border="0">
                    <tr>
                        <td valign="top"> <?php echo $this->titled->gen_litle_title($umur, $jkel, $sKwn); ?>.
                        {nama}</td>
                    </tr>
                    <tr>
                        <td > ({norm}),
                            ({jkel}),
                            (<?php echo date('d-m-Y', strtotime($tgllahir)); ?>)</td>
                    </tr>
                    <tr>
                        <td>
                            <!-- <?php echo date('d-m-Y', strtotime($tgllahir)); ?>,   -->
                            <?php echo strtolower($kelurahan); ?> {rtrw},
                            <?php echo strtolower(str_replace("KABUPATEN ", "", $kabupaten)); ?></td>
                    </tr>
                        <br><br>
                    <tr>
                        <td valign="top"> <?php echo $this->titled->gen_litle_title($umur, $jkel, $sKwn); ?>.
                        {nama}</td>
                    </tr>
                    <tr>
                        <td > ({norm}),
                            ({jkel}),
                            (<?php echo date('d-m-Y', strtotime($tgllahir)); ?>)</td>
                    </tr>
                    <tr>
                        <td>
                            <!-- <?php echo date('d-m-Y', strtotime($tgllahir)); ?>,   -->
                            <?php echo strtolower($kelurahan); ?> {rtrw},
                            <?php echo strtolower(str_replace("KABUPATEN ", "", $kabupaten)); ?></td>
                    </tr>
                </table>
            </div>
            <div class="box ml">
                <table border="0">
                    <tr>
                        <td valign="top"> <?php echo $this->titled->gen_litle_title($umur, $jkel, $sKwn); ?>.
                        {nama}</td>
                    </tr>
                    <tr>
                        <td > ({norm}),
                            ({jkel}),
                            (<?php echo date('d-m-Y', strtotime($tgllahir)); ?>)</td>
                    </tr>
                    <tr>
                        <td>
                            <!-- <?php echo date('d-m-Y', strtotime($tgllahir)); ?>,   -->
                            <?php echo strtolower($kelurahan); ?> {rtrw},
                            <?php echo strtolower(str_replace("KABUPATEN ", "", $kabupaten)); ?></td>
                    </tr>
                        <br><br>
                    <tr>
                        <td valign="top"> <?php echo $this->titled->gen_litle_title($umur, $jkel, $sKwn); ?>.
                        {nama}</td>
                    </tr>
                    <tr>
                        <td > ({norm}),
                            ({jkel}),
                            (<?php echo date('d-m-Y', strtotime($tgllahir)); ?>)</td>
                    </tr>
                    <tr>
                        <td>
                            <!-- <?php echo date('d-m-Y', strtotime($tgllahir)); ?>,   -->
                            <?php echo strtolower($kelurahan); ?> {rtrw},
                            <?php echo strtolower(str_replace("KABUPATEN ", "", $kabupaten)); ?></td>
                    </tr>
                </table>
            </div>
            <div class="box ml">
                <table border="0">
                    <tr>
                        <td valign="top"> <?php echo $this->titled->gen_litle_title($umur, $jkel, $sKwn); ?>.
                        {nama}</td>
                    </tr>
                    <tr>
                        <td > ({norm}),
                            ({jkel}),
                            (<?php echo date('d-m-Y', strtotime($tgllahir)); ?>)</td>
                    </tr>
                    <tr>
                        <td>
                            <!-- <?php echo date('d-m-Y', strtotime($tgllahir)); ?>,   -->
                            <?php echo strtolower($kelurahan); ?> {rtrw},
                            <?php echo strtolower(str_replace("KABUPATEN ", "", $kabupaten)); ?></td>
                    </tr>
                        <br><br>
                    <tr>
                        <td valign="top"> <?php echo $this->titled->gen_litle_title($umur, $jkel, $sKwn); ?>.
                        {nama}</td>
                    </tr>
                    <tr>
                        <td > ({norm}),
                            ({jkel}),
                            (<?php echo date('d-m-Y', strtotime($tgllahir)); ?>)</td>
                    </tr>
                    <tr>
                        <td>
                            <!-- <?php echo date('d-m-Y', strtotime($tgllahir)); ?>,   -->
                            <?php echo strtolower($kelurahan); ?> {rtrw},
                            <?php echo strtolower(str_replace("KABUPATEN ", "", $kabupaten)); ?></td>
                    </tr>
                </table>
            </div>
            <?php
}
?>
    </body>
</html>
