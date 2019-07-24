ats = [];
data.skuModule.skuPriceList.forEach(function(c, i, arr) {
	var arrb = c.skuPropIds.split(",");
	manf_id = check_shiping_from(data.skuModule.productSKUPropertyList);
	if(Object.entries(manf_id).length != 0) //for ships form. its take 1 shipping country
	{
		if(arrb[manf_id.obj_key_at] == manf_id.warehouse_id)
		{
			Ob = {};			
			Ob.Sku = c.skuId.toString();
			if(c.skuPropIds)
			{
				Ob.ProductAttributeCombinations = getCombination(c.skuPropIds);			
			}		
			ats.push(Ob);
			
			if(c.skuVal)
			{
				Ob.WarehouseInventory = getWarehouseInventory(c.skuVal);				
			}
		}
	}
	
	if(Object.entries(manf_id).length === 0) // for non ships from
	{
		Ob = {};
		Ob.Sku = c.skuId.toString();
		if(c.skuPropIds)
		{
			Ob.ProductAttributeCombinations = getCombination(c.skuPropIds);			
		}		
		ats.push(Ob);
		
		if(c.skuVal)
		{
			Ob.WarehouseInventory = getWarehouseInventory(c.skuVal);			
		}
	}	
	
});


function getCombination(str)
{
	get_combi_arry = [];
	
	if(str)
	{
		var arr = str.split(",");				
		arr.forEach(function(cv,i){
			aa = {};
			if(data.skuModule.productSKUPropertyList[i].skuPropertyName != 'Ships From')
			{
				aa.AttributeInternalName = data.skuModule.productSKUPropertyList[i].skuPropertyName;
				/* below 'g_attr' array will form on productAttributes */
				aa.AttributeValueInternalName = g_attr[i][cv];
				get_combi_arry.push(aa);
			}			
		});
		
		return get_combi_arry;
	}	
}


function getWarehouseInventory(wstr)
{
	ware_hos_arr = [];
	if(wstr && data.skuModule.productSKUPropertyList)
	{
		bb = {};
		bb.StockQuantity = wstr.availQuantity;
		bb.InternalName = man;
		ware_hos_arr.push(bb);		
	}
	return ware_hos_arr;
}


function check_shiping_from(prds)
{
  if(prds)
  {
    first_id = {};   
    prds.forEach(function(v,k){    
      if(v.skuPropertyName == 'Ships From')
      {       
        first_id = {
						'warehouse_id':v.skuPropertyValues[0].propertyValueId,
						'obj_key_at':k,
						'warehousename':v.skuPropertyValues[0].propertyValueDisplayName
					};        
      }
    });
    return first_id;
  }
}