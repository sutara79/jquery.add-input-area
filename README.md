# jquery.add-input-area
jQuery plugin for adding or deleting Form elements.


## Demo
[http://www.usamimi.info/~sutara/sample/add-input-area/](http://www.usamimi.info/~sutara/sample/add-input-area/)

## JSDoc
[http://www.usamimi.info/~sutara/sample/add-input-area/jsdoc/](http://www.usamimi.info/~sutara/sample/add-input-area/jsdoc/)

## Usage

###### HTML
```html
<head>
	<script src="//code.jquery.com/jquery.min.js"></script>
	<script src="jquery.add-input-area.min.js"></script>
</head>
<body>
	<ol id="list1">
		<li class="list1_var">
			<input type="text" size="40" name="list1_0" id="list1_0">
			<button class="list1_del">Delete</button>
		</li>
	</ol>
	<input type="button" value="Add" class="list1_add">
```

###### JavaScript
```javascript
$('#list1').addInputArea();
```

## Attention
You **must** set `name` attribute to addable elements.  
But `id` attribute is not required.  
(増減する要素には`name`属性が**必須**です。  
しかし、`id`属性は必須ではありません。)

If you obey a naming convention, `name` and `id` attribute is named automatically.  
(命名規則に従えば、`name`, `id`属性には自動で連番が割り当てられます。)

```html
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

```html
(default)
<input type="text" name_format="data[posts][mail][%d]" name="data[posts][mail][0]">

(add)
<input type="text" name_format="data[posts][mail][%d]" name="data[posts][mail][1]">
<input type="text" name_format="data[posts][mail][%d]" name="data[posts][mail][2]">	
```

#### How to use on CakePHP
http://runnable.com/U7vCAlCwvQZzFZBO/

## Author
Yuusaku Miyazaki (宮崎 雄策)

- Mail: toumin.m7@gmail.com
- [Blog](http://d.hatena.ne.jp/sutara_lumpur/20120509/1336556562)


## License
[MIT License](http://www.opensource.org/licenses/mit-license.php)
