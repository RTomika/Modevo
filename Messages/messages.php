<?php
$host = 'localhost';
$db   = 'modevo_contact';
$user = 'root';
$pass = 'tomikajelszava';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);

    $stmt = $pdo->query("SELECT * FROM messages ORDER BY created_at DESC");
    $messages = $stmt->fetchAll();
} catch (PDOException $e) {
    echo "Adatbázis hiba: " . $e->getMessage();
    exit;
}
?>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="messages.css">
    <title>Messages</title>
</head>
<body>
    <div id="overlay"></div>

<div id="contentCont">
    <div class="showCont">
        <h2 class="text-center nameShow">Tomika</h2>
        <h4 class="text-center emailShow">tamas10.rez@gmail.com</h4>
        <p class="text-center messageShow">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo necessitatibus quibusdam nostrum sed vero tempora id, natus quisquam amet ipsam, illum exercitationem adipisci sunt debitis unde, earum culpa similique est!</p>
        <h6 class="dateShow">Sent at: 2025.05.17 12:53:34</h6>
    </div>
</div>

    <h1 class="mainText text-center">Messages</h1>

    <?php if(count($messages) === 0): ?>
        <?php else: ?>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($messages as $msg): ?>
                    <tr>
                        <td><?= htmlspecialchars($msg['name']) ?></td>
                        <td><?= htmlspecialchars($msg['email']) ?></td>
                        <td class="messages">
                            <?= nl2br(htmlspecialchars($msg['message'])) ?>
                            <button
                                class="moreMsgBtn"
                                data-name="<?= htmlspecialchars($msg['name']) ?>"
                                data-email="<?= htmlspecialchars($msg['email']) ?>"
                                data-message="<?= htmlspecialchars($msg['message']) ?>"
                                data-date="<?= htmlspecialchars($msg['created_at']) ?>"
                            >
                                See more
                            </button>
                        </td>
                        <td><?= $msg['created_at'] ?></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    <?php endif; ?>

    

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="messags.js"></script>
</body>
</html>