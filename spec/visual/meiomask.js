$(document).ready(function() {
  $('button[name=change_fly_one]').click(function() {
    $('#change_on_the_fly').setMask('***:***').val('');
  });

  $('button[name=change_fly_second]').click(function() {
    $('#change_on_the_fly').setMask('(aaa) **-999').val('');
  });

  $('button[name=change_fly_third]').click(function() {
    $('#change_on_the_fly').unsetMask().val('');
  });

  $('button[name=mask_string_one]').click(function() {
    $('#mask_string_span').text('Masked value: '+ $.mask.string($('#mask_string').val(), '99/99/99'));
  });

  $('button[name=mask_string_second]').click(function() {
    $('#mask_string_span').text('Masked value: '+ $.mask.string($('#mask_string').val(), 'phone'));
  });

  $('button[name=mask_string_third]').click(function() {
    $('#mask_string_span').text('Masked value: '+ $.mask.string($('#mask_string').val(), {mask: '999.999,999', type: 'reverse'}));
  });

  $('button[name=mask_string_fourth]').click(function() {
    $('#mask_string_span').text('Masked value: '+ $.mask.string($('#mask_string').val(), 'signed-decimal'));
  });

  $('#invalid_character').setMask({mask: '99.99-99/99', onInvalid: function(character, keycode) {
    $('#invalid_span').text('Invalid Callback is called.');
  }});

  $('#valid_character').setMask({mask: '99.99-99/99', onValid: function(character, keycode) {
    $('#valid_span').text('Valid Callback is called.');
  }});

  $('#overflow').setMask({mask: '99.99-99/99', onOverflow: function(character, keycode) {
    $('#overflow_span').text('Oveflow Callback is called.');
  }});

  $('#focus').setMask({mask: '99.99-99/99', onFocus: function(input, evt) {
    $('#focus_span').text('Focus Callback is called.');
  }});

  $('#blur').setMask({mask: '99.99-99/99', onBlur: function(input, evt) {
    $('#blur_span').text('Blur Callback is called.');
  }});
});
