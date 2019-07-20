
/* To Get user attributes
 http://glocalkart.australiasoutheast.cloudapp.azure.com/odata/category */



/* How to store product attributes
	Step-1:
		method: Post
		url:http://glocalkart.australiasoutheast.cloudapp.azure.com/odata/productattribute
		
		Sample data:
		Note: Always post data through admin bcoz it will approve the IsApproved:TRUE, if you assign from user you need to login admin for approve that.
		*/
		 {
            "DisplayName": "G-Color",
            "InternalName": "g_color",
            "Description": "<p>sdfvsdf</p>",
            "IsApproved": true,
            "Locales": [],
            "PredefinedProductAttributeValues": [
					{
						"ProductValueInternalName": "g_yellow",
						"Name": "Yellow",
						"ColorSquaresRgb": "",
						"IsPreSelected": false,
						"DisplayOrder": 0,
						"IsApproved": true,
						"Id": "",
						"Locales": []
					},
					{
						"ProductValueInternalName": "g_blue",
						"Name": "Blue",
						"ColorSquaresRgb": "",
						"IsPreSelected": false,
						"DisplayOrder": 0,
						"IsApproved": true,
						"Id": "",
						"Locales": []
					}
            	]
        }

/* To check product attribute exist or not
	Example
	Method:Get
	url: http://glocalkart.australiasoutheast.cloudapp.azure.com/odata/productattribute('color')
	
	Above URL will return the data if attributes exists, In example 'color' is attribute name here

*/

/* To Update 'PredefinedProductAttributeValues' for the attributes, We have concept of Patch
	Example
	Method:PATCH
	url: http://glocalkart.australiasoutheast.cloudapp.azure.com/odata/productattribute/g_color
	
	Here I selected the attribute internalName 'g_color'
	
	Now you can send direct data to that 'PredefinedProductAttributeValues'
*/
	[
		{ "op":"add", "path":"PredefinedProductAttributeValues/-" ,"value":
			{
				"ProductValueInternalName":"skyblue1",
				"Name":"SkuBlue",
				"ColorSquaresRgb":"#ff0000",
				"IsApproved":true
			}
		},
		{ "op":"add", "path":"PredefinedProductAttributeValues/-" ,"value":
			{
				"ProductValueInternalName":"skyblue2",
				"Name":"SkuBlue",
				"ColorSquaresRgb":"#ff0000",
				"IsApproved":true
			}
		},
		{ "op":"add", "path":"PredefinedProductAttributeValues/-" ,"value":
				{
					"ProductValueInternalName":"skyblue3",
					"Name":"SkuBlue",
					"ColorSquaresRgb":"#ff0000",
					"IsApproved":true
				}
		}
	]
		
	/* You need to add your */
		
	/* To get attributeDataSet along with ProductAttributes and ProductAttributesValues
		URL:http://glocalkart.australiasoutheast.cloudapp.azure.com/odata/AttributeDataSet('ds_clothing')/ProductAttributes
		method:GET

	*/
		
		
		
