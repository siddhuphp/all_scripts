<?php
namespace TDD\Test;
/**
*This require line says to require starting from the root directory
*Go to the vendor directory
*and then require that autoload.php file from there
*After this , we can use the PHP TestCase class
*And our Receipt class and then write our first test case
*
*/
require(dirname(dirname(__FILE__))).DIRECTORY_SEPARATOR.'vendor'.DIRECTORY_SEPARATOR.'autoload.php'; // its imports php autoload file, so we can use PHPUnit framework classes
use PHPUnit\Framework\TestCase; // its imoprt core class 
use TDD\Receipt; //its load our receipt class

//  require_once('../Receipt.php');
/** Example 1 
class ReceiptTest extends TestCase{
	public function testTotal(){
		$Receipt = new Receipt(); 
		$this->assertEquals(15,$Receipt->total([0,2,5,8]),"this is not valid"); //this assertEquals function coming from use PHPUnit\Framework\TestCase; this assertEquals has 3 inputs ( first expected value, second actual value, Message displayed in case of failure)
		# Find more assert functions in https://phpunit.de/manual/current/en/appendixes.assertions.html 
	}
} */


/** Example 2 
class ReceiptTest extends TestCase{
	public function setUp(): void {
		$this->Receipt = new Receipt();
	}
	public function tearDown(): void{
		unset($this->Receipt);
	}
	public function testTotal(){
		$input = [0,2,5,8];
		$output = $this->Receipt->total($input);
		$this->assertEquals(15,$output,"this is not valid"); 		
	}	
} */


class ReceiptTest extends TestCase{
	public function setUp(): void {
		$this->Receipt = new Receipt('s','p');
	}
	public function tearDown(): void{
		unset($this->Receipt);
	}
	public function testTotal(){
		$input = [0,2,5,8];
		$output = $this->Receipt->total($input);
		$this->assertEquals(60,$output,"this is not valid"); 		
	}	

	public function testTax(){
		$inputAmount = 10.00;
		$inputTax =  0.10;
		$output = $this->Receipt->tax($inputAmount,$inputTax);
		$this->assertEquals(1.0,$output,"this tax expecting 1.0"); 		
	}
	
	
	// public function test_total(){
    //     $sut = $this->createMock(Receipt::class, array('pending'));
	// 	$sut->method('pending')
	// 	->willReturn(25);
	// 	$this->assertEquals(60, $sut->total([2,4]));
    // }

	// it will work only public method
	// public function test_total2(){

		
	// 	$myStubObject = $this
	// 	->getMockBuilder(Receipt::class)
	// 	->setConstructorArgs(['s','p'])		
	// 	->setMethods(["pending"])
	// 	->getMock();
  
	//   $myStubObject
	// 	->method('pending')
	// 	->withAnyParameters()
	// 	->willReturn(45);

	// 	$input = [0,2,5,8];
	// 	$output = $myStubObject->total($input);
	// 	$this->assertEquals(60,$output);
    // }

	// for accessing public variable
	// public function test_total3(){
	// 	$input = [0,2,5,8];
	// 	$this->Receipt->pending_amount = 46;
	// 	$output = $this->Receipt->total($input);
	// 	$this->assertEquals(60,$output,"this is not valid"); 
	// }

	//Private progress
	// public function test_total4(){
	// 	$obj         = new Receipt('s','p');
		

	// 	$input = [0,2,5,8];
	// 	$this->Receipt->pending_amount = 46;
	// 	$output = $this->Receipt->total($input);
	// 	$this->assertEquals(60,$output,"this is not valid"); 
	// }
    

	//accessing private property
	public function test_total5(){
		$class = new \ReflectionClass('TDD\Receipt');
		$myProtectedProperty = $class->getProperty('pending_amount');
		$myProtectedProperty->setAccessible(true);
		$myInstance = new Receipt('s','P');
		$myProtectedProperty->setValue($myInstance, 99);

		$result = $myProtectedProperty->getValue($myInstance);

		$this->assertEquals( 99, $result ); // whatever your assertion is
	}


	//accessing private method and property
	// public function test_total6(){
	// 	$class = new \ReflectionClass('TDD\Receipt');

	// 	$myProtectedProperty = $class->getProperty('pending_amount');
	// 	$myProtectedProperty->setAccessible(true);

	// 	$myProtectedProperty = $class->getMethod('pending');
	// 	$myProtectedProperty->setAccessible(true);


	// 	$myInstance = new Receipt('s','P');
	// 	$myProtectedProperty->setValue($myInstance, 99);

	// 	$result = $myProtectedProperty->getValue($myInstance);

	// 	$this->assertEquals( 99, $result ); // whatever your assertion is
	// }
	
}

