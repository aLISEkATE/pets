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

// Fetch the leaderboard data (sorted by time in descending order)
$sql = "SELECT name, time
FROM time_taken
ORDER BY
    (SUBSTRING_INDEX(time, ':', 1) * 60 + SUBSTRING_INDEX(time, ':', -1)) ASC";
$result = $mysqli->query($sql);

$leaderboard = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $leaderboard[] = $row;  // Add each row to the leaderboard array
    }
} else {
    echo "No records found.";
}

// Return the leaderboard as JSON
echo json_encode($leaderboard);

// Close the connection
$mysqli->close();
?>