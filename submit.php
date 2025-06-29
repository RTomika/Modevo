<?php
header('Content-Type: application/json');

$host = 'localhost';
$db   = 'modevo_contact';
$user = 'root';
$pass = 'tomikajelszava';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => 'db_connection',
        'message' => 'Adatbázis csatlakozási hiba: ' . $e->getMessage()
    ]);
    exit;
}

if (
    isset($_POST['customer_name'], $_POST['customer_email'], $_POST['customer_message']) &&
    !empty($_POST['customer_name']) &&
    !empty($_POST['customer_email']) &&
    !empty($_POST['customer_message'])
) {
    $name = trim($_POST['customer_name']);
    $email = filter_var(trim($_POST['customer_email']), FILTER_VALIDATE_EMAIL);
    $message = trim($_POST['customer_message']);

    if (!$email) {
        echo json_encode([
            'success' => false,
            'error' => 'invalid_email',
        ]);
        exit;
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO messages (name, email, message) VALUES (?, ?, ?)");
        $stmt->execute([$name, $email, $message]);

        echo json_encode([
            'success' => true,
        ]);
        exit;
    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'error' => 'db_insert',
            'message' => 'Hiba: ' . $e->getMessage()
        ]);
        exit;
    }
} else {
    echo json_encode([
        'success' => false,
        'error' => 'missing_fields',
        'message' => 'Kérlek, tölts ki minden mezőt!'
    ]);
    exit;
}
