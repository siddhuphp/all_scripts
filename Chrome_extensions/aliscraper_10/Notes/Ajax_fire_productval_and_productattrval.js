g_pro_attr_and_pre_define = {};

if(data.skuModule.productSKUPropertyList)
{
 data.skuModule.productSKUPropertyList.forEach(function(c,i,arr){
		 if(c.skuPropertyName != "Ships From")
		 {			
			if(c.skuPropertyValues)
			{
			  build_g_pro_attr_and_pre_define(c.skuPropertyValues,c.skuPropertyName);
			}		
		 }		 
	 });
}	
	
function build_g_pro_attr_and_pre_define(data_array,pro_name)
{	
	g_pa_pd = [];
	data_array.forEach(function(c,i,arr){		 
		 mti = modify_to_internalname_2(c.propertyValueName);
		 af = {};
		 af.internalName = mti;       		 
		 af.displayName = c.propertyValueDisplayName;
		 g_pa_pd.push(af);
	 });	
	 /* 'g_pro_attr_and_pre_define' this will help at to check productAttributes and ProductAttributeValues for Ajax fire */
	 g_pro_attr_and_pre_define[pro_name] = g_pa_pd;	 
}

function modify_to_internalname_2(v)
{
	/*As per our internalname storing system, You need to modify the 'c.propertyValueName' value.
	
	ex: 'Sky Blue' to 'g_sky_blue' */
	return "g_"+v.split(' ').join('_').toLowerCase();
}