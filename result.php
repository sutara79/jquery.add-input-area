<!doctype html>
<html lang="ja">
	<head>
		<meta charset="UTF-8">
		<title>結果表示ページ</title>
	</head>
	<body>
		<p>フォーム送信された値を、PHPの『print_r($_POST);』で表示します。</p>
		<?php
			if($_POST['submit']){
				echo '<pre>';
				print_r($_POST);
				echo '</pre>';
			}
		?>
		<a href="index.html" style="font-weight:bold">戻る</a>
	</body>
</html>
