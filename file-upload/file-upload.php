<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Multiple File Upload</title>
  <!-- Bootstrap 5.x or 4.x is supported. You can also use the Bootstrap css 3.3.x versions -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" crossorigin="anonymous">
  <!-- Default icons used in the plugin are from Bootstrap 5.x icon library -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.min.css" crossorigin="anonymous">
  <!-- The FileInput plugin styling CSS file -->
  <link href="https://cdn.jsdelivr.net/gh/kartik-v/bootstrap-fileinput@5.5.2/css/fileinput.min.css" media="all" rel="stylesheet" type="text/css" />
</head>

<body>
  <div class="container">
    <h1>Multiple File Upload</h1>
    <form action="/file-upload/upload.php" method="post" enctype="multipart/form-data">
      <div class="mb-3">
        <label for="file-input" class="form-label">Select Files:</label>
        <input type="file" id="file-input" name="files[]" multiple="multiple" />
      </div>
      <button type="submit" class="btn btn-primary">Upload</button>
    </form>
  </div>

  <!-- jQuery Library -->
  <script src="https://code.jquery.com/jquery-3.6.0.min.js" crossorigin="anonymous"></script>

  <!-- Buffer.min.js and filetype.min.js are necessary for advanced mime type parsing and more correct preview -->
  <script src="https://cdn.jsdelivr.net/gh/kartik-v/bootstrap-fileinput@5.5.2/js/plugins/buffer.min.js" type="text/javascript"></script>
  <script src="https://cdn.jsdelivr.net/gh/kartik-v/bootstrap-fileinput@5.5.2/js/plugins/filetype.min.js" type="text/javascript"></script>

  <!-- Piexif.min.js is needed for auto orienting image files -->
  <script src="https://cdn.jsdelivr.net/gh/kartik-v/bootstrap-fileinput@5.5.2/js/plugins/piexif.min.js" type="text/javascript"></script>

  <!-- Sortable.min.js is only needed if you wish to sort/rearrange files in initial preview -->
  <script src="https://cdn.jsdelivr.net/gh/kartik-v/bootstrap-fileinput@5.5.2/js/plugins/sortable.min.js" type="text/javascript"></script>

  <!-- Bootstrap.bundle.min.js is needed for zoom and preview file content in a detail modal dialog -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>

  <!-- Main FileInput plugin script JS file -->
  <script src="https://cdn.jsdelivr.net/gh/kartik-v/bootstrap-fileinput@5.5.2/js/fileinput.min.js"></script>

  <!-- Optional theme script for Font Awesome 5.x theme (`fas`) -->
  <!-- script src="https://cdn.jsdelivr.net/gh/kartik-v/bootstrap-fileinput@5.5.2/themes/fas/theme.min.js"></script -->

  <!-- Optionally, include the locale file for translation (replace LANG.js with your language locale) -->
  <script src="https://cdn.jsdelivr.net/gh/kartik-v/bootstrap-fileinput@5.5.2/js/locales/LANG.js"></script>

  <!-- PDFObject library -->
  <script src="https://cdn.jsdelivr.net/npm/pdfobject@^2.2.7/dist/pdfobject.min.js"></script>

  <script>
    $(document).ready(function() {
      $("#file-input").fileinput({
        theme: 'fas',
        uploadUrl: '/file-upload/upload.php', // Replace with your actual upload URL
        uploadAsync: false,
        maxFileCount: 5,
        allowedFileTypes: ['image', 'video', 'pdf'],
        showUpload: false,
        showRemove: false,
        overwriteInitial: true,
        previewSettings: {
          pdf: {
            enabled: true,
            renderer: 'pdfobject',
            pdfRenderer: {
              pdfjs: {
                workerSrc: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.14.305/build/pdf.worker.min.js'
              }
            }
          }
        }
      });
    });
  </script>
</body>

</html>