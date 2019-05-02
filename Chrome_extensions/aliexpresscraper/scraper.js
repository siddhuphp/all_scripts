// Scraper pasar fountion
//var script = document.createElement('script'); 
//script.src = '//code.jquery.com/jquery-1.11.0.min.js';
//script.src = "js/jquery.min.js";
//document.getElementsByTagName('head')[0].appendChild(script);

// ***********************************lightinthebox*************************************
if (document.URL.indexOf('www.lightinthebox.com') != -1)
{
  var Object_Arrays = []

  var aliEx_ID = ''
  var aliEx_Title = ''
  var aliEx_Category = ''
  var aliEx_ShipFee = ''
  var aliEx_Price = ''
  var aliEx_Weight = ''
  var aliEx_Description = ''
  var aliEx_URL = ''
  var aliEx_Size = ''
  var aliEx_Option = ''
  var aliEx_Package_Detail = ''
  var aliEx_Images
  var Object_Arrays = []

  aliEx_ID = document.getElementsByClassName("item-id")[0].innerText.replace("#", "");
  aliEx_Title = document.getElementsByTagName("h1")[0].innerText.replace("#" + aliEx_ID, "");
  aliEx_Price = document.getElementsByClassName("sale-price")[0].innerText.replace(",", "").replace("$", "");
 
  //parent = document.querySelector('.attr-list-select');
  parg = document.getElementsByClassName('attr-list-select');
    
  for (var i = 0; i < parg.length; i++) 
  {
    var options=parg[i].getElementsByTagName('option')
    
    if (options.length > 2)
    {
      for (var j = 0; j < options.length; j++) 
      {
            
          aliEx_Option = aliEx_Option + " " + options[j].innerText.replace(/ /g,'').replace(/\//g,'-');                    
       
      };
      aliEx_Option = aliEx_Option + "|";      
    }

  };
  aliEx_Option = aliEx_Option.slice(0,-1);
  console.log(aliEx_Option);

  if (document.getElementsByClassName('specTitle')[0])
  {
    aliEx_Description = document.getElementsByClassName('specTitle')[0].innerText;
  }

  if (document.getElementsByClassName('bigTitle')[0])
  {
    aliEx_Description = 'Fabric:  '+document.getElementsByClassName('bigTitle')[0].getElementsByTagName('td')[5].innerText.replace(' ','&');
  }
  
  aliEx_Description = aliEx_Description.replace(/\r?\n/gi, '<br>')
  aliEx_Description = aliEx_Description.replace(/,/gi, ' ')
  aliEx_Description = aliEx_Description.replace(/lightinthebox/gi, '')
  aliEx_Description = aliEx_Description.replace(/\t/gi, '')
  aliEx_Description = aliEx_Description.replace("What's in the box", 'Pakage: ')
 
  console.log(aliEx_Description);
  /*
 
  if (document.getElementsByClassName("ProductTabSection__ShippingPrice-fafiYb").length > 0)
  {
    aliEx_ShipFee = document.getElementsByClassName("ProductTabSection__ShippingPrice-fafiYb")[0].innerHTML.slice(1, -3).replace(",", "");
    console.log(aliEx_ShipFee);
  }
  
 */

  aliEx_URL = document.URL; 
  
  if (aliEx_ShipFee == "") aliEx_ShipFee = 0;

  Object_Arrays[0] = aliEx_ID
  Object_Arrays[1] = aliEx_Title
  Object_Arrays[2] = aliEx_Category
  Object_Arrays[3] = aliEx_ShipFee
  Object_Arrays[4] = aliEx_Price
  Object_Arrays[5] = aliEx_Weight
  Object_Arrays[6] = aliEx_Description
  Object_Arrays[7] = aliEx_URL
  Object_Arrays[8] = aliEx_Size
  Object_Arrays[9] = aliEx_Option

  var aliEx_Images = document.getElementsByClassName("item");
  console.log(aliEx_Images.length);

  for (var i = 0; i < aliEx_Images.length; i++)
  {
    
    if (aliEx_Images[i].getAttribute('data-pos'))
    {
      Object_Arrays[i + 10] = aliEx_Images[i].getElementsByTagName("img")[0].getAttribute('src').replace("50x50", "600x600");
      Object_Arrays[i + 10] = aliEx_Images[i].getElementsByTagName("img")[0].getAttribute('src').replace("64x84", "600x600");
      console.log(Object_Arrays[i + 10]);
    }  
  }
  
}

// ***********************************wish*************************************
if (document.URL.indexOf('www.wish.com') != -1)
{
  var Object_Arrays = []

  var aliEx_ID = ''
  var aliEx_Title = ''
  var aliEx_Category = ''
  var aliEx_ShipFee = ''
  var aliEx_Price = ''
  var aliEx_Weight = ''
  var aliEx_Description = ''
  var aliEx_URL = ''
  var aliEx_Size = ''
  var aliEx_Option = ''
  var aliEx_Package_Detail = ''
  var aliEx_Images
  var Object_Arrays = []

  
  aliEx_Title = document.getElementsByClassName("ProductItem__ProductName-kKIQof")[0].innerText;
  
  aliEx_Price = document.getElementsByClassName("ProductItem__ActualPrice-glZWXu")[0].innerHTML.slice(1).replace(",","");
  console.log(aliEx_Price);
  if (document.getElementsByClassName("ProductTabSection__ShippingPrice-fafiYb").length > 0)
  {
    aliEx_ShipFee = document.getElementsByClassName("ProductTabSection__ShippingPrice-fafiYb")[0].innerHTML.slice(1, -3).replace(",", "");
    console.log(aliEx_ShipFee);
  }
  
  options = document.getElementsByClassName('DimensionSelect__SelectedLabel-jmnEFq');
  if (options.length > 0)
  {
    for (var i = 0; i < options.length; i++)
    {
      aliEx_Option = aliEx_Option +" "+options[i].innerText;
      
    }  
  }
  
  if (document.getElementsByClassName("ProductDescription__TextContainer-fqpvXz").length > 0)
  {
    //console.log(document.getElementsByClassName("ProductDescription__TextContainer-fqpvXz")[0].innerHTML);
    aliEx_Description = document.getElementsByClassName("ProductDescription__TextContainer-fqpvXz")[0].innerText;

    aliEx_Description = aliEx_Description.replace(/\r?\n/gi, '<br>')
    aliEx_Description = aliEx_Description.replace(/,/gi, ' ')
    aliEx_Description = aliEx_Description.replace(/lightinthebox/gi, '')
    aliEx_Description = aliEx_Description.replace(/\t/gi, '')
    aliEx_Description = aliEx_Description.replace("What's in the box", 'Pakage: ')

  };  

  aliEx_URL = document.URL;
  aliEx_ID = aliEx_URL.substr(-24);
 

  if (aliEx_ShipFee == "") aliEx_ShipFee = 0;

  Object_Arrays[0] = aliEx_ID
  Object_Arrays[1] = aliEx_Title
  Object_Arrays[2] = aliEx_Category
  Object_Arrays[3] = aliEx_ShipFee
  Object_Arrays[4] = aliEx_Price
  Object_Arrays[5] = aliEx_Weight
  Object_Arrays[6] = aliEx_Description
  Object_Arrays[7] = aliEx_URL
  Object_Arrays[8] = aliEx_Size
  Object_Arrays[9] = aliEx_Option  
  
  var aliEx_Images = document.getElementsByClassName("ProductItem__PhotoStripImage-bvIfxg");

  for (var i = 0; i < aliEx_Images.length; i++)
  {    
    Object_Arrays[i + 10] = aliEx_Images[i].getAttribute('src').replace('small', 'large');
    var index = Object_Arrays[i + 10].indexOf("tiny");
    if ( index> 0)
    {
      Object_Arrays[i + 10] = Object_Arrays[i + 10].slice(0,index)+"large.jpg"
    }

    console.log(Object_Arrays[i + 10]);
  }


}

// ***********************************amazon.co.jp*************************************
if (document.URL.indexOf('www.amazon.co.jp') != -1)
{
  var Object_Arrays = []

  var aliEx_ID = ''
  var aliEx_Title = ''
  var aliEx_Category = ''
  var aliEx_ShipFee = ''
  var aliEx_Price = ''
  var aliEx_Weight = ''
  var aliEx_Description = ''
  var aliEx_URL = ''
  var aliEx_Size = ''
  var aliEx_Option = ''
  var aliEx_Package_Detail = ''
  var aliEx_Images
  var Object_Arrays = []

  var taglist = document.getElementsByTagName('td');
  
  for (var i = 0; i < taglist.length; i++)
  {

    if (taglist.item(i).innerText == "ASIN")
    {
      aliEx_ID = "JP-"+taglist[i].nextElementSibling.innerText;
      console.log(aliEx_ID);
      break;
    };

  }
  
  aliEx_Title = document.getElementById('productTitle').innerHTML.trim();
 
  aliEx_Price = document.getElementsByClassName('a-color-price')[0].innerText.replace("￥ ","").replace(",","");
  
  aliEx_Weight = document.getElementsByClassName('shipping-weight')[0].getElementsByTagName('td')[1].innerText;
  //console.log(aliEx_Weight);

  aliEx_URL = document.URL;

  if (aliEx_ShipFee == "") aliEx_ShipFee = 0;
  
  var images = document.getElementsByClassName('imageThumbnail');
     
  for (var i = 0; i < images.length; i++)
  {    
    //console.log(images[i].getElementsByTagName('img')[0].getAttribute('src').replace(/._[0-9A-Z]+_./,"."));
    Object_Arrays[i + 10] = images[i].getElementsByTagName('img')[0].getAttribute('src').replace(/._[0-9A-Z]+_./, ".");    
  }
 
  aliEx_Description = document.getElementById('productDescription').innerText;
  aliEx_Description = aliEx_Description.replace(/\r?\n/gi, '<br>')
  aliEx_Description = aliEx_Description.replace(/,/gi, ' ')
  aliEx_Description = aliEx_Description.replace(/Amazon/gi, '')
  aliEx_Description = aliEx_Description.replace(/\t/gi, '')
  //console.log(aliEx_Description)

  if (document.getElementsByClassName('selection').length>0)
  {
    aliEx_Option = document.getElementsByClassName('selection')[0].innerText;
    console.log(aliEx_Option);
  }  
   
  Object_Arrays[0] = aliEx_ID
  Object_Arrays[1] = aliEx_Title
  Object_Arrays[2] = aliEx_Category
  Object_Arrays[3] = aliEx_ShipFee
  Object_Arrays[4] = aliEx_Price
  Object_Arrays[5] = aliEx_Weight
  Object_Arrays[6] = aliEx_Description
  Object_Arrays[7] = aliEx_URL
  Object_Arrays[8] = aliEx_Size
  Object_Arrays[9] = aliEx_Option  
    
}

// ***********************************amazon.com*************************************
if (document.URL.indexOf('www.amazon.com') != -1)
{
  var Object_Arrays = []

  var aliEx_ID = ''
  var aliEx_Title = ''
  var aliEx_Category = ''
  var aliEx_ShipFee = ''
  var aliEx_Price = ''
  var aliEx_Weight = ''
  var aliEx_Description = ''
  var aliEx_URL = ''
  var aliEx_Size = ''
  var aliEx_Option = ''
  var aliEx_Package_Detail = ''
  var aliEx_Images
  var Object_Arrays = []

  //var taglist = document.getElementsByTagName('th');
  var taglist = document.getElementsByClassName('a-list-item');  

  for (var i = 0; i < taglist.length; i++)
  {
    //console.log(taglist.item(i).innerText);
    if (taglist.item(i).innerText.indexOf('ASIN:') != -1)
    {
      aliEx_ID = taglist.item(i).innerText.replace("ASIN:","");
      console.log(aliEx_ID);
      //break;
    };

    if (taglist.item(i).innerText.indexOf('Shipping Weight:') != -1 )
    {
      aliEx_Weight =taglist.item(i).innerText.replace("Shipping Weight:", "");
      console.log(aliEx_Weight);
      //break;
    };

    if (taglist.item(i).innerText.indexOf('Package Dimensions:') != -1)
    {
      aliEx_Size = taglist[i].innerText.replace("Package Dimensions: ", "");
      console.log(aliEx_Size);
      //break;
    };

  }

  var taglist = document.getElementsByTagName('th');

  for (var i = 0; i < taglist.length; i++)
  {

    if (taglist.item(i).innerText == "ASIN")
    {
      aliEx_ID = taglist[i].nextElementSibling.innerText;
      console.log(aliEx_ID);
      
    };
  
    if (taglist.item(i).innerText == "Shipping Weight")
    {
      aliEx_Weight = taglist[i].nextElementSibling.innerText;
      console.log(aliEx_Weight);
     
    };

    if (taglist.item(i).innerText == "Product Dimensions")
    {
      aliEx_Size = taglist[i].nextElementSibling.innerText;
      console.log(aliEx_Size);
     
    };

  }

  if (aliEx_ID == "") aliEx_ID = "R"+Math.floor((Math.random() * 100000000) + 1);
  
  aliEx_Title = document.getElementById('productTitle').innerHTML.trim();
  
  aliEx_Price = document.getElementsByClassName('a-color-price')[0].innerHTML.replace("￥ ", "").replace(",", "");
 
  //aliEx_Weight = document.getElementsByClassName('shipping-weight')[0].getElementsByTagName('td')[1].innerHTML;
  //console.log(aliEx_Weight);

  aliEx_URL = document.URL;

  if (aliEx_ShipFee == "") aliEx_ShipFee = 0;
 
  //var images = document.getElementsByClassName('image');
  var images = document.getElementsByClassName('imageThumbnail');
  for (var i = 0; i < images.length; i++)
  {
    //console.log(images[i].getElementsByTagName('img')[0].getAttribute('src'));
    Object_Arrays[i + 10] = images[i].getElementsByTagName('img')[0].getAttribute('src').replace(/[0-9A-Z,]+_./g, "").replace("_", "").replace(".jpg", "._US600_.jpg");
    console.log(Object_Arrays[i + 10]);
  }

  if (document.getElementById('productDescription')) { 
  aliEx_Description = document.getElementById('productDescription').innerText;
  aliEx_Description = aliEx_Description.replace(/\r?\n/gi, '<br>')
  aliEx_Description = aliEx_Description.replace(/,/gi, ' ')
  aliEx_Description = aliEx_Description.replace(/AliExpress/gi, '')
  aliEx_Description = aliEx_Description.replace(/\t/gi, '')
  console.log(aliEx_Description)
}
   
  if (document.getElementsByClassName('selection').length > 0)
  {
    aliEx_Option = document.getElementsByClassName('selection')[0].innerText;
    console.log(aliEx_Option);
  }
  
  
  Object_Arrays[0] = aliEx_ID
  Object_Arrays[1] = aliEx_Title
  Object_Arrays[2] = aliEx_Category
  Object_Arrays[3] = aliEx_ShipFee
  Object_Arrays[4] = aliEx_Price
  Object_Arrays[5] = aliEx_Weight
  Object_Arrays[6] = aliEx_Description
  Object_Arrays[7] = aliEx_URL
  Object_Arrays[8] = aliEx_Size
  Object_Arrays[9] = aliEx_Option

}

// ***********************************ebay.com*************************************
if (document.URL.indexOf('www.ebay.com') != -1)
{
  var Object_Arrays = []

  var aliEx_ID = ''
  var aliEx_Title = ''
  var aliEx_Category = ''
  var aliEx_ShipFee = ''
  var aliEx_Price = ''
  var aliEx_Weight = ''
  var aliEx_Description = ''
  var aliEx_URL = ''
  var aliEx_Size = ''
  var aliEx_Option = ''
  var aliEx_Package_Detail = ''
  var aliEx_Images
  var Object_Arrays = []


 
  aliEx_ID = "R" + Math.floor((Math.random() * 100000000) + 1);

  aliEx_Title = document.getElementById('itemTitle').innerText.trim();
  
  aliEx_Price = document.getElementById('prcIsum').innerText.trim().replace("US $", "").replace(",", "");

  aliEx_ShipFee = document.getElementById('fshippingCost').innerText.trim();
  
  if (aliEx_ShipFee == "FREE") aliEx_ShipFee = 0;
  if (aliEx_ShipFee == "") aliEx_ShipFee = 0;

  //aliEx_Weight = document.getElementsByClassName('shipping-weight')[0].getElementsByTagName('td')[1].innerHTML;
  //console.log(aliEx_Weight);
  
  aliEx_URL = document.URL;
  
  var images = document.getElementsByClassName('tdThumb');
  for (var i = 0; i < images.length/2; i++)
  {
    Object_Arrays[i + 10] = images[i].getElementsByTagName('img')[0].getAttribute('src').replace("s-l64", "s-l1600");
    console.log(Object_Arrays[i + 10]);
  }
 
  
  if (document.getElementById('msku-sel-1'))
  {
    Option = document.getElementById('msku-sel-1').getElementsByTagName("option");
    for (var i = 0; i < Option.length; i++)
    {
      aliEx_Option = aliEx_Option + Option[i].innerText.replace(/-/g, "").replace(/Select/g, "Option1") + " ";
    }
    console.log(aliEx_Option);
  }


  if (document.getElementById('msku-sel-2'))
  {
    Option = document.getElementById('msku-sel-2').getElementsByTagName("option");
    for (var i = 0; i < Option.length; i++)
    {
      aliEx_Option = aliEx_Option + Option[i].innerText.replace(/-/g, "").replace(/Select/g, "Option2") + " ";
    }
    console.log(aliEx_Option);
  }
  
  var desc_details = document.getElementsByClassName('desc_details');
  for (var i = 0; i < desc_details.length; i++)
  {
    aliEx_Description = aliEx_Description + desc_details[i].getElementsByTagName("p")[10].innerText;
  }
  
  //if (document.getElementsByClassName('desc_details'))
  //{
    //aliEx_Description = document.getElementsByClassName('desc_details')[0][0].innerHTML;
    //aliEx_Description = aliEx_Descripton.replace(/\r?\n/gi, '<br>')
    //aliEx_Description = aliEx_Description.replace(/,/gi, ' ')
    //aliEx_Description = aliEx_Description.replace(/AliExpress/gi, '')
    //aliEx_Description = aliEx_Description.replace(/\t/gi, '')
    
  //aliEx_Description = document.getElementById('itmShortDesc')[0].innerHTML;
  
    console.log(aliEx_Description)
  //}
  
 
  Object_Arrays[0] = aliEx_ID
  Object_Arrays[1] = aliEx_Title
  Object_Arrays[2] = aliEx_Category
  Object_Arrays[3] = aliEx_ShipFee
  Object_Arrays[4] = aliEx_Price
  Object_Arrays[5] = aliEx_Weight
  Object_Arrays[6] = aliEx_Description
  Object_Arrays[7] = aliEx_URL
  Object_Arrays[8] = aliEx_Size
  Object_Arrays[9] = aliEx_Option
 
}


// ***********************************AliExpress*************************************
if (document.URL.indexOf('www.aliexpress.com') != -1) {
  var Object_Arrays = []

  var aliEx_ID = ''
  var aliEx_Title = ''
  var aliEx_Category = ''
  var aliEx_ShipFee = 0
  var aliEx_Price = ''
  var aliEx_Weight = ''
  var aliEx_Description = ''
  var aliEx_URL = ''
  var aliEx_Size = ''
  var aliEx_Option = ''
  var aliEx_Package_Detail = ''
  var aliEx_Images
  var Object_Arrays = []

  aliEx_ID = document.getElementsByName('objectId')[0].getAttribute('value')
  console.log(aliEx_ID)

  aliEx_Title = aliEx_getTitleContent()
  // console.log(document.getElementsByTagName("title")[0].innerHTML)
  var index = aliEx_Title.search('-in')
  if (index > 0) {
    aliEx_Title = aliEx_Title.substring(0, index)
  }

  var index = aliEx_Title.search('from')
  if (index > 0) {
    aliEx_Title = aliEx_Title.substring(0, index)
  }

  aliEx_Title = aliEx_Title.replace('Aliexpress.com :', '')
  aliEx_Title = aliEx_Title.replace('Buy ', '')

  // console.log(index)
  console.log(aliEx_Title)

  aliEx_URL = 'https:' + aliEx_getURLContent()
  console.log(aliEx_URL)

  var aliEx_PWS = []
  aliEx_PWS = aliEx_getPWSOContent()
  aliEx_Price = aliEx_PWS[0]
  aliEx_Weight = aliEx_PWS[1]
  aliEx_Size = aliEx_PWS[2]

  aliEx_ShipFee = document.getElementsByClassName('logistics-cost')[0].innerText.replace("US $", "");
  
  if (aliEx_ShipFee == "Free Shipping") aliEx_ShipFee = 0;
  if (aliEx_ShipFee == "") aliEx_ShipFee = 0;

  var aliEx_CSC = []
  //aliEx_CSC = aliEx_getCSCContent()

  //aliEx_Category = aliEx_CSC[0]
  // console.log(aliEx_Category)

  //aliEx_ShipFee = aliEx_CSC[1]
  // console.log(aliEx_ShipFee)

  aliEx_Option = aliEx_getOptionsContent()
  console.log(aliEx_Option)

  aliEx_Images = aliEx_getImagesContent()
  // window.alert('image:\n' + aliEx_Images[2].innerHTML)

  //aliEx_Description = document.getElementById('j-product-description').innerHTML
  aliEx_Description = document.getElementsByClassName('description-content')[0].innerText

   
  aliEx_Description = aliEx_Description.replace(/<a.*?>(.*?)<\/a>/g, '')
  aliEx_Description = aliEx_Description.replace(/<div style="border.*<\/div>/g, '')
  aliEx_Description = aliEx_Description.replace(/<div style="clear.*<\/div>/g, '')
  aliEx_Description = aliEx_Description.replace(/dropshipping/g, '')  
  aliEx_Description = aliEx_Description.replace(/\r?\n/gi, '<br>')
  aliEx_Description = aliEx_Description.replace(/,/gi, ' ')
  aliEx_Description = aliEx_Description.replace(/AliExpress/gi, '')
  aliEx_Description = aliEx_Description.replace(/\t/gi, '')
  aliEx_Description = aliEx_Description.replace(/<br><br><br>/g, '<br>')
  
  var DeleteW = aliEx_Description.indexOf('Shipping')
  if (DeleteW != -1) aliEx_Description = aliEx_Description.slice(0, DeleteW)

  var DeleteW = aliEx_Description.indexOf('Shipment')
  if (DeleteW != -1) aliEx_Description = aliEx_Description.slice(0, DeleteW)


  var DeleteW = aliEx_Description.indexOf('US $')
  if (DeleteW != -1) aliEx_Description = ''

  var DeleteW = aliEx_Description.indexOf('USD')
  if (DeleteW != -1) aliEx_Description = ''
  
  console.log(aliEx_Description)

  aliEx_Package_Detail = document.getElementsByClassName('ui-box pnl-packaging-main')[0].innerHTML  

  Object_Arrays[0] = aliEx_ID
  Object_Arrays[1] = aliEx_Title
  Object_Arrays[2] = aliEx_Category
  Object_Arrays[3] = aliEx_ShipFee
  Object_Arrays[4] = aliEx_Price
  Object_Arrays[5] = aliEx_Weight
  Object_Arrays[6] = aliEx_Description
  Object_Arrays[7] = aliEx_URL
  Object_Arrays[8] = aliEx_Size
  Object_Arrays[9] = aliEx_Option

  for (var i = 0; i < aliEx_Images.length; i++) {

    Object_Arrays[i + 10] = aliEx_Images[i].firstChild.getAttribute('src').replace("_50x50.jpeg", "").replace("_50x50.jpg", "")
    //Object_Arrays[i + 10] = aliEx_Images[i].firstChild.getAttribute('src').replace("_50x50.jpeg", "_300x300.jpeg").replace("_50x50.jpg", "_300x300.jpg")
    console.log(Object_Arrays[i + 10])

  }
}
// *******************************************AliExpress end*****************************************

// *******************************************banggood start****************************************

if (document.URL.indexOf('www.banggood.com') != -1) {
  var Object_Arrays = []

  var aliEx_ID = ''
  var aliEx_Title = ''
  var aliEx_Category = ''
  var aliEx_ShipFee = 0
  var aliEx_Price = ''
  var aliEx_Weight = ''
  var aliEx_Description = ''
  var aliEx_URL = ''
  var aliEx_Size = ''
  var aliEx_Option = ''
  var aliEx_Package_Detail = ''
  var aliEx_Images
  var Object_Arrays = []

  aliEx_ID = document.getElementsByName('products_id')[0].getAttribute('value')
  console.log(aliEx_ID)

  aliEx_Title = bangEx_getTitleContent()
  
  aliEx_Images = bangEx_getImagesContent()

  aliEx_URL = bangEx_getURLContent()
  //console.log(aliEx_URL)

  aliEx_Price = bangEx_getPriceContent()

  aliEx_ShipFee = document.getElementsByClassName('shipping_options')[0].getElementsByClassName('shipping_light')[0].innerText.replace("US$", "");
  console.log(aliEx_ShipFee)
  
  if (aliEx_ShipFee == "Free shipping") aliEx_ShipFee = 0;
  if (aliEx_ShipFee == "") aliEx_ShipFee = 0;

  aliEx_Option = bangEx_getOptionsContent()

  var caAry_len = bangEx_getCategoryContent().length
  aliEx_Category = bangEx_getCategoryContent()[caAry_len - 2]
  //aliEx_ShipFee = bangEx_getCategoryContent()[caAry_len - 1]
  
  if (document.getElementsByClassName('good_tabs_box')[1])
  {
    aliEx_Description = document.getElementsByClassName('good_tabs_box')[1].innerText;
  }
  /*
  if (document.getElementsByClassName('good_tabs_box')[0].innerText.indexOf('Package included') <= 0)
  {
    aliEx_Description = document.getElementsByClassName('good_tabs_box')[1].innerText;
  // }else{
  // aliEx_Description=document.getElementsByClassName('good_tabs_box')[0].innerText;  
  }
  */
  aliEx_Description = aliEx_Description.trim()
  aliEx_Description = aliEx_Description.replace(/\r?\n/gi, '<br>')
  aliEx_Description = aliEx_Description.replace(/,/gi, ' ')
  aliEx_Description = aliEx_Description.replace(/\t/gi, '')
  aliEx_Description = aliEx_Description.replace(/\"/gi, '""')
  aliEx_Description = aliEx_Description.replace(/ </g, '<')
  aliEx_Description = aliEx_Description.replace(/’/gi, '')
  aliEx_Description = aliEx_Description.replace(/<br><br><br><br>/gi, '<br>')
  aliEx_Description = aliEx_Description.replace(/<br><br><br><br>/gi, '<br>')
  aliEx_Description = aliEx_Description.replace(/Banggood/gi, '')
  
  console.log(aliEx_Description)

  Object_Arrays[0] = aliEx_ID
  Object_Arrays[1] = aliEx_Title
  Object_Arrays[2] = aliEx_Category
  Object_Arrays[3] = aliEx_ShipFee
  Object_Arrays[4] = aliEx_Price
  Object_Arrays[5] = aliEx_Weight
  Object_Arrays[6] = aliEx_Description
  Object_Arrays[7] = aliEx_URL
  Object_Arrays[8] = aliEx_Size
  Object_Arrays[9] = aliEx_Option

  for (var i = 0; i < aliEx_Images.length; i++) {

    // Object_Arrays[i+10]=aliEx_Images[i].innerHTML
    // var imgStr=aliEx_Images[i].firstChild.getAttribute("src")
    // var index = imgStr.search(".jpg")
    // Object_Arrays[i+10]=imgStr.substring(0,index+4)
    Object_Arrays[i + 10] = aliEx_Images[i]
  }
}
// *******************************************banggood end***************************************************

// *******************************************taobao start****************************************

// if (document.URL.indexOf('detail.tmall.com') != -1)
if (document.URL.indexOf('item.taobao.com') != -1 || document.URL.indexOf('detail.tmall.com') != -1) {
  var Object_Arrays = []

  var aliEx_ID = ''
  var aliEx_Title = ''
  var aliEx_Category = ''
  var aliEx_ShipFee = ''
  var aliEx_Price = ''
  var aliEx_Weight = ''
  var aliEx_Description = ''
  var aliEx_URL = ''
  var aliEx_Size = ''
  var aliEx_Option = ''
  var aliEx_Package_Detail = ''
  var aliEx_Images
  var Object_Arrays = []

  aliEx_ID = "CN-"+taobaoEx_getIdContent()
  //console.log(aliEx_ID)

  aliEx_Title = document.title
  //console.log(aliEx_Title)

  aliEx_Images = taobaoEx_getImagesContent()

  aliEx_URL=document.URL

  if (document.URL.indexOf('item.taobao.com') != -1) aliEx_Price = document.getElementsByClassName('tb-rmb-num')[0].innerText
  if (document.URL.indexOf('detail.tmall.com') != -1) aliEx_Price = document.getElementsByClassName('tm-price')[1].innerText
 
  /*
  aliEx_Description = document.getElementsByClassName('tm_brandAttr')[0].innerHTML
 
  if (document.getElementsByClassName('good_tabs_box')[0].innerText.indexOf('Package included') <= 0)
  {
    aliEx_Description = document.getElementsByClassName('good_tabs_box')[1].innerText
    // }else{
    // aliEx_Description=document.getElementsByClassName('good_tabs_box')[0].innerText;  
  }


  aliEx_Description = aliEx_Description.trim()
  aliEx_Description = aliEx_Description.replace(/\r?\n/gi, '<br/>')
  aliEx_Description = aliEx_Description.replace(/,/gi, ' ')
  aliEx_Description = aliEx_Description.replace(/\t/gi, '')
  aliEx_Description = aliEx_Description.replace(/\"/gi, '""')
  */
  
  if (aliEx_ShipFee == "") aliEx_ShipFee = 180;

  Object_Arrays[0] = aliEx_ID
  Object_Arrays[1] = aliEx_Title
  Object_Arrays[2] = aliEx_Category
  Object_Arrays[3] = aliEx_ShipFee
  Object_Arrays[4] = aliEx_Price
  Object_Arrays[5] = aliEx_Weight
  Object_Arrays[6] = aliEx_Description
  Object_Arrays[7] = aliEx_URL
  Object_Arrays[8] = aliEx_Size
  Object_Arrays[9] = aliEx_Option

  for (var i = 0; i < aliEx_Images.length; i++) {
    Object_Arrays[i + 10] = aliEx_Images[i]
  }
}
// *******************************************taobao end***************************************************

chrome.extension.sendRequest(Object_Arrays)

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@Aliexpress Function start@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// <meta property="og:url" content="//www.aliexpress.com/item/Drone-MJX-X101-Professional-Drones-FPV-Quadcopter-6Axis-Gyro-Headless-One-Key-Return-vs-CX-20/32536878327.html">
function aliEx_getURLContent () {
  var metas = document.getElementsByTagName('meta')

  for (var i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute('property') == 'og:url') {
      return metas[i].getAttribute('content')
    }
  }
  return 'URL get fail'
}

function aliEx_getTitleContent () {
  var metas = document.getElementsByTagName('meta')

  for (var i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute('property') == 'og:title') {
      return metas[i].getAttribute('content')
    }
  }
  return 'URL get fail'
}

function aliEx_getPWSOContent () {
  var spans = document.getElementsByTagName('span')
  var aliEx_DiscountPrice = ''
  var aliEx_Price = ''
  var aliEx_Weight = ''
  var aliEx_Size = ''

  for (var i = 0; i < spans.length; i++) {
    if (spans[i].innerHTML == 'Price:') {
      aliEx_Price = spans[i + 2].innerHTML
      if (aliEx_Price.indexOf('span') > 0) {aliEx_Price = spans[i + 3].innerHTML + '-' + spans[i + 4].innerHTML}
    // console.log(aliEx_Price)
    // break
    }

    if (spans[i].innerHTML == 'Discount Price:') {
      aliEx_DiscountPrice = spans[i + 2].innerHTML
      if (aliEx_DiscountPrice.indexOf('span') > 0) {aliEx_DiscountPrice = spans[i + 3].innerHTML + '-' + spans[i + 4].innerHTML}
    // console.log(aliEx_Price)
    // break
    }

    if (spans[i].innerHTML == 'Package Weight:') {
      aliEx_Weight = spans[i + 1].innerHTML
    // var index = aliEx_Weight.search("kg")
    // aliEx_Weight=aliEx_Weight.substring(0,index)
    // console.log(aliEx_Weight)
    }

    if (spans[i].innerHTML == 'Package Size:') {
      aliEx_Size = spans[i + 1].innerHTML
    // console.log(aliEx_Size)
    }
  }

  if (aliEx_DiscountPrice.length != 0) {
    aliEx_Price = aliEx_DiscountPrice
  }

  console.log(aliEx_Price)
  console.log(aliEx_Weight)
  console.log(aliEx_Size)

  return Array(aliEx_Price, aliEx_Weight, aliEx_Size)
}

function aliEx_getCSCContent () {
  var spans = document.getElementsByTagName('a')
  var aliEx_Category = ''
  var aliEx_ShipFee = ''

  for (var i = 0; i < spans.length; i++) {
    if (spans[i].innerHTML == 'All Categories') {
      aliEx_Category = spans[i + 1].innerText
      //aliEx_SubCategory = spans[i + 2].innerText
      aliEx_SubCategory = ''
    // break
    }
  }
  console.log(aliEx_Category)
  //console.log(aliEx_SubCategory)

  return Array(aliEx_Category, aliEx_SubCategory)
}

function aliEx_getOptionsContent () {
  var optStr = ''
  var v_dl = document.getElementById('j-product-info-sku').getElementsByTagName('dl')

  for (var i = 0; i < v_dl.length; i++) {
    optStr += v_dl[i].getElementsByTagName('dt')[0].innerText
    optStr += ' '
    v_li = v_dl[i].getElementsByTagName('dd')[0].getElementsByTagName('ul')[0].getElementsByTagName('li')
    for (var j = 0; j < v_li.length; j++) {
      if (v_li[j].innerText != '') {
        optStr += (v_li[j].innerText).replace(/ /g, '-')
      }else {
        optStr += (v_li[j].getElementsByTagName('a')[0].getAttribute('title')).replace(/ /g, '-')
      }

      optStr += ' '
    }
    
    optStr += '|'

  }
  return optStr.slice(0,-1)
}

// <ul class="image-thumb-list" id="j-image-thumb-list">
//					<li><span class="img-thumb-item"><img alt="Cubot V1 Smart Band Sports Waterproof Touch Screen Bracelet for Android IOS with 80mAh Battery Bluetooth 4.0 Alarm Anti-lost" src="https://ae01.alicdn.com/kf/HTB140UvMVXXXXayaXXXq6xXFXXXi/Cubot-V1-Smart-Band-Sports-Waterproof-Touch-Screen-Bracelet-for-Android-IOS-with-80mAh-Battery-Bluetooth.jpg_50x50.jpg"/></span></li>
//					<li><span class="img-thumb-item"><img alt="Cubot V1 Smart Band Sports Waterproof Touch Screen Bracelet for Android IOS with 80mAh Battery Bluetooth 4.0 Alarm Anti-lost" src="https://ae01.alicdn.com/kf/HTB17XQ2MVXXXXb8XXXXq6xXFXXXn/Cubot-V1-Smart-Band-Sports-Waterproof-Touch-Screen-Bracelet-for-Android-IOS-with-80mAh-Battery-Bluetooth.jpg_50x50.jpg"/></span></li>
//					<li><span class="img-thumb-item"><img alt="Cubot V1 Smart Band Sports Waterproof Touch Screen Bracelet for Android IOS with 80mAh Battery Bluetooth 4.0 Alarm Anti-lost" src="https://ae01.alicdn.com/kf/HTB1m0EoMVXXXXc.aXXXq6xXFXXXo/Cubot-V1-Smart-Band-Sports-Waterproof-Touch-Screen-Bracelet-for-Android-IOS-with-80mAh-Battery-Bluetooth.jpg_50x50.jpg"/></span></li>
//					<li><span class="img-thumb-item"><img alt="Cubot V1 Smart Band Sports Waterproof Touch Screen Bracelet for Android IOS with 80mAh Battery Bluetooth 4.0 Alarm Anti-lost" src="https://ae01.alicdn.com/kf/HTB1kQgUMVXXXXbQXpXXq6xXFXXXT/Cubot-V1-Smart-Band-Sports-Waterproof-Touch-Screen-Bracelet-for-Android-IOS-with-80mAh-Battery-Bluetooth.jpg_50x50.jpg"/></span></li>
//					<li><span class="img-thumb-item"><img alt="Cubot V1 Smart Band Sports Waterproof Touch Screen Bracelet for Android IOS with 80mAh Battery Bluetooth 4.0 Alarm Anti-lost" src="https://ae01.alicdn.com/kf/HTB14cgcMVXXXXclaFXXq6xXFXXXm/Cubot-V1-Smart-Band-Sports-Waterproof-Touch-Screen-Bracelet-for-Android-IOS-with-80mAh-Battery-Bluetooth.jpg_50x50.jpg"/></span></li>
//					<li><span class="img-thumb-item"><img alt="Cubot V1 Smart Band Sports Waterproof Touch Screen Bracelet for Android IOS with 80mAh Battery Bluetooth 4.0 Alarm Anti-lost" src="https://ae01.alicdn.com/kf/HTB1Uw.RMVXXXXXzXFXXq6xXFXXXF/Cubot-V1-Smart-Band-Sports-Waterproof-Touch-Screen-Bracelet-for-Android-IOS-with-80mAh-Battery-Bluetooth.jpg_50x50.jpg"/></span></li>
// </ul>
function aliEx_getImagesContent () {
  var images = document.getElementsByClassName('img-thumb-item')
  // var images = images.getElementsByTagName('img'); 

  for (var i = 0; i < images.length; i++) {
    console.log(images[i].firstChild.getAttribute('src'))
  // console.log(images[i].innerHTML)
  }
  return images
}

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@AliExpress Function end@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@banggood Function start@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

function bangEx_getTitleContent () {
  var metas = document.getElementsByTagName('meta')
  // console.log(metas)

  for (var i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute('property') == 'og:title') {
      return metas[i].getAttribute('content')
    }
  }
  return 'URL get fail'
}

function bangEx_getImagesContent () {
  // var images = document.getElementsByClassName('pic'); 
  // var images = images.getElementsByTagName('img'); 
  var j = 0
  var imgs = []
  var images = document.getElementsByTagName('img')

  for (var i = 0; i < images.length; i++) {
    if (images[i].getAttribute('data-src') != null) {
      imgs[j] = images[i].getAttribute('data-src')

      var searchIndex = imgs[j].search('https:')
      if (searchIndex < 0) {
        imgs[j] = 'https:' + img[j]
      }
      j++
    }

    // console.log(images[i].getAttribute('data-src'))

  }

  // console.log(imgs)

  return imgs
}

function bangEx_getURLContent () {
  var metas = document.getElementsByTagName('meta')

  for (var i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute('property') == 'og:url') {
      return metas[i].getAttribute('content')
    }
  }
  return 'URL get fail'
}

