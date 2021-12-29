<?php
require_once __DIR__ . '/helpers.php';
?>

<!DOCTYPE html>
<html>

  <head>
    <?= isDev() ?'<base href="http://localhost:3000/"/>' :''; ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    <title></title>
    <?= vite('main.js') ?>
    <?= vite('entrances/index.js') ?>
  </head>

  <body>
    <div id="app">
      <router-view></router-view>
    </div>
  </body>

</html>
