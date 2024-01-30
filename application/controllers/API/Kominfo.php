<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Kominfo extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        // Load library yang diperlukan
        // $this->load->library('curl');
    }

    public function getDataPendaftaranKominfo()
    {
        // Ambil data dari URL dengan parameter username dan password
        $url = 'https://kkpm.banyumaskab.go.id/api/pendaftaran/data_pendaftaran';  // Ganti dengan URL sesuai kebutuhan
        $username = '3301010509940003';  // Ganti dengan username yang valid
        $password = 'banyumas';  // Ganti dengan password yang valid

        // Konfigurasi cURL
        $options = array(
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPAUTH => CURLAUTH_BASIC,
            CURLOPT_USERPWD => "$username:$password",
        );

        $this->curl->create($url);
        $this->curl->options($options);

        // Eksekusi cURL
        $result = $this->curl->execute();

        // Tampilkan hasil
        echo $result;
    }
	
	public function getDataPasienKominfo()
    {
        // Ambil data dari URL dengan parameter username dan password
        $url = 'https://kkpm.banyumaskab.go.id/api/pasien/data_pasien';  // Ganti dengan URL sesuai kebutuhan
        $username = '3301010509940003';  // Ganti dengan username yang valid
        $password = 'banyumas';  // Ganti dengan password yang valid
        $curl = curl_init();
        $norm=$_POST['no_rm'];
        $data = array(
            'username' => '3301010509940003',
            'password' => 'banyumas',
            'no_rm' => $norm, // Use the dynamic 'no_rm' value
        );

        curl_setopt_array($curl, array(
          CURLOPT_URL => $url,
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => '',
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 0,
          CURLOPT_FOLLOWLOCATION => true,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => 'POST',
          CURLOPT_POSTFIELDS => $data,
          CURLOPT_HTTPHEADER => array(
            'Content-Type: application/x-www-form-urlencoded',
          ),
        ));
        
        $response = curl_exec($curl);
        
        curl_close($curl);

        echo $response;
    }
}
