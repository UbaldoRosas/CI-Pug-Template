<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller {

	use CiPug;

	
	public function __construct()
	{
		parent::__construct();
		$this->load->library('location');
		
	}
	
	public function index()
	{
		$this->load->vars([
			'title' => "Index",
			'location' => $this->location->get()
		]);
		
		$this->view('welcome_message');
	}
}
