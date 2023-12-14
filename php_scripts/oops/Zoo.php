<?php
include_once('Animals.php');
class Zoo extends Animals
{
    protected $name = 'Circle';
    public function get_animal_name_ex()
    {
        echo "Siddhu";
    }


    /**
     * In PHP, an abstract class is a class that cannot be instantiated directly.
     * It serves as a blueprint for other classes and is often used to define 
     * a set of methods that must be implemented by any child classes. 
     * Abstract classes are useful when you want to create a common interface for
     * a group of related classes while ensuring that certain methods are implemented in those child classes.
     */

    // If you are not implement method name that you have in abstact class, it will throw error.
    public function get_animal_name()
    {
        echo "Something";
    }
}

$s = new Zoo();

$s->get_animal_name_ex();