function bangEx_getPriceContent () {
  var metas = document.getElementsByTagName('meta')

  for (var i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute('itemprop') == 'price') {
      return metas[i].getAttribute('content')
    }
  }
  return 'URL get fail'
}

/*
<div class="item_box attr" option_id="49">
		<div class="item_name">Mode:</div>
									<a title="RP-SMA male" href="javascript:void(0);" option_id="49" value_id="14095" ori_name="RP-SMA male" oriPrice="0.0000" price_prefix="" class="top_type_tapbar_20161213 attrValues ">RP-SMA male<i></i></a>
												<a title="SMA male" href="javascript:void(0);" option_id="49" value_id="14094" ori_name="SMA male" oriPrice="0.0000" price_prefix="" class="top_type_tapbar_20161213 attrValues ">SMA male<i></i></a>
					        <div class="select_prompt" style="display: none;"><span>Please select a Mode</span></div>
	</div>
		<div class="item_box attr" option_id="1">
		<div class="item_name">Color:</div>
									<a title="Black" href="javascript:void(0);" option_id="1" value_id="24" ori_name="Black" oriPrice="0.0000" price_prefix="" class="top_type_tapbar_20161213 attrValues ">Black<i></i></a>
												<a title="Green" href="javascript:void(0);" option_id="1" value_id="23" ori_name="Green" oriPrice="0.0000" price_prefix="" class="top_type_tapbar_20161213 attrValues ">Green<i></i></a>
												<a title="Orange" href="javascript:void(0);" option_id="1" value_id="26" ori_name="Orange" oriPrice="0.0000" price_prefix="" class="top_type_tapbar_20161213 attrValues ">Orange<i></i></a>
												<a title=" Red" href="javascript:void(0);" option_id="1" value_id="13344" ori_name=" Red" oriPrice="0.0000" price_prefix="" class="top_type_tapbar_20161213 attrValues "> Red<i></i></a>
					        <div class="select_prompt" style="display: none;"><span>Please select a Color</span></div>
	</div>

<div class="item_box shipping" id="item_shipments_box"></div>
		<div class="item_box attr" option_id="1">
		<div class="item_name">Color:</div>
									<a title="Green" href="javascript:void(0);" option_id="1" value_id="23" ori_name="Green" oriPrice="0.0000" price_prefix="" class="top_type_tapbar_20161213 attrValues attrimg ">
				<img onclick="clickAttrPic(this);ga('send', 'event', 'product', 'click');" src="https://img.banggood.com/thumb/other_items//oaupload/banggood/images/DD/B8/1208f11f-93af-4939-b646-6ff9419dc173.jpg" title="Green" viewImage="https://img1.banggood.com/thumb/view//oaupload/banggood/images/DD/B8/1208f11f-93af-4939-b646-6ff9419dc173.jpg" largeImage="https://img3.banggood.com/thumb/large//oaupload/banggood/images/DD/B8/1208f11f-93af-4939-b646-6ff9419dc173.jpg" />
				<i></i></a>
												<a title="Navy" href="javascript:void(0);" option_id="1" value_id="269" ori_name="Navy" oriPrice="0.0000" price_prefix="" class="top_type_tapbar_20161213 attrValues attrimg ">
				<img onclick="clickAttrPic(this);ga('send', 'event', 'product', 'click');" src="https://img2.banggood.com/thumb/other_items//oaupload/banggood/images/3A/64/df430872-e60a-4ca4-afeb-d7bcfba2026e.jpg" title="Navy" viewImage="https://img3.banggood.com/thumb/view//oaupload/banggood/images/3A/64/df430872-e60a-4ca4-afeb-d7bcfba2026e.jpg" largeImage="https://img2.banggood.com/thumb/large//oaupload/banggood/images/3A/64/df430872-e60a-4ca4-afeb-d7bcfba2026e.jpg" />
				<i></i></a>
												<a title="Yellow" href="javascript:void(0);" option_id="1" value_id="31" ori_name="Yellow" oriPrice="0.0000" price_prefix="" class="top_type_tapbar_20161213 attrValues attrimg ">
				<img onclick="clickAttrPic(this);ga('send', 'event', 'product', 'click');" src="https://img.banggood.com/thumb/other_items//oaupload/banggood/images/F8/56/bbe3be92-89c6-47c9-98ac-d8d720cb2e6c.jpg" title="Yellow" viewImage="https://img1.banggood.com/thumb/view//oaupload/banggood/images/F8/56/bbe3be92-89c6-47c9-98ac-d8d720cb2e6c.jpg" largeImage="https://img3.banggood.com/thumb/large//oaupload/banggood/images/F8/56/bbe3be92-89c6-47c9-98ac-d8d720cb2e6c.jpg" />
				<i></i></a>
					        <div class="select_prompt" style="display: none;"><span>Please select a Color</span></div>
	</div>
*/

