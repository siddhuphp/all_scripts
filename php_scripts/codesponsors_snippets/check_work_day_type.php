<?php
# Getting Work day Type
# Suppose I consider the date with time 2018-12-25 19:28:00
# You need to find out this date&time among the list of Business day, Non-business day, Weekends, And Holidays
# Holidays list & Week days are in Array
# Consider Business works 9:00 AM to 6:00PM

$holidays = ['01-01-2018','26-12-2018','10-07-2019','15-08-2019'];
$weekdays = [0,1,2,3,4,5,6]; //['mon','tue','wed','thu','fri']
$input_date = '2018-12-25 19:28:00'; //'YYYY-MM-DD h:i:s'
$business_start_time = "19:00"; 
$business_end_time = "20:00"; 
$type = "";

#1st check Holiday or not
$dt = new DateTime($input_date);
$date = $dt->format('d-m-Y');
if(in_array($date,$holidays))
{
	$type = "Holiday";
}


#2nd Check week end or not
$wk_no = date("w", strtotime($input_date)); //["0"=>"sun","1"=>"mon"....."6"=>"sat"]
if(($wk_no == 0 || $wk_no == 6) && $type != "Holiday" && !in_array($wk_no,$weekdays))
{
	$type = "Weekend";
}

#3rd Check work day even weekend also working day or not
if(in_array($wk_no,$weekdays) && $type != "Weekend" && $type != "Holiday")
{
	$type = "Working day";
}

#4th Condition check Business hour or non-business hour
$begin = date("H:i", strtotime($business_start_time)); // gives 24 format
$end = date("H:i", strtotime($business_end_time));
$now = date("H:i", strtotime($input_date));
if (($now >= $begin && $now <= $end) && $type == "Working day")
{
	$type = "business hour";
}
else if($type == "Weekend")
{
	$type = "Weekend";
}
else if($type == "Holiday")
{
	$type = "Holiday";
}
else 
{
	$type = "Non-business hour";
}

echo $type."<br/>";