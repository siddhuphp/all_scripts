console.log("This is from Bulk products js");

//importing necessery CSS styles
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

/* this is for bulk select */
.bulk_url{
	position: fixed;
	bottom: 30px;
	right: 30px;
	z-index: 999999;
}

div.bulk_div:after {
    content: "";
    background: #33333340;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 99999;
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
        value = document.evaluate(dis_xpath, document, null, XPathResult.ANY_TYPE, null).iterateNext().textContent;
    }
    else
    {
        value = ""; 
    }
    return value;
}

const urls = new Array;
const limit = 5;
$('.bulk_chk').on('change', function() {
    var val = this.checked ? this.value : '';
    if(urls.length < limit)
    {
        urls.push(val);
    }
     
    if(urls.length == limit)
    {
        console.log("yes fiered"); 
        var div = document.createElement("div");
        div.className = 'bulk_div';
        
        // 1. Create the button       
        var button = document.createElement("button");
        button.className = 'bulk_url';
        button.innerHTML = "Do Something";
        div.appendChild(button);

        // 2. Append somewhere
        var body = document.getElementsByTagName("body")[0];
        body.appendChild(div);

        // 3. Add event handler
        button.addEventListener ("click", function() {
            urls.forEach(function(url) {
                window.open(url, '_blank');
              });
        }); 

        
        
    }
    console.log(urls);
    
});