function bangEx_getOptionsContent () {
  var optStrs = ''
  var v_class = []
  var v_option = []

  /*
  var s = document.getElementsByTagName('a')
  for (var i = 0; i < s.length; i++) {
    if (s[i].getAttribute('class') == 'top_type_tapbar_20161213 attrValues' || s[i].getAttribute('class') == 'top_type_tapbar_20161213 attrValues attrimg') {
      optStrs += s[i].getAttribute('title').replace(/ /g, '-') + ' '
    // console.log(s[i].getAttribute("title").replace(/ /g,"-"))
    }
  }
  */  
  v_class= document.getElementsByClassName('item_box attr')
  //console.log("v_class:"+v_class[0].innerHTML)
  var optStr=[]
  var lg = v_class.length
  if (lg > 2)
  {
    lg = 2
  }
  
  for (var i = 0; i < lg; i++) { 

    optStr[i] = "";
    optStr[i] += v_class[i].getElementsByClassName('item_name')[0].innerText;
    optStr[i] += " ";
     
    v_option = v_class[i].getElementsByTagName('a');
     
        
    for (var j = 0; j < v_option.length; j++)
    { 
                
      if (v_option[j].getAttribute("title"))
      {
        optStr[i] += (v_option[j].getAttribute("title")).replace(/ /g, "-");
        optStr[i] += " ";

      } else
      {
        optStr[i] = "";
        break;
      }
            
    } 
    
    /*
    if ((optStr.trim().length>6) && (optStrs.indexOf(optStr)<0)){
         optStrs+=optStr+""
    }
    */
    
  }      
  
  //if (optStrs.length == 6) { optStrs = ''; }
  if (optStr[0] != "" && optStr[0] != undefined)
  {
    console.log(optStr[0]);
    var optStrEnd = optStr[0];
    if (optStr[1] != "" && optStr[1] != "undefined")
    {
      optStrEnd += "|" + optStr[1];
    }    

  }
  
  //return optStrs.slice(0,-1).trim()
  return optStrEnd;
}

