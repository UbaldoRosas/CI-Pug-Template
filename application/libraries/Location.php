<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Location
{
    protected $ci;

    public function __construct()
    {
        $this->ci =& get_instance();
    }

    public function get()
    {
        $apikey = "48113aa385124b7fd75a56ee096f0fe9907e9a737fe0e9f81e60fe6e24444dae";
        $ip = '187.189.135.21';
        //$ip = '187.190.191.215';
        $url = "http://api.ipinfodb.com/v3/ip-city/?key=48113aa385124b7fd75a56ee096f0fe9907e9a737fe0e9f81e60fe6e24444dae&ip=".$ip."&format=xml";
        $xml = simplexml_load_file($url);
        //var_dump($xml);
        $location = $xml->regionName;

        return $location;
    }

}

/* End of file Location.php */
