<?php
// Database connection settings
$host = 'localhost';   // Replace with your database host
$db = 'stars';     // Replace with your database name
$user = 'root';        // Replace with your MySQL username
$pass = '';            // Replace with your MySQL password

// Connect to MySQL
$mysqli = new mysqli($host, $user, $pass, $db);

// Check connection
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

// Get the time and name/type values sent via POST
if (isset($_POST['time']) && isset($_POST['name'])) {
    $time = $_POST['time'];
    $name = $_POST['name'];
    
    // Insert the time and name into the database
    $stmt = $mysqli->prepare("INSERT INTO puzzle_results (time, name) VALUES (?, ?)");
    $stmt->bind_param('ss', $time, $name);
    
    if ($stmt->execute()) {
        echo 'Time saved successfully.';
    } else {
        echo 'Error saving time.';
    }

    $stmt->close();
} else {
    echo 'No time or name received.';
}

// Close the connection
$mysqli->close();
?>
