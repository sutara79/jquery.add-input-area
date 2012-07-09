<!doctype html>
<html>
	<head>
		<meta charset="UTF-8">
		<?php
			echo $this->Html->script('http://code.jquery.com/jquery.min.js');
			echo $this->Html->script('jquery.addInputArea.3.1');
		?>
		<script type="text/javascript">
			jQuery(document).ready(function($){
				$('#mytest').addInputArea();
			});
		</script>
	</head>
	<body>
		<?php echo $content_for_layout ?>
	</body>
</html>
