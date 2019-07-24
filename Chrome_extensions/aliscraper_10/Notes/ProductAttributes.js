pro=[];
g_attr = [];

if(data.skuModule.productSKUPropertyList)
{
 data.skuModule.productSKUPropertyList.forEach(function(c,i,arr){
		 if(c.skuPropertyName != "Ships From")
		 {
			Ob={};
			Ob.ProductAttributeInternalName=c.skuPropertyName;
			Ob.AttributeControlType=type_img;
			Ob.TextPrompt=c.skuPropertyName;
			if(c.skuPropertyValues)
			{
			  Ob.ProductAttributeValues =	build(c.skuPropertyValues,c.skuPropertyName);				
			}		 
			pro.push(Ob);
		 }
		 
	 });
}	
	
function build(data_array,pro_name)
{
	return_arr = [];
	g_attr_obj = {};	
	 data_array.forEach(function(c,i,arr){
		 bu = {};
		 mti = modify_to_internalname(c.propertyValueName);
		 bu.ProductValueInternalName = mti;
		 return_arr.push(bu);
         g_attr_obj[c.propertyValueId] = mti;       		 
	 });
	 /* 'g_attr' array will help at AttributeCombination array form building */
	 g_attr.push(g_attr_obj);	 
	 return return_arr;
}

function modify_to_internalname(v)
{
	/*As per our internalname storing system, You need to modify the 'c.propertyValueName' value.
	
	ex: 'Sky Blue' to 'g_sky_blue' */
	return "g_"+v.split(' ').join('_').toLowerCase();
}