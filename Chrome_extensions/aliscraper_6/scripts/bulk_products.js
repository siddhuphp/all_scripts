console.log("This is from Bulk products js");

//importing necessery CSS styles. It will insert this code in head
var head = document.getElementsByTagName("head")[0];
head.insertAdjacentHTML("afterbegin", `<style>
.gallery-mode .list-item .item{	
border: 3px dotted #333;
}
.list-item:after {
    display: block;
    height: 0;
    font-size: 0;
    content: 'Tessrac';
    position: absolute;
    font-size: 14px;
    left: 50%;
    margin-left: -10%;
	top: 8px;
}
.bulk_chk{
	position: absolute;
    top: 15px;
    right: 15px;
    width: 20px;
    height: 20px;
    z-index: 4;
}
</style>`);


function validate_xpath_only(xpath)
{
  return document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null).iterateNext() instanceof Node;  
}

// Applying styles and checkbox for each products
if(validate_xpath_only('.//div[@id="hs-list-items"]/ul[@id="hs-below-list-items"]/li'))
{    
    case_1();
}
else if(validate_xpath_only('.//ul[@id="list-items"]/li'))
{
    case_2();
}
else if(validate_xpath_only('.//ul[contains(@class, "son-list")]/li'))
{
    case_3();
}



//Product display type cases
// case 1
function case_1()
{
    console.log("I'm in case_1");
    for (let index = 0; index < $('ul#hs-below-list-items li').length; index++) {
        var ul = $('ul#hs-below-list-items li')[index];
        ul.insertAdjacentHTML("afterbegin", `<input type="checkbox" value="1" name="bulk_prdct" class="bulk_chk">`);       
    }
}


// case 2
function case_2()
{
    console.log("I'm in case_2");
    for (let index = 0; index < $('ul#list-items li').length; index++) {
        var ul = $('ul#list-items li')[index];
        ul.insertAdjacentHTML("afterbegin", `<input type="checkbox" value="1" name="bulk_prdct" class="bulk_chk">`);       
    }
}

// case 3
function case_3()
{
    console.log("I'm in case_3");
    for (let index = 0; index < $('ul.son-list li').length; index++) {
        var ul = $('ul.son-list li')[index];          
        if(contains(ul.innerHTML, "item"))
        {
            k = index + 1;
            val = bring_href_value(k);
            ul.insertAdjacentHTML("afterbegin", `<input type="checkbox" value="`+val+`" name="bulk_prdct" class="bulk_chk">`);       
        }
        
    }
}


function contains(str, text)
{
    var myString = str;
    var regex = new RegExp( '\\b' + text + '\\b' );
    return regex.test( myString );    
}


function bring_href_value(position)
{
    var dis_xpath = ("//ul[@class='util-clearfix son-list']/li["+position+"]/div[1]/div[1]/div[1]/a[1]/@href");
    if(validate_xpath_only(dis_xpath))
    {
        value = "https:"+document.evaluate(dis_xpath, document, null, XPathResult.ANY_TYPE, null).iterateNext().textContent;
    }
    else
    {
        value = null; 
    }
    return value;
}


$('.bulk_chk').on('change', function() {    
    var chk = $( this ).prop( "checked" );
    // alert(chk); alert(this.value);
    if(chk)
    {
        // Sending url to background js.
        send_url_to_bg_js(this.value,1); // Adding URL 1 means 
    }
    else
    {
        //remove this url in global urls list
        send_url_to_bg_js(this.value,0); 
    }     
});


//Send selected url values to background js
function send_url_to_bg_js(url,status)
{
    obj = {greeting:"url_adding",url:url,status:status};
     chrome.runtime.sendMessage(obj, function(response) {
       console.log(response.yes_recevied);//response will come from background script
     });    
}