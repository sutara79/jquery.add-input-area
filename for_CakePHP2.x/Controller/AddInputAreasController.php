<?php
class AddInputAreasController extends AppController {
	public $name = 'AddInputAreas';
	public $helpers = array('Html');
	public $uses = null; //モデルを使わないようにしている

	public function index() {
		$this->layout = 'addInputArea';
		
		//フォーム送信の内容をそのまま表示させる
		if (isset($this->params['data']['mytest'])) {
			$this->set('data', $this->params['data']['mytest']);
		} else {
			$this->set('data', null);
		}
	}
}
