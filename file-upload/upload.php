<?php

// Define upload directory
$uploadDir = 'uploads/';

// Check if upload directory exists
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

// Initialize response array
$response = ['files' => []];

// Loop through uploaded files
foreach ($_FILES['files']['name'] as $key => $name) {
    // Get file information
    $tmpName = $_FILES['files']['tmp_name'][$key];
    $size = $_FILES['files']['size'][$key];
    $type = $_FILES['files']['type'][$key];

    // Validate file
    if (!empty($name)) {
        // Check for valid file type
        if (!in_array($type, ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'])) {
            $response['files'][] = ['name' => $name, 'error' => 'Invalid file type.'];
            continue;
        }

        // Check for file size
        if ($size > 52428800) { // 50 MB limit
            $response['files'][] = ['name' => $name, 'error' => 'File size too large.'];
            continue;
        }

        // Generate unique filename
        $filename = uniqid() . '_' . $name;

        // Upload file
        if (move_uploaded_file($tmpName, $uploadDir . $filename)) {
            $response['files'][] = ['name' => $name, 'success' => 'File uploaded successfully.'];
            // Store additional information about the uploaded file in a database or other storage
            // ...
        } else {
            $response['files'][] = ['name' => $name, 'error' => 'Error uploading file.'];
        }
    }
}

// Send JSON response
header('Content-Type: application/json');
echo json_encode($response);
