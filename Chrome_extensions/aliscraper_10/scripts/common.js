//Checks xpath available or and return boolean
function validate_xpath_only(xpath)
{
  var exists;
  obj=document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null).iterateNext();
  exists= obj instanceof Node;  
  // if (exists)
  // {
  //   obj=document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null).iterateNext();
  //   if(!$(obj).hasClass("scraper_border")) { $(obj).addClass("scraper_border")}
  // }
  return exists;
}

//Checks xpath and return the value of that xpath
function validate_xpath(xpath)
{
  if(validate_xpath_only(xpath) == true)
  {
    value = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null).iterateNext().textContent;
    }
  else
  {
    value = null;
  }
  return value;
}

//Checks value exists in array or not
function isInArray(value, array)
{
  return array.indexOf(value) > -1;
}