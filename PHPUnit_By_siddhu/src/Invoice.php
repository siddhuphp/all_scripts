<?php
namespace TDD;
class Invoice {

	public $user_id = 1;
	private $pending_amount = 45;

	
	public function total(array $items = []){
	    $items[] = $this->pending();	
	    return array_sum($items);
	}

	public function tax($amount,$tax){
		return $amount * $tax;
	}
	
	private function pending()
    {
		$sql = 'select pending_amount from Pending_transtions where user_id =' . $this->user_id . ' limit 1;';
        //$pending_amt = $this->mainDb->get_sql_row($sql);
        $this->pending_amount = $pending_amt['pending_amount']; 		
    }
	
	public function addTaxPending($tax){
		return $this->pending_amount * $tax;
	}
}
?>