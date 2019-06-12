console.log("This is from Bulk products js");

var urls = new Array(); // this array will fill from send_url_to_bg_js() response of background js.

//If user reload the current page, after selected few products. We need to append checked tick those products.
//For that we are storing URL's globally in background js. So send request to get those URL's to to append checked tick.
//below request sending message to background js script.
chrome.runtime.sendMessage({msg: "get_urls"}, function(response) {
    // console.log(response.status);//response from background script   
    // console.log(response.url_bucket);//response from background script       
    if(response.status)
    {
        //  alert(response.url_bucket);
         console.log(response.url_bucket);        
        $('input.bulk_chk[type=checkbox]').each(function () {
            var sThisVal = $(this).val();           
            if(response.url_bucket.includes(sThisVal.split("?")[0]))
            {
                $(this).prop('checked', true);
                appendButton();
            }
          });       
    }
});


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
.bulk_url{
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 999999;
    background: #09bbff;
    padding: 11px 18px;
    border: 0;
    color: #fff;
}
</style>`);




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
        lnk=document.evaluate(dis_xpath, document, null, XPathResult.ANY_TYPE, null).iterateNext().textContent.split("?")[0];
        value = "https:"+lnk;
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
    appendButton();    
});


//Send selected url values to background js
function send_url_to_bg_js(url,status)
{
    obj = {greeting:"url_adding",url:url,status:status};
     chrome.runtime.sendMessage(obj, function(response) {          
       urls = response.data;
       console.log(urls);    
       global_urls_count(urls.length);
     
     });        
}

//Append button if checkbox checked
function appendButton() {
    var len = $(".bulk_chk:checked").length;
    if(len>0)
    {
        var div = document.createElement("div");
        div.className = 'bulk_div';
        
        // 1. Create the button       
        var button = document.createElement("button");
        button.className = 'bulk_url';
        button.innerHTML = " Proceed ";
        div.appendChild(button);

        // 2. Append somewhere
        var body = document.getElementsByTagName("body")[0];
        body.appendChild(div);

        // 3. Add event handler
        button.addEventListener ("click", function() {
            open_urls_by_bgjs();
        });        
    }
    else
    {
       $('.bulk_url').remove();
    }
}

//Send selected url values to background js
function open_urls_by_bgjs()
{
    obj = {greeting:"open_urls"};
     chrome.runtime.sendMessage(obj, function(response) {    
              console.log(response);
              window.location = response.open_url;
              window.open(response.open_url, '_self');    
     });        
}


function global_urls_count(len)
{
    if(len>0)
    { 
       $(".bulk_url").text('Proceed ('+len+')'); 
    }
    else
    {
        $('.bulk_url').remove();  
    }  
}