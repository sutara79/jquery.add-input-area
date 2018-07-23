# CHANGELOG: jquery.add-input-area

## v4.11.0
#### New option
`validate` option is added to fix #9.  
See [documentation](https://sutara79.github.io/jquery.add-input-area/#index_13).

## v4.10.0
#### New option
`dont_clone` option is added to fix #8.  
See [documentation](https://sutara79.github.io/jquery.add-input-area/#index_12).

## v4.9.0
- All comments are written in English. ([isssue #4](https://github.com/sutara79/jquery.add-input-area/issues/4))
- Move plugin files to `dist/`.
- Delete `attr_name` option because it is not used in anywhere the source code.
- Change the name of attributes to follow the rule of [custom data attribute of HTML5](https://www.w3.org/TR/html5/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes).

|Recommended (v4.9+)|Deprecated|
|--|--|
|`data-name-format`|`name_format `|
|`data-id-format`|`id_format `|
|`data-empty-val`|`empty_val `|
