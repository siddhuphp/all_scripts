<?php
    #Set up your database return below format array
    $data = [
        ["id" => 1, "name"=>"A", "parent_id" => 0], 
        ["id" => 2, "name"=>"B", "parent_id" => 1],
        ["id" => 3, "name"=>"C", "parent_id" => 1],
        ["id" => 4, "name"=>"D", "parent_id" => 1],
        ["id" => 5, "name"=>"E", "parent_id" => 1],
        ["id" => 6, "name"=>"F", "parent_id" => 1],
        ["id" => 7, "name"=>"G", "parent_id" => 1],
        ["id" => 8, "name"=>"H", "parent_id" => 1],
        ["id" => 9, "name"=>"B1", "parent_id" => 2],
        ["id" => 10, "name"=>"B2", "parent_id" => 2],
        ["id" => 11, "name"=>"B3", "parent_id" => 2],
        ["id" => 12, "name"=>"C1", "parent_id" => 3],
        ["id" => 13, "name"=>"C2", "parent_id" => 3],
        ["id" => 14, "name"=>"C3", "parent_id" => 3],
        ["id" => 15, "name"=>"D1", "parent_id" => 4],
        ["id" => 16, "name"=>"D2", "parent_id" => 4],
        ["id" => 17, "name"=>"DD1", "parent_id" => 15],
        ["id" => 18, "name"=>"DDD1", "parent_id" => 17],
        ["id" => 19, "name"=>"DDDD1", "parent_id" => 18],
        ["id" => 20, "name"=>"DDDDD1", "parent_id" => 19]    
    ]; 


    $arr = $data; 
    $new = array();
    foreach ($arr as $a)
    {
    $new[$a['parent_id']][] = $a;
    }

    function createTree(&$list, $parent)
    {
    $tree = array();
    foreach ($parent as $k=>$l){
        if(isset($list[$l['id']])){
            $l['children'] = createTree($list, $list[$l['id']]);
        }
        $tree[] = $l;
    } 
    return $tree;
    }

    $tree = createTree($new, array($arr[0]));
    echo "<pre>";
    print_r($tree);
?>