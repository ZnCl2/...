<?php
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
header('Location: http://app.lucid00.com'.$path.'/', true, 301);
exit();
?>