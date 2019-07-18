
function inilize()
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
      get_product_data();
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


function get_product_data()
{
  
   eval('man = $( "#wareHouseInternalName" ).val()');
   getpicscript="Obj=[];data.imageModule.imagePathList.forEach(function(c,i,arr){Ob={};Ob.UploadPictureUrl=c;Ob.DisplayOrder=i;Obj.push(Ob)});Obj";

   WarehouseInventory = "function getSingleAttributeWarehouse(){return wareH=[],data.skuModule.productSKUPropertyList||(wob={},wob.StockQuantity=data.skuModule.skuPriceList[0].skuVal.availQuantity,wob.InternalName=null,wareH.push(wob)),wareH} getSingleAttributeWarehouse()";


   AttributeCombinations='function getCombination(t){if(get_combi_arry=[],t)return t.split(",").forEach(function(t,r){aa={},"Ships From"!=data.skuModule.productSKUPropertyList[r].skuPropertyName&&(aa.AttributeInternalName=data.skuModule.productSKUPropertyList[r].skuPropertyName,aa.AttributeValueInternalName=g_attr[r][t],get_combi_arry.push(aa))}),get_combi_arry}function getWarehouseInventory(t){return ware_hos_arr=[],t&&data.skuModule.productSKUPropertyList&&(bb={},bb.StockQuantity=t.availQuantity,bb.InternalName=man,ware_hos_arr.push(bb)),ware_hos_arr}function check_shiping_from(t){if(t)return first_id={},t.forEach(function(t,r){"Ships From"==t.skuPropertyName&&(first_id={warehouse_id:t.skuPropertyValues[0].propertyValueId,obj_key_at:r,warehousename:t.skuPropertyValues[0].propertyValueDisplayName})}),first_id}ats=[],data.skuModule.skuPriceList.forEach(function(t,r,e){var a=t.skuPropIds.split(",");manf_id=check_shiping_from(data.skuModule.productSKUPropertyList),0!=Object.entries(manf_id).length&&a[manf_id.obj_key_at]==manf_id.warehouse_id&&(Ob={},Ob.Sku=t.skuId.toString(),t.skuPropIds&&(Ob.ProductAttributeCombinations=getCombination(t.skuPropIds)),ats.push(Ob),t.skuVal&&(Ob.WarehouseInventory=getWarehouseInventory(t.skuVal))),0===Object.entries(manf_id).length&&(Ob={},Ob.Sku=t.skuId.toString(),t.skuPropIds&&(Ob.ProductAttributeCombinations=getCombination(t.skuPropIds)),ats.push(Ob),t.skuVal&&(Ob.WarehouseInventory=getWarehouseInventory(t.skuVal)))});ats';


   ProductSpecificatons = "spc=[]; data.specsModule.props.forEach(function(c,i,arr){Ob={};Ob.SpecificationAttributeInternalName=c.attrName;Ob.SpecificationAttributeOptionInternalName=c.attrValue;spc.push(Ob)});spc";
   eval('type_img = "ImageSquares";');


   ProductAttributes = 'function build(r,t){return return_arr=[],g_attr_obj={},g_pa_pd=[],r.forEach(function(r,t,e){bu={},mti=modify_to_internalname(r.propertyValueName),bu.ProductValueInternalName=mti,return_arr.push(bu),g_attr_obj[r.propertyValueId]=mti,g_pa_pd.push(mti)}),g_attr.push(g_attr_obj),g_pro_attr_and_pre_define[t]=g_pa_pd,return_arr}function modify_to_internalname(r){return"g_"+r.split(" ").join("_").toLowerCase()}pro=[],g_attr=[],g_pro_attr_and_pre_define=[],data.skuModule.productSKUPropertyList&&data.skuModule.productSKUPropertyList.forEach(function(r,t,e){"Ships From"!=r.skuPropertyName&&(Ob={},Ob.ProductAttributeInternalName=r.skuPropertyName,Ob.AttributeControlType=type_img,Ob.TextPrompt=r.skuPropertyName,r.skuPropertyValues&&(Ob.ProductAttributeValues=build(r.skuPropertyValues,r.skuPropertyName)),pro.push(Ob))});pro';
   

   productId = "data.actionModule.productId.toString()";
   sizeInfo = "data.skuModule.title";
   ajax_check_proAttr_and_proAttrVal = "g_pro_attr_and_pre_define";

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

   obj1 = 	{
      "ajax_check_proAttr_and_proAttrVal": "eval('"+ajax_check_proAttr_and_proAttrVal+"')"
   };

      var final_obj = createobject(obj);
      
          //final_obj.category = category;
          final_obj.Manufacturers = [$( "#manfacture" ).val()];
          final_obj.Weight = 1;
          final_obj.Length = 1;
          final_obj.Width = 1;
          final_obj.Height = 1;
          final_obj.ShortDescription = "siddhu-sample-desc";
          final_obj.SeName = "siddhu-siddhartha-roy";
          final_obj.PrimaryCategeryName = $( "#category" ).val();
          if(final_obj)
          {
            final_obj.ajaxs = createobject(obj1);
          }
         
          


          

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