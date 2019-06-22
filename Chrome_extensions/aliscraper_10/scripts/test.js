getpicscript="Obj=[];data.imageModule.imagePathList.forEach(function(c,i,arr){Ob={};Ob.UploadPictureUrl=c;Ob.DisplayOrder=i;Obj.push(Ob)});Obj";

sku="ats=[]; data.skuModule.skuPriceList.forEach(function(c,i,arr){Ob={};Ob.Sku=c.skuId;ats.push(Ob)});ats";

ProductSpecificatons = "spc=[]; data.specsModule.props.forEach(function(c,i,arr){Ob={};Ob.SpecificationAttributeInternalName=c.attrName;Ob.SpecificationAttributeOptionInternalName=c.attrValue;spc.push(Ob)});spc";

ProductAttributes = "function build(r){return return_arr=[],r.forEach(function(r,u,t){bu={},bu.ProductValueInternalName=r.propertyValueDisplayName,return_arr.push(bu)}),return_arr}pro=[],data.skuModule.productSKUPropertyList.forEach(function(r,u,t){Ob={},Ob.ProductAttributeInternalName=r.skuPropertyName,r.skuPropertyValues&&(Ob.ProductAttributeValues=build(r.skuPropertyValues)),pro.push(Ob)});pro";

obj = 	{
			"ProductType": "'SimpleProduct'",
			"Name": "data.pageModule.title",
			"Pictures": "eval('"+getpicscript+"')",			
			"AttributeCombinations": "eval('"+sku+"')",			
			"ProductAttributes": "eval('"+ProductAttributes+"')",			
			"ProductSpecificatons": "eval('"+ProductSpecificatons+"')",			
		};
		


function createobject(prd)
{
    allkeys = Reflect.ownKeys(prd);
    for(i=0;i<allkeys.length;i++)
    {
        Reflect.set(prd,allkeys[i],eval(Reflect.get(prd,allkeys[i]))); 
    }
	console.log(prd);
}