/*

					    <li property="itemListElement" typeof="ListItem">
									<a class="top_home_button_20161216" property="item" typeof="WebPage"  href="https://www.banggood.com/" ><span property="name">Home</span></a>
					<meta property="position" content="1">
												</li>
									<li><i class="arrow_d"><i><i></i></i></i></li>
						<li property="itemListElement" typeof="ListItem">
									<a class="top_categories_button_20161216" property="item" typeof="WebPage"  href="https://www.banggood.com/Wholesale-Clothing-and-Apparel-c-274.html" ><span property="name">Clothing and Apparel</span></a>
					<meta property="position" content="2">
												</li>
									<li><i class="arrow_d"><i><i></i></i></i></li>
						<li property="itemListElement" typeof="ListItem">
									<a class="top_categories_button_20161216" property="item" typeof="WebPage"  href="https://www.banggood.com/Wholesale-Womens-Clothing-c-278.html" ><span property="name">Women's Clothing</span></a>
					<meta property="position" content="3">
												</li>
									<li><i class="arrow_d"><i><i></i></i></i></li>
						<li property="itemListElement" typeof="ListItem">
									<a class="top_categories_button_20161216" property="item" typeof="WebPage"  href="https://www.banggood.com/Wholesale-Womens-Dresses-c-1122.html" ><span property="name">Dresses</span></a>
					<meta property="position" content="4">
												</li>
									<li><i class="arrow_d"><i><i></i></i></i></li>
						<li property="itemListElement" typeof="ListItem">
									<a class="top_categories_button_20161216" property="item" typeof="WebPage"  href="https://www.banggood.com/Wholesale-Floral-Dresses-c-3104.html" ><span property="name">Floral Dresses</span></a>
					<meta property="position" content="5">
					</li>
*/

