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
    // console.log($('ul#hs-below-list-items li').length);
    // console.log($('ul#hs-below-list-items li')[1]);
    for (let index = 0; index < $('ul#hs-below-list-items li').length; index++) {
        var ul = $('ul#hs-below-list-items li')[index];
        ul.insertAdjacentHTML("afterbegin", `<input type="checkbox" value="1" name="bulk_prdct" class="bulk_chk">`);       
    }
}


// case 2
function case_2()
{
    for (let index = 0; index < $('ul#list-items li').length; index++) {
        var ul = $('ul#list-items li')[index];
        ul.insertAdjacentHTML("afterbegin", `<input type="checkbox" value="1" name="bulk_prdct" class="bulk_chk">`);       
    }
}

// case 3
function case_3()
{
    for (let index = 0; index < $('ul.son-list li').length; index++) {
        var ul = $('ul.son-list li')[index];
            console.log(ul); 
            console.log(typeof ul);  
            console.log(ul.innerHTML);  
             
            
        if(contains(ul.innerHTML, "item"))
        {
            // console.log(ul);
            // console.log(index);
            ul.insertAdjacentHTML("afterbegin", `<input type="checkbox" value="1" name="bulk_prdct" class="bulk_chk">`);       
        }
        
    }
}


function contains(str, text)
{
    var myString = str;
    var regex = new RegExp( '\\b' + text + '\\b' );
    return regex.test( myString );
    // return true;
}