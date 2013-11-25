<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Result</title>
	</head>
	<body>
		<h3>print_r($_POST);</h3>
		<div style="font-size:16px;">
		<?php
			if($_POST['submit']){
				echo '<pre>';
				print_r($_POST);
				echo '</pre>';
			}
		?>
		</div>
		<a href="index.html" style="font-weight:bold">Back</a>
	</body>
</html>