function bangEx_getCategoryContent () {
  var v_Category = []
  var v_li = document.getElementsByTagName('li')
  j = 0

  for (var i = 0; i < v_li.length; i++) {
    if (v_li[i].getAttribute('property') == 'itemListElement') {
      v_Category[j] = v_li[i].getElementsByTagName('a')[0].innerText
      j++
    }
  }

  v_Category = v_Category.filter(function (x, i, self) {
    return self.indexOf(x) === i
  })

  // console.log( v_Category)

  return v_Category
}
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@banggood Function end@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@taobao Function start@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

function taobaoEx_getIdContent () {
  var metas = document.getElementsByTagName('meta')

  for (var i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute('name') == 'microscope-data') {
      var taobaostr = metas[i].getAttribute('content')
      var bnum = taobaostr.indexOf('pageId=') + 7
      return result = taobaostr.substr(bnum, 7)
    }
  }
  return 'URL get fail'
}

function taobaoEx_getImagesContent () {
  var j = 0
  var imgs = []
  var images = document.getElementsByTagName('img')

  for (var i = 0; i < images.length; i++) {
    if (images[i].getAttribute('src') != null) {
      var tempstr = images[i].getAttribute('src')

      if (tempstr.indexOf('_60x60q90.jpg') != -1) {
        var cutindex = tempstr.indexOf('_60x60q90.jpg')
        imgs[j] = tempstr.substring(0, cutindex)
        imgs[j] = 'https:' + imgs[j]
        j++
      }

      if (tempstr.indexOf('_50x50.jpg') != -1) {
        var cutindex = tempstr.indexOf('_50x50.jpg')
        imgs[j] = tempstr.substring(0, cutindex)
        //console.log(tempstr)
        imgs[j] = 'https:' + imgs[j]
        j++
      }
    }
  }
  return imgs
}

