<?php
namespace TDD\Test;

require(dirname(dirname(__FILE__))).DIRECTORY_SEPARATOR.'vendor'.DIRECTORY_SEPARATOR.'autoload.php';
use PHPUnit\Framework\TestCase; 
use TDD\Invoice; 

class InvoiceTest extends TestCase{
	public function setUp(): void {
		$this->Invoice = new Invoice();
	}

	public function tearDown(): void{
		unset($this->Invoice);
	}

	public function testTotal(){
		$input = [0,2,5,8];
		$output = $this->Invoice->total($input);
		$this->assertEquals(60,$output,"this is not valid"); 		
	}	

	public function testTax(){
		$inputAmount = 10.00;
		$inputTax =  0.10;
		$output = $this->Invoice->tax($inputAmount,$inputTax);
		$this->assertEquals(1.0,$output,"this tax expecting 1.0"); 		
	}


	public function test_total2(){

		
		$myStubObject = $this
		->getMockBuilder(Invoice::class)
		->setConstructorArgs(['s','p'])		
		->setMethods(["pending"])
		->getMock();
  
	  $myStubObject
		->method('pending')
		->withAnyParameters()
		->willReturn(45);

		$input = [0,2,5,8];
		$output = $myStubObject->total($input);
		$this->assertEquals(60,$output);
    }


}

