[![Build Status](https://travis-ci.org/fabiomcosta/jquery-meiomask.png?branch=master)](https://travis-ci.org/fabiomcosta/jquery-meiomask)
[![Code Climate](https://codeclimate.com/github/fabiomcosta/jquery-meiomask.png)](https://codeclimate.com/github/fabiomcosta/jquery-meiomask)

# jQuery MeioMask

jQuery MeioMask - a jquery plugin for masking text inputs.

## Maintainer

http://github.com/johnvoloski

## CDN

  See [http://cdnjs.com/libraries/jquery.meiomask](http://cdnjs.com/libraries/jquery.meiomask).

## Install via Bower

* Latest version:           `$ bower install jquery-meiomask`
* Install specific version: `$ bower install jquery-meiomask#~1.1.14`
* Or put in `bower.json`:
  <br/>`"jquery-meiomask": "~1.1.14"`
  <br/>`$ bower install`
* Include script within HTML: 
`<script src="bower_components/jquery-meiomask/dist/meiomask.js" type="text/javascript"></script>`
<br/>or<br/>
`<script src="bower_components/jquery-meiomask/dist/meiomask.min.js" type="text/javascript"></script>`

## Install via Rails

See [meiomask-rails gem](https://github.com/johnvoloski/meiomask-rails).

## Dependencies

The only dependency is jQuery itself.

## How to use
<html>
  <head>
    <script src="jquery-1.10.2.js"></script>
    <script src="meiomask.min.js"></script>
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

## Documentation

http://www.meiocodigo.com/projects/meiomask/

## Demos

You can see some demos inside the documentation at http://www.meiocodigo.com/projects/meiomask/#mm_demos
and can play with them on the tests/visual-tests.html file.
