<?php

echo "example of classes and object\n";
class Cars
{
    const CAR_SPAN_YEARS = 10;

    public $name; //properties 
    public $model;
    public $color;
    public $age = 24;
    protected $api_key = "XYZ";
    private $pwd = "123456";
    public static $chk = "parent static";

    function __construct($tempName = "") // Special function (initiate parameter)
    {
        #Notes => __constructor 
        # constructor is something that will excute some code immidetly whenever you load the class.
        # You dont need to call extra function 

        echo "this is calling from __construct function" . PHP_EOL;

        #Notes => Initiate any value by default
        # for suppose if you want initiate any value by default 
        $this->age = 55;

        $this->name = $tempName;
    }

    public function set_name($a) // Methods(Parameters)
    {
        #Notes => access class proprties 
        #we can access this class properties using $this. we call it "pseudo variable" 
        $this->name = $a;
    }

    public function get_name()
    {
        return $this->name;
    }

    protected function get_set_name()
    {
        return $this->name;
    }

    public function add_sum()
    {
        return 7 * 7;
    }

    public function access_protected()
    {
        return $this->api_key . PHP_EOL;
    }

    public function access_private()
    {
        return $this->pwd . PHP_EOL;
    }
}

$cars = new Cars();
$cars->set_name("Honda");
echo $cars->get_name() . PHP_EOL;
echo $cars->age . PHP_EOL;


#Notes => Accessing protected property
#Protected properties or methods. you can only access within class.
#Outside class you can't access the protected properties and methods.
#But using public method in call you can access protected properties or methods

#echo $cars->api_key; // this will generate error, bcuz trying to access protected property outside of class.. you can test removing comment
#echo $cars->get_set_name(); // this will also generate error, bcuz trying to access protected method outside of class.. you can test removing comment

#Notes => Accessing protected property or method
# You can access protected property or method using public method in a class
echo $cars->access_protected();


#echo $cars->pwd; // this will generate error, bcuz trying to access private property outside of class.. you can test removing this comment
echo $cars->access_private(); // this will also generate error, bcuz trying to access private method outside of class.. you can test removing comment


$intcars = new Cars("Bajaj"); //initiate parameter
echo $intcars->get_name() . PHP_EOL;

#Notes => Modifying Public values
# Public properties means, User can access public propeties anywhere or he can modify the property value by using objects

$cars->age = 46; // this is the example of modify age value if it is public property
echo $cars->age . PHP_EOL;


#Notes => Accessing constants
# Accessing const values in two different types 
# method we call scope resultion operator ::

echo $cars::CAR_SPAN_YEARS . PHP_EOL; //scope resultion operator


echo cars::CAR_SPAN_YEARS . PHP_EOL; //with class name




echo "example of extends or inhertance\n";
class Vechils extends Cars
{
    public static $static_property = "one";
    public function change_name($n)
    {
        $this->name = $n;
    }


    #if you declare same method as you used on parent class, It will override the parent class.
    public function add_sum()
    {
        return 8 * 8;
    }


    public static function static_method()
    {
        #notes: accessing static property with key word of "self" instead of "this"
        return self::$static_property;
    }

    public static function parent_static_method()
    {
        #notes: when you accssing parent static property you need to use "parent" instead of "self"
        return parent::$chk;
    }
}

$cars = new Cars();
$cars->set_name("Honda");
echo $cars->get_name() . PHP_EOL;
echo $cars->add_sum() . PHP_EOL;



$Vechils = new Vechils();
$Vechils->change_name("TATA");
echo $Vechils->get_name() . PHP_EOL;
echo $Vechils->add_sum() . PHP_EOL;

$child_intcars = new Vechils("KIA"); //child initiate parameter
echo $child_intcars->get_name() . PHP_EOL;


#nots: Calling static properties
#you can call it directly using class name
echo Vechils::$static_property . PHP_EOL;
echo Vechils::static_method() . PHP_EOL;
echo Vechils::parent_static_method() . PHP_EOL;



#Working on multiple constructors

class book
{
    public $name;
    public $price;
    function __construct($temName = "", $tempPrice = "")
    {
        echo "This is Book class constructor";
        $this->name = $temName;
        $this->price = $tempPrice;
    }

    function get_book_name()
    {
        return $this->name;
    }
}

class author extends book
{
    public $authorName;
    public $age;

    function __construct($tempAuthor = "") // Multiple constructor, bcoz we already have constructor on parent class
    {
        echo "This is author class constructor" . PHP_EOL;
        $this->authorName = $tempAuthor;

        parent::__construct();
    }

    function get_author_name()
    {
        return $this->authorName;
    }
}

$author = new author("Siddhartha");
echo $author->get_author_name();


// echo "example of abstract\n";
// abstract class Trees
// {
//     public $name;

//     public function set_tree_name($a)
//     {
//         $this->name = $a;
//     }

//     public function get_name()
//     {
//         return $this->name;
//     }
// }

// $trees = new Trees();
// $trees->set_tree_name("Honda");
// echo $trees->get_name();
