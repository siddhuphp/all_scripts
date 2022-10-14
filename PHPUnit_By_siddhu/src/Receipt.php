<?php
namespace TDD;
class Receipt {

	public $user_id = 1;
	private $pending_amount = 45;

	public function __construct($mainDb, $logDb = null)
    {

	}

	
	public function total(array $items = []){
		$items[] = $this->pending();
		$items[] = $this->pending_amount;
	   return array_sum($items);
	}

	public function tax($amount,$tax){
		return $amount * $tax;
	}
	
	private function pending()
    {
		
		$sql = 'select pending_amount from Pending_transtions where user_id =' . $this->user_id . ' limit 1;';
        //$pending_amt = $this->mainDb->get_sql_row($sql);
        //$this->pending = $pending_amt['pending_amount'];  
		return $this->pending_amount = 45;
    }
	
	public function addTaxPending($tax){
		return $this->pending_amount * $tax;
	}

	// for testing private method
	private function testing_pending()
    {
		return ["A","B"];
	}
}

// $s = new Receipt('s','P');
// $s->pending_amount = 55;
// print_r($s->total([7,8]));

$class = new \ReflectionClass('TDD\Receipt');
$myProtectedProperty = $class->getProperty('pending_amount');
$myProtectedProperty->setAccessible(true);
$myInstance = new Receipt('s','P');
$myProtectedProperty->setValue($myInstance, 99);

echo $myProtectedProperty->getValue($myInstance);


?>