// NEED TO DO
	// If imageSqure then need to add url of squreimage 
		//Note: Imagesqure will accept 'UniControlType' true only
	
	//Brand Name at specfications
	
	/* worked product post data starts */
	{
  "Sku": "3301472794050",
  "ProductType": "SimpleProduct",
  "Name": "Women Shirt Solid Off Shoulder Elastic Sexy Short Sleeveless Vest Polyester Tank Crop Tops Casual Summer-in T-Shirts from Women's Clothing on Aliexpress.com | Alibaba Group",
  "MetaKeywords": "T-Shirts, Cheap T-Shirts, Women Shirt Solid Off Shoulder Elastic Sexy Short Sleeveless Vest Polyester Tank Crop Tops Casual Summer",
  "MetaDescription": "Cheap T-Shirts, Buy Directly from China Suppliers:Women Shirt Solid Off Shoulder Elastic Sexy Short Sleeveless Vest Polyester Tank Crop Tops Casual Summer\nEnjoy \u2713Free Shipping Worldwide! \u2713Limited Time Sale\u00a0\u2713Easy Return.",
  "MetaTitle": "Women Shirt Solid Off Shoulder Elastic Sexy Short Sleeveless Vest Polyester Tank Crop Tops Casual Summer-in T-Shirts from Women's Clothing on Aliexpress.com | Alibaba Group",
  "Pictures": [
    {
      "UploadPictureUrl": "https:\/\/ae01.alicdn.com\/kf\/HTB1DOsCUxnaK1RjSZFtq6zC2VXaP\/Women-Shirt-Solid-Off-Shoulder-Elastic-Sexy-Short-Sleeveless-Vest-Polyester-Tank-Crop-Tops-Casual-Summer.jpg",
      "DisplayOrder": 0
    },
    {
      "UploadPictureUrl": "https:\/\/ae01.alicdn.com\/kf\/HTB1D6gbUpzqK1RjSZFoq6zfcXXax\/Women-Shirt-Solid-Off-Shoulder-Elastic-Sexy-Short-Sleeveless-Vest-Polyester-Tank-Crop-Tops-Casual-Summer.jpg",
      "DisplayOrder": 1
    },
    {
      "UploadPictureUrl": "https:\/\/ae01.alicdn.com\/kf\/HTB1bN.cUCzqK1RjSZFpq6ykSXXaX\/Women-Shirt-Solid-Off-Shoulder-Elastic-Sexy-Short-Sleeveless-Vest-Polyester-Tank-Crop-Tops-Casual-Summer.jpg",
      "DisplayOrder": 2
    },
    {
      "UploadPictureUrl": "https:\/\/ae01.alicdn.com\/kf\/HTB1dWwfUAPoK1RjSZKbq6x1IXXaP\/Women-Shirt-Solid-Off-Shoulder-Elastic-Sexy-Short-Sleeveless-Vest-Polyester-Tank-Crop-Tops-Casual-Summer.jpg",
      "DisplayOrder": 3
    },
    {
      "UploadPictureUrl": "https:\/\/ae01.alicdn.com\/kf\/HTB1FMseUpzqK1RjSZFCq6zbxVXas\/Women-Shirt-Solid-Off-Shoulder-Elastic-Sexy-Short-Sleeveless-Vest-Polyester-Tank-Crop-Tops-Casual-Summer.jpg",
      "DisplayOrder": 4
    },
    {
      "UploadPictureUrl": "https:\/\/ae01.alicdn.com\/kf\/HTB1NO0wbLc3T1VjSZPfq6AWHXXa8\/Women-Shirt-Solid-Off-Shoulder-Elastic-Sexy-Short-Sleeveless-Vest-Polyester-Tank-Crop-Tops-Casual-Summer.jpg",
      "DisplayOrder": 5
    }
  ],
  "ProductAttributes": [
    {
      "ProductAttributeInternalName": "color",
      "AttributeControlType": "DropdownList",
      "TextPrompt": "Color",
      "ProductAttributeValues": [
        {
          "ProductValueInternalName": "Beige"
        },
        {
          "ProductValueInternalName": "Black"
        },
        {
          "ProductValueInternalName": "Blue"
        },
        {
          "ProductValueInternalName": "Sky_Blue"
        },
        {
          "ProductValueInternalName": "Yellow"
        }
      ]
    },
    {
      "ProductAttributeInternalName": "size",
      
      "TextPrompt": "Size",
      "ProductAttributeValues": [
        {
          "ProductValueInternalName": "small"
        },
        {
          "ProductValueInternalName": "medium"
        },
        {
          "ProductValueInternalName": "large"
        },
        {
          "ProductValueInternalName": "x_large"
        }
      ]
    }
  ],
  "ProductSpecificatons": [
  	
   
  ],
  "WarehouseInventory": [
    
  ],
  "AttributeCombinations": [
    {
      "Sku": "67075571084",
      "ProductAttributeCombinations": [
        {
          "AttributeInternalName": "color",
          "AttributeValueInternalName": "Beige"
        },
        {
          "AttributeInternalName": "size",
          "AttributeValueInternalName": "x_large"
        }
      ],
      "WarehouseInventory": [
        {
          "StockQuantity": 2000,
          "InternalName": "ravi_warehouse"
        }
      ]
    },
    {
      "Sku": "67075571085",
      "ProductAttributeCombinations": [
        {
          "AttributeInternalName": "color",
          "AttributeValueInternalName": "Yellow"
        },
        {
          "AttributeInternalName": "size",
          "AttributeValueInternalName": "small"
        }
      ],
      "WarehouseInventory": [
        {
          "StockQuantity": 1999,
          "InternalName": "ravi_warehouse"
        }
      ]
    }
   
  ],
  "Manufacturers": [
    "hp"
  ],
  "Weight": 1,
  "Length": 1,
  "Width": 1,
  "Height": 1,
  "ShortDescription": "siddhu-sample-desc",
  "SeName": "siddhu-siddhartha-roy",
  "PrimaryCategeryName": "mens_shirts"
}
/* Ends */


/* Adding category attributes  */
URL: http://glocalkart.australiasoutheast.cloudapp.azure.com/odata/category/electronics
method: PUT

//sample data
/*    {
            "Name": "Electronics",
            "Description": null,
            "CategoryTemplateId": "5d32cf951ad5b6000173d26a",
            "MetaKeywords": null,
            "MetaDescription": null,
            "MetaTitle": null,
            "SeName": "electronics",
            "ParentCategoryName": null,
            "PictureId": null,
            "PageSize": 0,
            "AllowCustomersToSelectPageSize": true,
            "PageSizeOptions": "6, 3, 9",
            "PriceRanges": null,
            "ShowOnHomePage": false,
            "FeaturedProductsOnHomaPage": false,
            "IncludeInTopMenu": true,
            "Published": true,
            "DisplayOrder": 0,
            "Flag": null,
            "FlagStyle": null,
            "Icon": null,
            "HideOnCatalog": false,
            "ShowOnSearchBox": false,
            "SearchBoxDisplayOrder": 0,
            "InternalName": "electronics",
            "BreadCrumb": "Electronics",
            "CreatedOnUtc": "2019-07-20T09:23:41.736Z",
            "UpdatedOnUtc": "2019-07-20T09:23:41.736Z",
            "AttributeSetProductTypes": [ */
            	{
            		"ProductType":"SimpleProduct",
            		"AttributeDataSetName":"g_clothing",
            		"ProductTempleteId":"5d32cf951ad5b6000173d268"
            	}
/*             	],
            "Locales": []
        } */

//Remove above comments if u wanna do
/* END */


/* 
url: http://glocalkart.australiasoutheast.cloudapp.azure.com/odata/ProductAttribute('ravi_size')/UpsertProductAttributeValue?InternalName=siddhu
method:Post */
//Sample Data
{
	"ProductValueInternalName": "medium2348",
	"Name": "MArch8",
	"ColorSquaresRgb": "#FFFFFF",
	"IsPreSelected": false,
	"DisplayOrder": 0,
	"Locales": []
}

 /* Ends */
