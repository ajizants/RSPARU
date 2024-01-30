<?php
/** Here comes the text of your license
* Each line should be prefixed with mmm  
*  @author kent-os
*/

/*** Description of Login_C
** @author rsparu-1
*/

class Login_C extends CI_Controller {   
	public function __construct() {
		parent::__construct();
		$this->simrs = $this->load->database('simrs', true);   
	}   
	
	public function index() {
		if ($this->session->has_userdata('logged')) {
			redirect(base_url());
		} else {
			$this->parser->parse('template/Login', []);
		}   
	}   
	public function do_login() {
		//	echo "OK";
		$nip = $this->input->post('nip');
		$pswd = base64_encode($this->input->post('pswd'));
		$res = [];
		$this->simrs->select("v_pegawai.nip, v_pegawai.gelar_d, v_pegawai.nama, v_pegawai.gelar_b, v_pegawai.stat_pns, v_pegawai.pswd");
		$this->simrs->where(["v_pegawai.nip" => $nip]);
		$q = $this->simrs->get('v_pegawai');//	echo $this->simrs->last_query();
		if ($q->num_rows() > 0) {
			foreach ($q->result() as $d) {
				if ($d->pswd == $pswd) {
					$sesData = [
						'logged' => [
							'nip' => $d->nip,
							'gelar_d' => $d->gelar_d,
							'nama' => $d->nama,
							'gelar_b' => $d->gelar_b,
							'stat_pns' => $d->stat_pns
						]
					];
					$this->session->set_userdata($sesData);
					$res = $this->ResponseModel->res200(["message" => "Login Berhasil!"]);
				} else {
					$res = $this->ResponseModel->res204(['message' => 'user / password tidak ditemukan!']);
				}
			}
		} else {
			$res = $this->ResponseModel->res204(['message' => 'user / password tidak ditemukan!']);
		}
		echo json_encode($res);   
	}   
	public function do_logout() {
		$this->session->sess_destroy();
		if ($this->session->has_userdata('logged')) {
			print_r($this->session->logged);//
			print_r($this->session->userdata());
		} else {
			echo 'Tidak Ada Session';
		}
		redirect(base_url());   
	}
}