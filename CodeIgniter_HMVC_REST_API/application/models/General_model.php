<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
 
class General_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }
 
    // Return all records in the table
    public function get_all($table,$fields="",$where="")
    {
        $array = array();
        
		if(isset($fields) && !empty($fields))
        {
            $this->db->select($fields);			
        }
		if(isset($where) && !empty($where) && is_array($where))
        {
            foreach($where as $data)
            {
                if(is_array($data['value']))
                {
                    $this->db->where_in($data['column'],$data['value']);
                }
                else
                {
                    $this->db->where($data['column'],$data['value']);
                }
            }			
        }
		$q = $this->db->get($table);
		//   echo $this->db->last_query(); exit;
        if($q->num_rows() > 0)
        {
            $array['status'] = TRUE;
            $array['resultSet'] = $q->result_array();
        }
        else
        {
            $array['status'] = FALSE;
        }        
        return $array;
    }
 
    // Return only one row
    public function get_row($table,$fields="",$where="")
    {
        $array = array();
        
		if(isset($fields) && !empty($fields))
        {
            $this->db->select($fields);			
        }
		if(isset($where) && !empty($where) && is_array($where))
        {
            foreach($where as $data)
            {
                if(is_array($data['value']))
                {
                    $this->db->where_in($data['column'],$data['value']);
                }
                else
                {
                    $this->db->where($data['column'],$data['value']);
                }
            }			
        }
		$q = $this->db->get($table);
		//   echo $this->db->last_query(); exit;
        if($q->num_rows() > 0)
        {
            $array['status'] = TRUE;
            $array['resultSet'] = $q->row_array();
        }
        else
        {
            $array['status'] = FALSE;
        }        
        return $array;
    }
 
    // Insert into the table
    public function add($table,$data)
    {
        $array = array();
        if ($this->db->insert($table, $data)) {
            $array['status'] = TRUE;
            $array['insert_id'] = $this->db->insert_id();
        } else {
            $array['status'] = FALSE;
        }
        return $array;
    }
 
    // Update data to table
    public function update($table,$data,$where)
    {
        $array = array();
        if(isset($where) && !empty($where) && is_array($where))
        {
            foreach($where as $wdata)
            {
                if(is_array($wdata['value']))
                {
                    $this->db->where_in($wdata['column'],$wdata['value']);
                }
                else
                {
                    $this->db->where($wdata['column'],$wdata['value']);
                }                
            }
            $q = $this->db->update($table, $data);		
        }
       
        //    echo $this->db->last_query(); exit;
        if ($this->db->affected_rows() > 0)
        {
            $array['status'] = TRUE;
        }
        else
        {
            $array['status'] = FALSE;
        }
        return $array;
    }
 
    // Delete record from the table
    public function delete_row($table,$where)
    {
        $array = array();
    	if(isset($where) && !empty($where) && is_array($where))
        {
            foreach($where as $data)
            {
                if(is_array($data['value']))
                {
                    $this->db->where_in($data['column'],$data['value']);
                }
                else
                {
                    $this->db->where($data['column'],$data['value']);
                }                
            }
            $this->db->delete($table);			
        }
        
        if ($this->db->affected_rows() > 0)
        {
            $array['status'] = TRUE;
        }
        else
        {
            $array['status'] = FALSE;
        }
        return $array;
    } 
    
 
    // Return an array to use as reference or dropdown selection
    public function get_ref($table,$key,$value,$dropdown=false)
    {
        $this->db->from($table);
        $this->db->order_by($value);
        $result = $this->db->get();
 
        $array = array();
        if ($dropdown)
            $array = array("" => "Please Select");
 
        if($result->num_rows() > 0) {
            foreach($result->result_array() as $row) {
            $array[$row[$key]] = $row[$value];
            }
        }
        return $array;
    }

    public function get_all_from_join($data)
    {

        /*  Example structure of join common query building
            $array = [
                "fileds" => "A.name, B.email",
                "table" => "Table A",
                "join_tables" => [
                    ["table"=>"Table B","join_on"=>'"B.id" = "A.id"',"join_type" => "left"],
                    ["table"=>"Table C","join_on"=>'"C.id" = "A.id"',"join_type" => "right"],
                ],                
                "where" => [
                    ["column" => "B.id", "value" => 1],
                    ["column" => "A.status", "value" => 'Active']
                ],
                "like" => [
                    ["column" => "B.id", "value" => 1],
                    ["column" => "A.status", "value" => 'Active']
                ],
                "limit" => ["start" => 1, "end" => 5],
                "order_by" => [
                    ["column" => "A.Name", "type" => 'ASC'],
                    ["column" => "A.id", "type" => 'DESC']
                ],
                "group_by" => ['column1','column2','column3']                               
		    ];        
        */

        if(isset($data) && !empty($data) && is_array($data))
        {
            $fileds = (isset($data['fileds']) && !empty($data['fileds']))?$data['fileds']:"*";

            $this->db->select($fileds);
            $this->db->from($data['table']); 

            // Joins
            if(isset($data['join_tables']) && !empty($data['join_tables']) && is_array($data['join_tables']))
            {
                foreach($data['join_tables'] as $join)
                {
                    $join_type = (isset($join['join_type']) && !empty($join['join_type']))?$join['join_type']:"left";

                    $this->db->join($join['table'], $join['join_on'], $join_type);
                }
            }

            // Where
            if(isset($data['where']) && !empty($data['where']) && is_array($data['where']))
            {
                foreach($data['where'] as $where)
                {
                    if(isset($where['column'],$where['value']))
					{
						if(is_array($where['value']))
                        {
                            $this->db->where_in($where['column'],$where['value']);
                        }
                        else
                        {
                            $this->db->where($where['column'],$where['value']);
                        }
					}
                }
            }

            // Like
            if(isset($data['like']) && !empty($data['like']) && is_array($data['like']))
            {
                foreach($data['like'] as $key => $like)
                {
                    if(isset($like['column'],$like['value']) && (is_array($like['value'])))
					{
                        foreach($like['value'] as $key2 => $like_value) 
                        {
                            if(($key2 == 0) && ($key == 0))// or case
                            {
                                $this->db->like($like['column'],$like_value);
                            }
                            else
                            {
                                $this->db->or_like($like['column'],$like_value); 
                            }                                
                        }                                               
                    }
                    else if(isset($like['column'],$like['value']) && ($key == 0))
                    {
                       $this->db->like($like['column'],$like['value']); 
                    }
                    else if(isset($like['column'],$like['value']))
                    {
                        $this->db->or_like($like['column'],$like['value']);
                    }
                }
            }

            //Limit            
            if(isset($data['limit']['start'],$data['limit']['end']) && !empty($data['limit']) && is_array($data['limit']))
            {
                $limit = $data['limit']['start']; $offset = $data['limit']['end'];
                $this->db->limit($offset, $limit);                
            }   


            // Order By
            if(isset($data['order_by']) && !empty($data['order_by']) && is_array($data['order_by']))
            {
                foreach($data['order_by'] as $order)
                {
                    if(isset($order['column'],$order['type']))
					{
						$this->db->order_by($order['column'],$order['type']);
					}
                }
            }


            //Group by
            if(isset($data['group_by']) && !empty($data['group_by']) && is_array($data['group_by']))
            {
                $this->db->group_by($data['group_by']); 
            }

                   
            $q = $this->db->get(); 
            // echo $this->db->last_query(); exit;
            if($q->num_rows() > 0)
            {
                $array['status'] = TRUE;
                $array['resultSet'] = $q->result_array();
            }else{
                $array['status'] = FALSE;
            }        
            return $array;
        }
        
    }


    public function get_row_from_join($data)
    {

        /*  Example structure of join common query building
            $array = [
                "fileds" => "A.name, B.email",
                "table" => "Table A",
                "join_tables" => [
                    ["table"=>"Table B","join_on"=>'"B.id" = "A.id"',"join_type" => "left"],
                    ["table"=>"Table C","join_on"=>'"C.id" = "A.id"',"join_type" => "right"],
                ],                
                "where" => [
                    ["column" => "B.id", "value" => 1],
                    ["column" => "A.status", "value" => 'Active']
                ],
                "like" => [
                    ["column" => "B.id", "value" => 1],
                    ["column" => "A.status", "value" => 'Active']
                ],
                "limit" => ["start" => 1, "end" => 5],
                "order_by" => ["column" => "A.Name", "Type" => 'ASC'],
                "group_by" => ['column1','column2','column3']                
		    ];
        
        */

        if(isset($data) && !empty($data) && is_array($data))
        {
            $fileds = (isset($data['fileds']) && !empty($data['fileds']))?$data['fileds']:"*";

            $this->db->select($fileds);
            $this->db->from($data['table']); 

            // Joins
            if(isset($data['join_tables']) && !empty($data['join_tables']) && is_array($data['join_tables']))
            {
                foreach($data['join_tables'] as $join)
                {
                    $join_type = (isset($join['join_type']) && !empty($join['join_type']))?$join['join_type']:"left";

                    $this->db->join($join['table'], $join['join_on'], $join_type);
                }
            }

            // Where
            if(isset($data['where']) && !empty($data['where']) && is_array($data['where']))
            {
                foreach($data['where'] as $where)
                {
                    if(isset($where['column'],$where['value']))
					{
						if(is_array($where['value']))
                        {
                            $this->db->where_in($where['column'],$where['value']);
                        }
                        else
                        {
                            $this->db->where($where['column'],$where['value']);
                        }
					}
                }
            }

             // Like
            if(isset($data['like']) && !empty($data['like']) && is_array($data['like']))
            {
                foreach($data['like'] as $key => $like)
                {
                    if(isset($like['column'],$like['value']) && (is_array($like['value'])))
					{
                        foreach($like['value'] as $key2 => $like_value)
                        {
                            if(($key2 == 0) && ($key == 0))
                            {
                                $this->db->like($like['column'],$like_value);
                            }
                            else
                            {
                                $this->db->or_like($like['column'],$like_value); 
                            }                                
                        }                                               
                    }
                    else if(isset($like['column'],$like['value']) && ($key == 0))
                    {
                       $this->db->like($like['column'],$like['value']); 
                    }
                    else if(isset($like['column'],$like['value']))
                    {
                        $this->db->or_like($like['column'],$like['value']);
                    }
                }
            }

            //Limit            
            if(isset($data['limit']['start'],$data['limit']['end']) && !empty($data['limit']) && is_array($data['limit']))
            {
                $limit = $data['limit']['start']; $offset = $data['limit']['end'];
                $this->db->limit($limit, $offset);                
            }


            // Order By
            if(isset($data['order_by']['column'],$data['order_by']['Type']) && !empty($data['order_by']) && is_array($data['order_by']))
            {
                $order_type = (isset($data['order_by']['Type']) && !empty($data['order_by']['Type']))?$data['order_by']['Type']:"ASC";
                
                $this->db->order_by($data['order_by']['column'],$order_type);                
            }


            //Group by
            if(isset($data['group_by']) && !empty($data['group_by']) && is_array($data['group_by']))
            {
                $this->db->group_by($data['group_by']); 
            }
                   
            $q = $this->db->get(); 
            //   echo $this->db->last_query(); exit;
            if($q->num_rows() > 0)
            {
                $array['status'] = TRUE;
                $array['resultSet'] = $q->row_array();
            }else{
                $array['status'] = FALSE;
            }        
            return $array;
        }
        
    }

    // Insert batch into the table
    public function add_batch($table,$data)
    {
        $array = array();
        if ($this->db->insert_batch($table, $data)) {
            $array['status'] = TRUE;
            $array['insert_id'] = $this->db->insert_id();
        } else {
            $array['status'] = FALSE;
        }
        //    echo $this->db->last_query(); exit;
        return $array;
    }

    public function custom_query($sql,$check="")
    {
        $array = array();
        if(isset($sql) && !empty($sql))
        {
            $query = $this->db->query($sql); 
            if($this->db->affected_rows() > 0)
            {
                $array['status'] = TRUE;
                if(isset($check) && !empty($check) && ($check == 'row'))
                {
                    $array['resultSet'] = $query->row_array();
                }
                else
                {
                    $array['resultSet'] = $query->result_array();
                }
                
            }
            else
            {
                $array['status'] = FALSE;
            }           
        }
            // echo $this->db->last_query(); exit;
         return $array;
    }


    public function get_datatables($data)
    {
        /* Implemented for datables
            Auther: Siddhartha
            Date: 21-june-2020
            Referance source: https://datatables.net/examples/server_side/simple.html
            Version: https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js
        */
        /*  Example structure of join common query building
            $array = [
                "data_table" => ['A.name','B.email'],
                "fileds" => "A.name, B.email",
                "table" => "Table A",
                "join_tables" => [
                    ["table"=>"Table B","join_on"=>'"B.id" = "A.id"',"join_type" => "left"],
                    ["table"=>"Table C","join_on"=>'"C.id" = "A.id"',"join_type" => "right"],
                ],                
                "where" => [
                    ["column" => "B.id", "value" => 1],
                    ["column" => "A.status", "value" => 'Active']
                ]
                "group_by" => ['column1','column2','column3']                               
            ];
            Note: You don't need to send the Like, limit, order by columns. It tooks automatically.        
        */

        /* 
            Jquery data output like to be below format
            {
                "draw": 1,
                "recordsTotal": 57,
                "recordsFiltered": 57,
                "data": [
                            [
                                "Airi",
                                "Satou",
                                "Accountant",
                                "Tokyo",
                                "28th Nov 08",
                                "$162,700"
                            ],
                            [.....],
                            [.....],
                            [.....],                    
                        ],
            }

            And make sure your jquery script to be below format

            $(document).ready( function () {
                $('#table_id').DataTable({
                    "processing": true,
                    "serverSide": true,
                    "ajax": '<?php echo base_url("log_messages/get_datatables"); ?>',
                    columns: [
                                { data: 'id' },
                                { data: 'module' },
                                { data: 'at_where' },
                                { data: 'msg' },
                                { data: 'request_json' },
                                { data: 'receive_json' },
                                { data: 'created_on' },
                            ]
                });
            });
        */

        // pr($_GET,1);
        if(isset($data) && !empty($data) && is_array($data))
        {
            $fileds = (isset($data['fileds']) && !empty($data['fileds']))?$data['fileds']:"*";

            $this->db->select($fileds);
            $this->db->from($data['table']); 

            // Joins
            if(isset($data['join_tables']) && !empty($data['join_tables']) && is_array($data['join_tables']))
            {
                foreach($data['join_tables'] as $join)
                {
                    $join_type = (isset($join['join_type']) && !empty($join['join_type']))?$join['join_type']:"left";

                    $this->db->join($join['table'], $join['join_on'], $join_type);
                }
            }

            // Where
            if(isset($data['where']) && !empty($data['where']) && is_array($data['where']))
            {
                foreach($data['where'] as $where)
                {
                    if(isset($where['column'],$where['value']))
					{
						if(is_array($where['value']))
                        {
                            $this->db->where_in($where['column'],$where['value']);
                        }
                        else
                        {
                            $this->db->where($where['column'],$where['value']);
                        }
					}
                }
            }

            // Like
            if(isset($data['data_table'],$_GET['search']['value']) && !empty($data['data_table']) && !empty($_GET['search']['value']) && is_array($data['data_table']))
            {
                $this->db->group_start();
                foreach($data['data_table'] as $key => $column)
                {
                    if(isset($column) && !empty($column) && ($key == 0))
                    {
                       $this->db->like($column,trim($_GET['search']['value'])); 
                    }
                    else if(!empty($column))
                    {
                        $this->db->or_like($column,trim($_GET['search']['value']));
                    }
                }
                $this->db->group_end();
            }

            

            //Limit           
            if(isset($_GET['length'], $_GET['start']))
            {
                $this->db->limit($_GET['length'], $_GET['start']);
            }            


            // Order By
            if(isset( $_GET['order'][0]['column'],$_GET['order'][0]['dir']) && !empty($_GET['order'][0]['dir']))
            {
                $this->db->order_by( $data['data_table'][$_GET['order'][0]['column']],$_GET['order'][0]['dir']);				
            }

            //Group by
            if(isset($data['group_by']) && !empty($data['group_by']) && is_array($data['group_by']))
            {
                $this->db->group_by($data['group_by']); 
            }

                   
            $q = $this->db->get(); 
            //    echo $this->db->last_query(); exit;
            if($q->num_rows() > 0)
            {
                $data_count = $this->get_count_datatables($data);
                $count = 0;
                if($data_count['status'])
                {
                    $count = $data_count['count'];
                }
                $array['status'] = TRUE;
                $array['draw'] = (isset($_GET['draw']) && !empty($_GET['draw']))?$_GET['draw']:1;
                $array['recordsTotal'] = $count;
                $array['recordsFiltered'] = $count;
                $array['data'] = $q->result_array();
            }else{
                $array['status'] = FALSE;
                $array['draw'] = (isset($_GET['draw']) && !empty($_GET['draw']))?$_GET['draw']:1;
                $array['recordsTotal'] = 0;
                $array['recordsFiltered'] = 0;
                $array['data'] = [];
            }  
                  
            return $array;
            
        }
        
    }

    function get_count_datatables($data)
    {
        
        if(isset($data) && !empty($data) && is_array($data))
        {
            $fileds = (isset($data['fileds']) && !empty($data['fileds']))?$data['fileds']:"*";

            $this->db->select($fileds);
            $this->db->from($data['table']); 

            // Joins
            if(isset($data['join_tables']) && !empty($data['join_tables']) && is_array($data['join_tables']))
            {
                foreach($data['join_tables'] as $join)
                {
                    $join_type = (isset($join['join_type']) && !empty($join['join_type']))?$join['join_type']:"left";

                    $this->db->join($join['table'], $join['join_on'], $join_type);
                }
            }

            // Where
            if(isset($data['where']) && !empty($data['where']) && is_array($data['where']))
            {
                foreach($data['where'] as $where)
                {
                    if(isset($where['column'],$where['value']))
					{
						if(is_array($where['value']))
                        {
                            $this->db->where_in($where['column'],$where['value']);
                        }
                        else
                        {
                            $this->db->where($where['column'],$where['value']);
                        }
					}
                }
            }

            //Group by
            if(isset($data['group_by']) && !empty($data['group_by']) && is_array($data['group_by']))
            {
                $this->db->group_by($data['group_by']); 
            }
                   
            $q = $this->db->get(); 
            //    echo $this->db->last_query(); exit;
            if($q->num_rows() > 0)
            {
                $array['status'] = TRUE;
                $array['count'] = count($q->result_array());
            }else{
                $array['status'] = FALSE;
            }                  
            return $array;
            
        }
        
    }
}