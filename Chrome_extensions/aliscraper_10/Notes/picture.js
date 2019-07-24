Obj=[];
data.imageModule.imagePathList.forEach(function(c,i,arr){
		Ob={};
		Ob.UploadPictureUrl=c;
		Ob.DisplayOrder=i;
		Ob.MimeType=get_mime_type(c);
		Obj.push(Ob)
	});


function get_mime_type(file)
{
    if(file)
    {
      ext = file.split('.').pop();
       
      switch (ext) 
      {
        case 'png':
          mime = "image/png";
          break;
        case 'jpg':
          mime = "image/jpeg";
          break;
        case 'jpeg':
          mime = "image/jpeg";
          break;
        default:
          mime = "";
      }
      return mime;
    }
  else
  {
    return '';
  }    
}