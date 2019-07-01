
function inilize(logn_obj)
{
    sku_details = document.evaluate("//script[contains(text(),'window.runParams') and contains(text(),'GaData') and contains(text(),'PAGE_TIMING')]", document, null, XPathResult.ANY_TYPE, null).iterateNext().textContent;
    //console.log(sku_details);
   //  data = eval(sku_details).data;

   //  AttributeCombinations="SkuIds = jsonPath(data , \"$.skuModule.skuPriceList[*].skuId\");"
    
   //  eval(AttributeCombinations);
   //    console.log(SkuIds);

   if(sku_details)
   {
      data = eval(sku_details).data;
      get_product_data(data,logn_obj);
      get_attribute_data();  //making attribute data set for inserting or updating 
   }
   
}




function createobject(prd)
{
    allkeys = Reflect.ownKeys(prd);
    for(i=0;i<allkeys.length;i++)
    {
        Reflect.set(prd,allkeys[i],eval(Reflect.get(prd,allkeys[i]))); 
    }
	return prd;
}


function get_product_data(data,logn_obj)
{
   getpicscript="Obj=[];data.imageModule.imagePathList.forEach(function(c,i,arr){Ob={};Ob.UploadPictureUrl=c;Ob.DisplayOrder=i;Obj.push(Ob)});Obj";

   WarehouseInventory = "function getSingleAttributeWarehouse(){return wareH=[],data.skuModule.productSKUPropertyList||(wob={},wob.StockQuantity=data.skuModule.skuPriceList[0].skuVal.availQuantity,wob.InternalName=null,wareH.push(wob)),wareH} getSingleAttributeWarehouse()";


   AttributeCombinations='function getCombination(t){if(get_combi_arry=[],t)return t.split(",").forEach(function(t,r){aa={},"Ships From"!=data.skuModule.productSKUPropertyList[r].skuPropertyName&&(aa.AttributeInternalName=data.skuModule.productSKUPropertyList[r].skuPropertyName,aa.AttributeValueInternalName=g_attr[r][t],get_combi_arry.push(aa))}),get_combi_arry}function getWarehouseInventory(t){return ware_hos_arr=[],t&&data.skuModule.productSKUPropertyList&&(bb={},bb.StockQuantity=t.availQuantity,ware_hos_arr.push(bb)),ware_hos_arr}ats=[],data.skuModule.skuPriceList.forEach(function(t,r,a){Ob={},Ob.Sku=t.skuId.toString(),t.skuPropIds&&(Ob.ProductAttributeCombinations=getCombination(t.skuPropIds)),ats.push(Ob),t.skuVal&&(Ob.WarehouseInventory=getWarehouseInventory(t.skuVal))});ats';


   ProductSpecificatons = "spc=[]; data.specsModule.props.forEach(function(c,i,arr){Ob={};Ob.SpecificationAttributeInternalName=c.attrName;Ob.SpecificationAttributeOptionInternalName=c.attrValue;spc.push(Ob)});spc";
   eval('type_img = "ImageSquares";');


   ProductAttributes = 'function build(r){return return_arr=[],g_attr_obj={},r.forEach(function(r,t,u){bu={},bu.ProductValueInternalName=r.propertyValueName,return_arr.push(bu),g_attr_obj[r.propertyValueId]=r.propertyValueName}),g_attr.push(g_attr_obj),return_arr}pro=[],g_attr=[],data.skuModule.productSKUPropertyList&&data.skuModule.productSKUPropertyList.forEach(function(r,t,u){"Ships From"!=r.skuPropertyName&&(Ob={},Ob.ProductAttributeInternalName=r.skuPropertyName,r.skuPropertyValues&&(Ob.ProductAttributeValues=build(r.skuPropertyValues)),pro.push(Ob))});pro';

   productId = "data.actionModule.productId.toString()";
   sizeInfo = "data.skuModule.title";

   category = logn_obj.category;
   manfacture = logn_obj.manfacture;

   // alert(category);
   // alert(manfacture);

   obj = 	{
      "Sku": productId,
      "ProductType": "'SimpleProduct'",
      "Name": "data.pageModule.title",
      "MetaKeywords": "data.pageModule.keywords",
      "MetaDescription": "data.pageModule.description",
      "MetaTitle": "data.pageModule.title",
      "Pictures": "eval('"+getpicscript+"')",						
      "ProductAttributes": "eval('"+ProductAttributes+"')",			
      "ProductSpecificatons": "eval('"+ProductSpecificatons+"')",
      "WarehouseInventory": "eval('"+WarehouseInventory+"')",
      "AttributeCombinations": "eval('"+AttributeCombinations+"')",			
   };

      var final_obj = createobject(obj);
          //final_obj.category = category;
          final_obj.Manufacturers = [];
          final_obj.Weight = 1;
          final_obj.Length = 1;
          final_obj.Width = 1;
          final_obj.Height = 1;

      console.log(JSON.stringify(final_obj));
}


function get_attribute_data()
{
   Attributes_combi = 'function attr_build(r){return return_arr=[],r.forEach(function(r,e,u){bu={},bu.ProductValueInternalName=r.propertyValueName.replace(" ","_").toLowerCase(),bu.Name=r.propertyValueName,r.skuColorValue&&(bu.ColorSquaresRgb=r.skuColorValue),bu.DisplayOrder=e,return_arr.push(bu)}),return_arr}prodAttr=[],data.skuModule.productSKUPropertyList&&data.skuModule.productSKUPropertyList.forEach(function(r,e,u){"Ships From"!=r.skuPropertyName&&(Ob={},Ob.DisplayName=r.skuPropertyName,Ob.InternalName=r.skuPropertyName.replace(" ","_").toLowerCase(),r.skuPropertyValues&&(Ob.PredefinedProductAttributeValues=attr_build(r.skuPropertyValues)),prodAttr.push(Ob))});prodAttr;';

   attr_obj = {
      "value":"eval('"+Attributes_combi+"')"
   };

   var final_attr_obj = createobject(attr_obj);
   console.log(final_attr_obj);
   console.log(JSON.stringify(final_attr_obj));
}