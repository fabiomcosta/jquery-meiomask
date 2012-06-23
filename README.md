jQuery MeioMask - Copyright (c) 2008-09-16 [Fábio Miranda Costa](http://meiocodigo.com/)
==================================================================================

jQuery MeioMask - a jquery plugin for masking text inputs.

Dependencies
------------

The only dependency is jQuery itself.

How to use
----------
    <html>
        <head>
            <script src="jquery-1.7.2.js"></script>
            <script src="jquery.meio.mask.min.js"></script>
        </head>

        <body>
            <form>
                <label for="time">Time Mask:</label>
                <input type="text" id="time" name="time" data-mask="time" />
            </form>

            <script>
                $('input[data-mask]').each(function() {
                    var input = $(this);
                    input.setMask(input.data('mask'));
                });
            </script>
        </body>
    </html>


Documentation
-------------

http://www.meiocodigo.com/projects/meiomask/

Demos
-----

You can see some demos inside the documentation at http://www.meiocodigo.com/projects/meiomask/#mm_demos
and can play with them on the tests/visual-tests.html file.

Changelog
---------

## v1.1.5
* fixes bug while being used on mobile.
* fixes bug on repeat mask. All chars were being added to the end of the input.
## v1.1.4
* some internal better organization
* fixes bug on paste on IE7 while trying to paste from the mouse contextual menu
## v1.1.1
* Fixed caret bug on 'repeat' masks;
* Fixed keyup event on fixed masks, it is now firing propertly;
* Added selectCharsOnFocus option;
* Added textAlign option.
## v1.1
* Mask type 'infinite' is now called 'repeat' (using 'infinite' still works but it is deprecated). It now allows a maxLenght value to be set. MaxLength can be setted by the maxLength attribute or the maxLength option;
* You can easily set an auto-tab option that will focus the next form element when the masked input is totaly filled. It is true by default but you can put a jQuery selector string to match the next element you want to be focused.
* Deprecated 'unmaskVal' function. This function is too buggy... works for most cases but not all. The best way to unmask a value is by doing it yourself;
* 'phone-us' mask is now '(999) 999-9999';
* Correctly fires the onChange event on reverse masked inputs.
## v1.0.4
* New mask type 'infinite', it allows infinite values at masks. See demos for a better understanding;
* Added new function 'unmaskVal' that returns the input value without the mask. See demos for a better understanding;
* Removed a serious bug at IE that was fixing the caret at the end of the input;
## v1.0.3
* Callback functions now receive the char number as it second parameter, so it is possible to detect exactly which key has been pressed;
* Added the signed masks. It only works with the reverse mask. See demos for more details;
* iPhone support improved. iPhone now works 100% better than the 1.0.2 version. I'ts logic have been changed, and now it's working with full features. :P
## v1.0.2
* Added input callbacks: onInvalid, onValid and onOverflow;
* Added support for default values;
* Can now be used like $().setMask({});
* Added the function $.mask.string(string,mask) that will mask a string (see demos);
* Now the value of the input is masked at the time the mask is applyed to it.
## v1.0.1
* Added support for iphone;
* Removed a bug where a fixed char would be replaced by an inputed one.
## v1.0
* initial release.

License
-------

The MIT License (http://www.opensource.org/licenses/mit-license.php)

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.


