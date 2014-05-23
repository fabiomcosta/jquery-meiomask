## v1.1.14
* Organizing versions and adding to cdnjs

### v1.1.13
* Bug fix

### v1.1.12
* change continuous integration to Grunt
* remove ruby and jasmine
* split README file into four new archives `AUTHORS`, `CHANGELOG`, `CONTRIBUTING`, and `LICENCE-MIT`
* bug fixes
* adding codeclimate

### v1.1.11
* continuous integration
* automated testing
* responsive visual tests

### v1.1.10
* Adding self to jQuery's plugin's repository http://plugins.jquery.com/

### v1.1.8
* Adding new callbacks onFocus and onBlur.

### v1.1.7
* Fixes errors related to $.browser, that was removed from jQuery.

### v1.1.6
* Doesn't throw errors while using autoTab on an input that has no parent form. https://github.com/fabiomcosta/jquery-meiomask/issues/8
* Does not jump the carret to the end of the input while trying to change the current text on an input with the 'repeat' mask. https://github.com/fabiomcosta/jquery-meiomask/pull/14

### v1.1.5
* Fixes bug while being used on mobile.
* Fixes bug on repeat mask. All chars were being added to the end of the input.

### v1.1.4
* Some internal better organization
* Fixes bug on paste on IE7 while trying to paste from the mouse contextual menu

### v1.1.1
* Fixed caret bug on 'repeat' masks;
* Fixed keyup event on fixed masks, it is now firing propertly;
* Added selectCharsOnFocus option;
* Added textAlign option.

### v1.1
* Mask type 'infinite' is now called 'repeat' (using 'infinite' still works but it is deprecated). It now allows a maxLenght value to be set. MaxLength can be setted by the maxLength attribute or the maxLength option;
* You can easily set an auto-tab option that will focus the next form element when the masked input is totaly filled. It is true by default but you can put a jQuery selector string to match the next element you want to be focused.
* Deprecated 'unmaskVal' function. This function is too buggy... works for most cases but not all. The best way to unmask a value is by doing it yourself;
* 'phone-us' mask is now '(999) 999-9999';
* Correctly fires the onChange event on reverse masked inputs.

### v1.0.4
* New mask type 'infinite', it allows infinite values at masks. See demos for a better understanding;
* Added new function 'unmaskVal' that returns the input value without the mask. See demos for a better understanding;
* Removed a serious bug at IE that was fixing the caret at the end of the input;

### v1.0.3
* Callback functions now receive the char number as it second parameter, so it is possible to detect exactly which key has been pressed;
* Added the signed masks. It only works with the reverse mask. See demos for more details;
* iPhone support improved. iPhone now works 100% better than the 1.0.2 version. I'ts logic have been changed, and now it's working with full features. :P

### v1.0.2
* Added input callbacks: onInvalid, onValid and onOverflow;
* Added support for default values;
* Can now be used like $().setMask({});
* Added the function $.mask.string(string,mask) that will mask a string (see demos);
* Now the value of the input is masked at the time the mask is applyed to it.

### v1.0.1
* Added support for iphone;
* Removed a bug where a fixed char would be replaced by an inputed one.

### v1.0
* initial release.
