<?php echo $this->Form->create('mytest', array('url'=>'index')) ?>

<?php echo $this->Form->input('note', array('value'=>'普通のテキストボックス')) ?>
<ol id="mytest">
	<li class="mytest_var">
		<!-- CakePHPのヘルパーを使う場合 -->
		<?php echo $this->Form->input('mail', array(
			'name'=>'data[mytest][mail][0]',
			'name_format'=>'data[mytest][mail][%d]'
		)) ?>
		<!-- ヘルパーを使わない場合
		<input type="text" name_format="data[mytest][mail][%d]" name="data[mytest][mail][0]">
		-->
		<button class="mytest_del">Delete</button>
	</li>
</ol>
<input type="button" value="Add" class="mytest_add"><br>
<?php echo $this->Form->end(array('label' => 'submit')) ?>


<p>フォーム送信すると、結果が下に表示されます。
<?php pr($data) ?>