function taobaoEx_getOptionsContent()
{
  var optStr = ''
  var v_dl = document.getElementsByClassName('tb-sku')[0].getElementsByTagName('dl')
  
  //for (var i = 0; i < v_dl.length-2; i++)
  for (var i = 0; i < 2; i++)
  {

    optStr += v_dl[i].getElementsByTagName('dt')[0].innerHTML
    
    optStr += ' '
   
    v_li = v_dl[i].getElementsByTagName('dd')[0].getElementsByTagName('ul')[0].getElementsByTagName('li')
    //console.log(v_li)
       
    for (var j = 0; j < v_li.length; j++)
    {
      //console.log(v_li[j])
      if (v_li[j].innerText != '')
      {
        optStr += (v_li[j].innerText).replace(/\r?\n/g, " ")
      } else
      {
        optStr += (v_li[j].getElementsByTagName('a')[0].getAttribute('title')).replace(/ /g, '-')
      }

      optStr += ' '
      //console.log(optStr)
    }
    //optStr += '\r'
  }
  return optStr
}
/*
function bangEx_getURLContent()
{
  var metas = document.getElementsByTagName('meta')

  for (var i = 0; i < metas.length; i++)
  {
    if (metas[i].getAttribute('property') == 'og:url')
    {
      return metas[i].getAttribute('content')
    }
  }
  return 'URL get fail'
}

function bangEx_getPriceContent()
{
  var metas = document.getElementsByTagName('meta')

  for (var i = 0; i < metas.length; i++)
  {
    if (metas[i].getAttribute('itemprop') == 'price')
    {
      return metas[i].getAttribute('content')
    }
  }
  return 'URL get fail'
}

*/

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@taobao Function end@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
