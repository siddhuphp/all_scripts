<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
 
class General_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }
 
    // Return all records in the table
    public function get_all($table,$where)
    {
        $array = array();
        
		if(isset($where) && !empty($where) && is_array($where))
        {
            foreach($where as $data)
            {
                $this->db->where($data['column'],$data['value']);
            }
			
        }
		$q = $this->db->get($table);
		
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
    public function get_row($table,$primaryfield,$id)
    {
        $array = array();
        $this->db->where($primaryfield,$id);
        $q = $this->db->get($table);
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
 
    // Return one only field value
    public function get_data($table,$fieldname,$primaryfield,$id)
    {
        $array = array();
        $this->db->select($fieldname);
        $this->db->where($primaryfield,$id);
        $q = $this->db->get($table);
        if($q->num_rows() > 0)
        {
            $array['status'] = TRUE;
            $array['resultSet'] = $q->row_array();
        }else{
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
    public function update($table,$data,$primaryfield,$id)
    {
        $array = array();
        $this->db->where($primaryfield, $id);
        $q = $this->db->update($table, $data);
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
    public function delete($table,$primaryfield,$id)
    {
        $array = array();
    	$this->db->where($primaryfield,$id);
        $this->db->delete($table);
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
 
    // Check whether a value has duplicates in the database
    public function has_duplicate($value, $tabletocheck, $fieldtocheck)
    {
        $this->db->select($fieldtocheck);
        $this->db->where($fieldtocheck,$value);
        $result = $this->db->get($tabletocheck);
 
        if($result->num_rows() > 0)
        {
            return TRUE;
        }
        else
        {
            return FALSE;
        }
    }
 
    // Check whether the field has any reference from other table
    // Normally to check before delete a value that is a foreign key in another table
    public function has_child($value, $tabletocheck, $fieldtocheck)
    {
        $this->db->select($fieldtocheck);
        $this->db->where($fieldtocheck,$value);
        $result = $this->db->get($tabletocheck);
 
        if($result->num_rows() > 0) {
            return true;
        }
        else {
            return false;
        }
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

    public function get_from_join($data)
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
                "limit" => ["start" => 1, "end" => 5],
                "order_by" => ["column" => "A.Name", "Type" => 'ASC'],                
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
						$this->db->where($where['column'],$where['value']);
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
        return $array;
    }
}