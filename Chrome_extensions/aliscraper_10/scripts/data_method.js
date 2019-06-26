
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

   AttributeCombinations='function getCombination(t){if(get_combi_arry=[],t)return t.split(",").forEach(function(t,a){aa={},aa.AttributeInternalName=data.skuModule.productSKUPropertyList[a].skuPropertyName,aa.AttributeValueInternalName=g_attr[a][t],get_combi_arry.push(aa)}),get_combi_arry}function getWarehouseInventory(t){if(ware_hos_arr=[],t)return bb={},bb.StockQuantity=t.availQuantity,ware_hos_arr.push(bb),ware_hos_arr}ats=[],data.skuModule.skuPriceList.forEach(function(t,a,r){Ob={},Ob.Sku=t.skuId,t.skuPropIds&&(Ob.ProductAttributeCombinations=getCombination(t.skuPropIds)),ats.push(Ob),t.skuVal&&(Ob.WarehouseInventory=getWarehouseInventory(t.skuVal))});ats';


   ProductSpecificatons = "spc=[]; data.specsModule.props.forEach(function(c,i,arr){Ob={};Ob.SpecificationAttributeInternalName=c.attrName;Ob.SpecificationAttributeOptionInternalName=c.attrValue;spc.push(Ob)});spc";

   eval('type_img = "ImageSquares";');
   ProductAttributes = "function build(r){return return_arr=[],g_attr_obj={},r.forEach(function(r,t,u){bu={},bu.ProductValueInternalName=r.propertyValueDisplayName,bu.ImageSquaresPictureUrl=r.skuPropertyImageSummPath,bu.PictureUrl=r.skuPropertyImagePath,return_arr.push(bu),g_attr_obj[r.propertyValueId]=r.propertyValueName}),g_attr.push(g_attr_obj),return_arr}pro=[],g_attr=[],data.skuModule.productSKUPropertyList.forEach(function(r,t,u){Ob={},Ob.ProductAttributeInternalName=r.skuPropertyName,Ob.AttributeControlType=type_img,r.skuPropertyValues&&(Ob.ProductAttributeValues=build(r.skuPropertyValues)),pro.push(Ob)});pro";

   productId = "data.actionModule.productId";

   category = logn_obj.category;
   manfacture = logn_obj.manfacture;

   // alert(category);
   // alert(manfacture);

   obj = {
            "ProductType": "'SimpleProduct'",
            "Name": "data.pageModule.title",            
            "Sku": productId,            
            "Pictures": "eval('"+getpicscript+"')",						
            "ProductAttributes": "eval('"+ProductAttributes+"')",			
            "ProductSpecificatons": "eval('"+ProductSpecificatons+"')",
            "AttributeCombinations": "eval('"+AttributeCombinations+"')",           			
         };

      var final_obj = createobject(obj);
          final_obj.category = category;
          final_obj.manfacture = manfacture;

      console.log(JSON.stringify(final_obj));
}















/* JSONPath 0.8.0 - XPath for JSON
 *
 * Copyright (c) 2007 Stefan Goessner (goessner.net)
 * Licensed under the MIT (MIT-LICENSE.txt) licence.
 */
function jsonPath(obj, expr, arg) {
    var P = {
       resultType: arg && arg.resultType || "VALUE",
       result: [],
       normalize: function(expr) {
          var subx = [];
          return expr.replace(/[\['](\??\(.*?\))[\]']/g, function($0,$1){return "[#"+(subx.push($1)-1)+"]";})
                     .replace(/'?\.'?|\['?/g, ";")
                     .replace(/;;;|;;/g, ";..;")
                     .replace(/;$|'?\]|'$/g, "")
                     .replace(/#([0-9]+)/g, function($0,$1){return subx[$1];});
       },
       asPath: function(path) {
          var x = path.split(";"), p = "$";
          for (var i=1,n=x.length; i<n; i++)
             p += /^[0-9*]+$/.test(x[i]) ? ("["+x[i]+"]") : ("['"+x[i]+"']");
          return p;
       },
       store: function(p, v) {
          if (p) P.result[P.result.length] = P.resultType == "PATH" ? P.asPath(p) : v;
          return !!p;
       },
       trace: function(expr, val, path) {
          if (expr) {
             var x = expr.split(";"), loc = x.shift();
             x = x.join(";");
             if (val && val.hasOwnProperty(loc))
                P.trace(x, val[loc], path + ";" + loc);
             else if (loc === "*")
                P.walk(loc, x, val, path, function(m,l,x,v,p) { P.trace(m+";"+x,v,p); });
             else if (loc === "..") {
                P.trace(x, val, path);
                P.walk(loc, x, val, path, function(m,l,x,v,p) { typeof v[m] === "object" && P.trace("..;"+x,v[m],p+";"+m); });
             }
             else if (/,/.test(loc)) { // [name1,name2,...]
                for (var s=loc.split(/'?,'?/),i=0,n=s.length; i<n; i++)
                   P.trace(s[i]+";"+x, val, path);
             }
             else if (/^\(.*?\)$/.test(loc)) // [(expr)]
                P.trace(P.eval(loc, val, path.substr(path.lastIndexOf(";")+1))+";"+x, val, path);
             else if (/^\?\(.*?\)$/.test(loc)) // [?(expr)]
                P.walk(loc, x, val, path, function(m,l,x,v,p) { if (P.eval(l.replace(/^\?\((.*?)\)$/,"$1"),v[m],m)) P.trace(m+";"+x,v,p); });
             else if (/^(-?[0-9]*):(-?[0-9]*):?([0-9]*)$/.test(loc)) // [start:end:step]  phyton slice syntax
                P.slice(loc, x, val, path);
          }
          else
             P.store(path, val);
       },
       walk: function(loc, expr, val, path, f) {
          if (val instanceof Array) {
             for (var i=0,n=val.length; i<n; i++)
                if (i in val)
                   f(i,loc,expr,val,path);
          }
          else if (typeof val === "object") {
             for (var m in val)
                if (val.hasOwnProperty(m))
                   f(m,loc,expr,val,path);
          }
       },
       slice: function(loc, expr, val, path) {
          if (val instanceof Array) {
             var len=val.length, start=0, end=len, step=1;
             loc.replace(/^(-?[0-9]*):(-?[0-9]*):?(-?[0-9]*)$/g, function($0,$1,$2,$3){start=parseInt($1||start);end=parseInt($2||end);step=parseInt($3||step);});
             start = (start < 0) ? Math.max(0,start+len) : Math.min(len,start);
             end   = (end < 0)   ? Math.max(0,end+len)   : Math.min(len,end);
             for (var i=start; i<end; i+=step)
                P.trace(i+";"+expr, val, path);
          }
       },
       eval: function(x, _v, _vname) {
          try { return $ && _v && eval(x.replace(/@/g, "_v")); }
          catch(e) { throw new SyntaxError("jsonPath: " + e.message + ": " + x.replace(/@/g, "_v").replace(/\^/g, "_a")); }
       }
    };
 
    var $ = obj;
    if (expr && obj && (P.resultType == "VALUE" || P.resultType == "PATH")) {
       P.trace(P.normalize(expr).replace(/^\$;/,""), obj, "$");
       return P.result.length ? P.result : false;
    }
 } 

