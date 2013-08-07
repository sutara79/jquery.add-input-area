# jquery.addInputArea
A jQuery plugin for adding or deleting form-items.


## Demo
[http://www.usamimi.info/~sutara/sample/addInputArea/](http://www.usamimi.info/~sutara/sample/addInputArea/)


## Note: 'name' attribute
If you obey a naming convention, `name` and `id` attribute is named automatically.  
(命名規則に従えば、`name`, `id`属性は自動で付与されます。)

``` html
(default)
<input type="text" name="foo_0">

(add)
<input type="text" name="foo_1">
<input type="text" name="foo_2">
<input type="text" name="foo_3">
```

On the other hand, you can set original method of numbering using `name_format` or `id_format` attribute.  
(他方で、独自属性の`name_format`や`id_format`を使うことにより柔軟な連番生成も可能です。CakePHPへの対応などで役立ちます。)

#### example 1.

``` html
(default)
<input type="text" name_format="foo_%d_bar" name="foo_0_bar">

(add)
<input type="text" name_format="foo_%d_bar" name="foo_1_bar">
<input type="text" name_format="foo_%d_bar" name="foo_2_bar">
```

#### example 2.

``` html
(default)
<input type="text" name_format="data[posts][mail][%d]" name="data[posts][mail][0]">

(add)
<input type="text" name_format="data[posts][mail][%d]" name="data[posts][mail][1]">
<input type="text" name_format="data[posts][mail][%d]" name="data[posts][mail][2]">	
```

## Options
you can set some properties of this plugin like following.  
(下記のようにオプションを指定できます。)

``` javascript
$('#list').addInputArea({
    area_var : '.foo_area',
    btn_add  : '.bar_button',
    btn_del  : '.baz_button'
});
```

- - -
### area_var
The name of CSS class of the item name to fluctuate.  
(動的に増減する要素に共通するCSSクラス名)

#### initial value

``` javascript
(id) ? '.' + id + '_var' : '.aia_var'
```

- - -
### area_del
The name of CSS class of the delete-area.  
(削除エリアに共通するCSSクラス名)

#### initial value

``` javascript
false
```

- - -
### btn_del
The name of CSS class of the delete-button.  
(削除ボタンに共通するCSSクラス名)

#### initial value

``` javascript
(id) ? '.' + id + '_del' : '.aia_del'
```

- - -
### btn_add
The name of CSS class of the add-button.  
(追加ボタンのCSSクラス名)

#### initial value

``` javascript
(id) ? '.' + id + '_add' : '.aia_add'
```

- - -
### maximum
The maximum number of items. (numeric)  
(増減する要素の最大数 (数値で指定する))

#### initial value

``` javascript
false // It means unlimited.
```

## Author
Yuusaku Miyazaki (宮崎 雄策)

* [Mail](toumin.m7@gmail.com)
* [Blog](http://d.hatena.ne.jp/sutara_lumpur/20120421/1335009088)


## License
[MIT License](http://www.opensource.org/licenses/mit-license.php)
