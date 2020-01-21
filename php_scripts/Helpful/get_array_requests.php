<?php
/* Send array in get request */

$query_str = http_build_query(array(
    'a' => array(1, 2, 3)
));

echo "Converted array into url string: ".$query_str. "<br><br><br>";
parse_str($query_str, $output);


print_r($output);

?>