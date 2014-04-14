###
jquery.meio.mask.js
@author: fabiomcosta
@version: 1.1.14

Created by Fabio M. Costa on 2008-09-16. Please report any bug at http://www.meiocodigo.com

Copyright (c) 2008 Fabio M. Costa http://www.meiocodigo.com

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
###

(($) ->
  
  # https://github.com/jquery/jquery-migrate/blob/master/src/core.js#L50
  unless $.browser
    uaMatch = (ua) ->
      ua = ua.toLowerCase()
      match = /(chrome)[ \/]([\w.]+)/.exec(ua) or /(webkit)[ \/]([\w.]+)/.exec(ua) or /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) or /(msie) ([\w.]+)/.exec(ua) or ua.indexOf("compatible") < 0 and /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) or []
      match[2] or "0"

    $.browser =
      mozilla: /mozilla/.test(navigator.userAgent.toLowerCase()) and not /webkit/.test(navigator.userAgent.toLowerCase())
      webkit: /webkit/.test(navigator.userAgent.toLowerCase())
      opera: /opera/.test(navigator.userAgent.toLowerCase())
      msie: /msie/.test(navigator.userAgent.toLowerCase())
      android: (navigator.userAgent.toLowerCase().indexOf("mozilla/5.0") > -1 and navigator.userAgent.toLowerCase().indexOf("android ") > -1 and navigator.userAgent.toLowerCase().indexOf("applewebkit") > -1)
      version: uaMatch(navigator.userAgent)
  isMobile = (window.orientation?)
  
  # browsers like firefox2 and before and opera doesnt have the onPaste event, but the paste feature can be done with the onInput event.
  pasteEvent = ((if ($.browser.opera or ($.browser.mozilla and parseFloat($.browser.version.substr(0, 3)) < 1.9)) then "input" else "paste"))
  
  # the timeout is set because we can't get the value from the input without it
  pasteHandler = (e) ->
    e = $.event.fix(e or window.event)
    e.type = "paste"
    el = e.target
    setTimeout (->
      $.event.dispatch.call el, e
      return
    ), 1
    return

  $.event.special.paste =
    setup: ->
      if @addEventListener
        @addEventListener pasteEvent, pasteHandler, false
      else @attachEvent "on" + pasteEvent, pasteHandler  if @attachEvent
      return

    teardown: ->
      if @removeEventListener
        @removeEventListener pasteEvent, pasteHandler, false
      else @detachEvent "on" + pasteEvent, pasteHandler  if @detachEvent
      return

  $.extend mask:
    
    # the mask rules. You may add yours!
    # number rules will be overwritten
    rules:
      z: /[a-z]/
      Z: /[A-Z]/
      a: /[a-zA-Z]/
      "*": /[0-9a-zA-Z]/
      "@": /[0-9a-zA-ZçÇáàãâéèêíìóòôõúùü]/

    
    # these keys will be ignored by the mask.
    # all these numbers where obtained on the keydown event
    keyRepresentation:
      8: "backspace"
      9: "tab"
      13: "enter"
      16: "shift"
      17: "control"
      18: "alt"
      27: "esc"
      33: "page up"
      34: "page down"
      35: "end"
      36: "home"
      37: "left"
      38: "up"
      39: "right"
      40: "down"
      45: "insert"
      46: "delete"
      116: "f5"
      123: "f12"
      224: "command"

    signals:
      "+": ""
      "-": "-"

    
    # default settings for the plugin
    options:
      attr: "alt" # an attr to look for the mask name or the mask itself
      mask: null # the mask to be used on the input
      type: "fixed" # the mask of this mask
      maxLength: -1 # the maxLength of the mask
      defaultValue: "" # the default value for this input
      signal: false # this should not be set, to use signal at masks put the signal you want ('-' or '+') at the default value of this mask.
      # See the defined masks for a better understanding.
      textAlign: true # use false to not use text-align on any mask (at least not by the plugin, you may apply it using css)
      selectCharsOnFocus: true # select all chars from input on its focus
      autoTab: true # auto focus the next form element when you type the mask completely
      setSize: false # sets the input size based on the length of the mask (work with fixed and reverse masks only)
      fixedChars: "[(),.:/ -]" # fixed chars to be used on the masks. You may change it for your needs!
      onInvalid: ->

      onValid: ->

      onOverflow: ->

      onFocus: (input, evt) ->

      onBlur: (input, evt) ->

    
    # masks. You may add yours!
    # Ex: $.fn.setMask.masks.msk = {mask: '999'}
    # and then if the 'attr' options value is 'alt', your input should look like:
    # <input type="text" name="some_name" id="some_name" alt="msk" />
    masks:
      phone:
        mask: "(99) 9999-9999"

      "phone-us":
        mask: "(999) 999-9999"

      cpf:
        mask: "999.999.999-99"

      # cadastro nacional de pessoa fisica (kind of a brazillian ssn)
      cnpj:
        mask: "99.999.999/9999-99"

      date:
        mask: "39/19/9999"

      # uk date
      "date-us":
        mask: "19/39/9999"

      cep:
        mask: "99999-999"

      time:
        mask: "29:59"

      cc:
        mask: "9999 9999 9999 9999"

      # credit card
      integer:
        mask: "999.999.999.999"
        type: "reverse"

      decimal:
        mask: "99,999.999.999.999"
        type: "reverse"
        defaultValue: "000"

      "decimal-us":
        mask: "99.999,999,999,999"
        type: "reverse"
        defaultValue: "000"

      "signed-decimal":
        mask: "99,999.999.999.999"
        type: "reverse"
        defaultValue: "+000"

      "signed-decimal-us":
        mask: "99,999.999.999.999"
        type: "reverse"
        defaultValue: "+000"

    init: ->
      
      # if has not inited...
      unless @hasInit
        self = this
        i = undefined
        keyRep = @keyRepresentation
        @ignore = false
        
        # constructs number rules
        i = 0
        while i <= 9
          @rules[i] = new RegExp("[0-" + i + "]")
          i++
        @keyRep = keyRep
        
        # ignore keys array creation for iphone or the normal ones
        @ignoreKeys = []
        $.each keyRep, (key) ->
          self.ignoreKeys.push parseInt(key, 10)
          return

        @hasInit = true
      return

    set: (el, options) ->
      maskObj = this
      $el = $(el)
      mlStr = "maxLength"
      options = options or {}
      @init()
      $el.each ->
        maskObj.options.attr = options.attr  if options.attr
        $this = $(this)
        o = $.extend({}, maskObj.options)
        attrValue = $this.attr(o.attr)
        tmpMask = ""
        
        # then we look for the 'attr' option
        tmpMask = (if (typeof options is "string") then options else (if (attrValue isnt "") then attrValue else null))
        o.mask = tmpMask  if tmpMask
        
        # then we see if it's a defined mask
        o = $.extend(o, maskObj.masks[tmpMask])  if maskObj.masks[tmpMask]
        
        # then it looks if the options is an object, if it is we will overwrite the actual options
        o = $.extend(o, options)  if typeof options is "object" and options.constructor isnt Array
        
        #then we look for some metadata on the input
        o = $.extend(o, $this.metadata())  if $.metadata
        if o.mask?
          
          # prevents javascript automatic type convertion
          o.mask += ""
          maskObj.unset $this  if $this.data("mask")
          defaultValue = o.defaultValue
          reverse = (o.type is "reverse")
          fixedCharsRegG = new RegExp(o.fixedChars, "g")
          o.maxLength = $this.attr(mlStr)  if o.maxLength is -1
          o = $.extend({}, o,
            fixedCharsReg: new RegExp(o.fixedChars)
            fixedCharsRegG: fixedCharsRegG
            maskArray: o.mask.split("")
            maskNonFixedCharsArray: o.mask.replace(fixedCharsRegG, "").split("")
          )
          
          # setSize option (this is kept when the mask is removed)
          $this.attr "size", o.mask.length  if (o.type is "fixed" or reverse) and o.setSize and not $this.attr("size")
          
          # sets text-align right for reverse masks
          $this.css "text-align", "right"  if reverse and o.textAlign
          if @value isnt "" or defaultValue isnt ""
            
            # apply mask to the current value of the input or to the default value
            val = maskObj.string((if (@value isnt "") then @value else defaultValue), o)
            
            #setting defaultValue fixes the reset button from the form
            @defaultValue = val
            $this.val val
          
          # compatibility patch for infinite mask, that is now repeat
          o.type = "repeat"  if o.type is "infinite"
          $this.data "mask", o
          
          # removes the maxLength attribute (it will be set again if you use the unset method)
          $this.removeAttr mlStr
          
          # setting the input events
          $this.bind("keydown.mask",
            func: maskObj._onKeyDown
            thisObj: maskObj
          , maskObj._onMask).bind("keypress.mask",
            func: maskObj._onKeyPress
            thisObj: maskObj
          , maskObj._onMask).bind("keyup.mask",
            func: maskObj._onKeyUp
            thisObj: maskObj
          , maskObj._onMask).bind("paste.mask",
            func: maskObj._onPaste
            thisObj: maskObj
          , maskObj._onMask).bind("drop.mask",
            func: maskObj._onPaste
            thisObj: maskObj
          , maskObj._onMask).bind("focus.mask", maskObj._onFocus).bind("blur.mask", maskObj._onBlur).bind "change.mask", maskObj._onChange
        return


    
    #unsets the mask from el
    unset: (el) ->
      $el = $(el)
      $el.each ->
        $this = $(this)
        if $this.data("mask")
          maxLength = $this.data("mask").maxLength
          $this.attr "maxLength", maxLength  unless maxLength is -1
          $this.unbind(".mask").removeData "mask"
        return


    
    #masks a string
    string: (str, options) ->
      @init()
      o = {}
      str = String(str)  unless typeof str is "string"
      switch typeof options
        when "string"
          
          # then we see if it's a defined mask
          if @masks[options]
            o = $.extend(o, @masks[options])
          else
            o.mask = options
        when "object"
          o = options
      o.fixedChars = @options.fixedChars  unless o.fixedChars
      fixedCharsReg = new RegExp(o.fixedChars)
      fixedCharsRegG = new RegExp(o.fixedChars, "g")
      
      # insert signal if any
      if (o.type is "reverse") and o.defaultValue
        unless typeof @signals[o.defaultValue.charAt(0)] is "undefined"
          maybeASignal = str.charAt(0)
          o.signal = (if (typeof @signals[maybeASignal] isnt "undefined") then @signals[maybeASignal] else @signals[o.defaultValue.charAt(0)])
          o.defaultValue = o.defaultValue.substring(1)
      @__maskArray str.split(""), o.mask.replace(fixedCharsRegG, "").split(""), o.mask.split(""), o.type, o.maxLength, o.defaultValue, fixedCharsReg, o.signal

    
    # all the 3 events below are here just to fix the change event on reversed masks.
    # It isn't fired in cases that the keypress event returns false (needed).
    _onFocus: (e) ->
      $this = $(this)
      dataObj = $this.data("mask")
      dataObj.inputFocusValue = $this.val()
      dataObj.changed = false
      $this.select()  if dataObj.selectCharsOnFocus
      
      # trigger mask function
      dataObj.onFocus this, e
      return

    _onBlur: (e) ->
      $this = $(this)
      dataObj = $this.data("mask")
      $this.trigger "change"  if dataObj.inputFocusValue isnt $this.val() and not dataObj.changed
      
      # trigger  mask function
      dataObj.onBlur this, e
      return

    _onChange: (e) ->
      $(this).data("mask").changed = true
      return

    _onMask: (e) ->
      thisObj = e.data.thisObj
      o = {}
      o._this = e.target
      o.$this = $(o._this)
      o.data = o.$this.data("mask")
      return true  if o.$this.attr("readonly") or not o.data
      o[o.data.type] = true
      o.value = o.$this.val()
      o.nKey = thisObj.__getKeyNumber(e)
      o.range = thisObj.__getRange(o._this)
      o.valueArray = o.value.split("")
      e.data.func.call thisObj, e, o

    _onKeyDown: (e, o) ->
      
      # lets say keypress at desktop == keydown at iphone (theres no keypress at iphone)
      @ignore = $.inArray(o.nKey, @ignoreKeys) > -1 or ((e.ctrlKey or e.metaKey or e.altKey) and e.key)
      if @ignore
        rep = @keyRep[o.nKey]
        o.data.onValid.call o._this, rep or "", o.nKey
      true

    _onKeyUp: (e, o) ->
      
      #9=TAB_KEY 16=SHIFT_KEY
      #this is a little bug, when you go to an input with tab key
      #it would remove the range selected by default, and that's not a desired behavior
      return true  if o.nKey is 9 or o.nKey is 16
      if o.repeat
        @__autoTab o
        return true
      @_onPaste e, o

    _onPaste: (e, o) ->
      
      # changes the signal at the data obj from the input
      @__changeSignal e.type, o  if o.reverse
      $thisVal = @__maskArray(o.valueArray, o.data.maskNonFixedCharsArray, o.data.maskArray, o.data.type, o.data.maxLength, o.data.defaultValue, o.data.fixedCharsReg, o.data.signal)
      o.$this.val $thisVal
      
      # this makes the caret stay at first position when
      # the user removes all values in an input and the plugin adds the default value to it (if it haves one).
      @__setRange o._this, o.range.start, o.range.end  if not o.reverse and o.data.defaultValue.length and (o.range.start is o.range.end)
      
      #fix so ie's and safari's caret won't go to the end of the input value.
      @__setRange o._this, o.range.start, o.range.end  if ($.browser.msie or $.browser.safari) and not o.reverse
      return true  if @ignore
      @__autoTab o
      true

    _onKeyPress: (e, o) ->
      return true  if @ignore
      
      # changes the signal at the data obj from the input
      @__changeSignal e.type, o  if o.reverse
      c = String.fromCharCode(o.nKey)
      rangeStart = o.range.start
      rawValue = o.value
      maskArray = o.data.maskArray
      if o.reverse
        
        # the input value from the range start to the value start
        valueStart = rawValue.substr(0, rangeStart)
        
        # the input value from the range end to the value end
        valueEnd = rawValue.substr(o.range.end, rawValue.length)
        rawValue = valueStart + c + valueEnd
        
        #necessary, if not decremented you will be able to input just the mask.length-1 if signal!=''
        #ex: mask:99,999.999.999 you will be able to input 99,999.999.99
        rangeStart -= o.data.signal.length  if o.data.signal and (rangeStart - o.data.signal.length > 0)
      valueArray = rawValue.replace(o.data.fixedCharsRegG, "").split("")
      
      # searches for fixed chars begining from the range start position, till it finds a non fixed
      extraPos = @__extraPositionsTill(rangeStart, maskArray, o.data.fixedCharsReg)
      o.rsEp = rangeStart + extraPos
      o.rsEp = 0  if o.repeat
      
      # if the rule for this character doesnt exist (value.length is bigger than mask.length)
      # added a verification for maxLength in the case of the repeat type mask
      if not @rules[maskArray[o.rsEp]] or (o.data.maxLength isnt -1 and valueArray.length >= o.data.maxLength and o.repeat)
        
        # auto focus on the next input of the current form
        o.data.onOverflow.call o._this, c, o.nKey
        return false
      
      # if the new character is not obeying the law...
      else unless @rules[maskArray[o.rsEp]].test(c)
        o.data.onInvalid.call o._this, c, o.nKey
        return false
      else
        o.data.onValid.call o._this, c, o.nKey
      $thisVal = @__maskArray(valueArray, o.data.maskNonFixedCharsArray, maskArray, o.data.type, o.data.maxLength, o.data.defaultValue, o.data.fixedCharsReg, o.data.signal, extraPos)
      o.$this.val $thisVal  unless o.repeat
      (if (o.reverse) then @_keyPressReverse(e, o) else (if (o.fixed) then @_keyPressFixed(e, o) else true))

    _keyPressFixed: (e, o) ->
      if o.range.start is o.range.end
        
        # the 0 thing is because theres an unwanted behavior when you put a default
        # value on a fixed mask and you select the value from the input the range would go to the
        # end of the string when you enter a char. with this it will overwrite the first char wich is a better behavior.
        # opera fix, cant have range value bigger than value length, i think it loops thought the input value...
        @__setRange o._this, o.rsEp, o.rsEp + 1  if (o.rsEp is 0 and o.value.length is 0) or o.rsEp < o.value.length
      else
        @__setRange o._this, o.range.start, o.range.end
      true

    _keyPressReverse: (e, o) ->
      
      # fix for ie
      # this bug was pointed by Pedro Martins
      # it fixes a strange behavior that ie was having after a char was inputted in a text input that
      # had its content selected by any range
      @__setRange o._this, o.value.length  if $.browser.msie and ((o.range.start is 0 and o.range.end is 0) or o.range.start isnt o.range.end)
      false

    __autoTab: (o) ->
      if o.data.autoTab and ((o.$this.val().length >= o.data.maskArray.length and not o.repeat) or (o.data.maxLength isnt -1 and o.valueArray.length >= o.data.maxLength and o.repeat))
        nextEl = @__getNextInput(o._this, o.data.autoTab)
        if nextEl
          o.$this.trigger "blur"
          nextEl.focus().select()
      return

    
    # changes the signal at the data obj from the input
    __changeSignal: (eventType, o) ->
      if o.data.signal isnt false
        inputChar = (if (eventType is "paste") then o.value.charAt(0) else String.fromCharCode(o.nKey))
        o.data.signal = @signals[inputChar]  if @signals and (typeof @signals[inputChar] isnt "undefined")
      return

    __getKeyNumber: (e) ->
      e.charCode or e.keyCode or e.which

    
    # this function is totaly specific to be used with this plugin, youll never need it
    # it gets the array representing an unmasked string and masks it depending on the type of the mask
    __maskArray: (valueArray, maskNonFixedCharsArray, maskArray, type, maxlength, defaultValue, fixedCharsReg, signal, extraPos) ->
      valueArray.reverse()  if type is "reverse"
      valueArray = @__removeInvalidChars(valueArray, maskNonFixedCharsArray, type is "repeat" or type is "infinite")
      valueArray = @__applyDefaultValue.call(valueArray, defaultValue)  if defaultValue
      valueArray = @__applyMask(valueArray, maskArray, extraPos, fixedCharsReg)
      switch type
        when "reverse"
          valueArray.reverse()
          return (signal or "") + valueArray.join("").substring(valueArray.length - maskArray.length)
        when "infinite", "repeat"
          joinedValue = valueArray.join("")
          return (if (maxlength isnt -1 and valueArray.length >= maxlength) then joinedValue.substring(0, maxlength) else joinedValue)
        else
          return valueArray.join("").substring(0, maskArray.length)
      ""

    
    # applyes the default value to the result string
    __applyDefaultValue: (defaultValue) ->
      defLen = defaultValue.length
      thisLen = @length
      i = undefined
      
      #removes the leading chars
      i = thisLen - 1
      while i >= 0
        if this[i] is defaultValue.charAt(0)
          @pop()
        else
          break
        i--
      
      # apply the default value
      i = 0
      while i < defLen
        this[i] = defaultValue.charAt(i)  unless this[i]
        i++
      this

    
    # Removes values that doesnt match the mask from the valueArray
    # Returns the array without the invalid chars.
    __removeInvalidChars: (valueArray, maskNonFixedCharsArray, repeatType) ->
      
      # removes invalid chars
      i = 0
      y = 0

      while i < valueArray.length
        if maskNonFixedCharsArray[y] and @rules[maskNonFixedCharsArray[y]] and not @rules[maskNonFixedCharsArray[y]].test(valueArray[i])
          valueArray.splice i, 1
          y--  unless repeatType
          i--
        y++  unless repeatType
        i++
      valueArray

    
    # Apply the current input mask to the valueArray and returns it.
    __applyMask: (valueArray, maskArray, plus, fixedCharsReg) ->
      plus = 0  if typeof plus is "undefined"
      
      # apply the current mask to the array of chars
      i = 0

      while i < valueArray.length + plus
        valueArray.splice i, 0, maskArray[i]  if maskArray[i] and fixedCharsReg.test(maskArray[i])
        i++
      valueArray

    
    # searches for fixed chars begining from the range start position, till it finds a non fixed
    __extraPositionsTill: (rangeStart, maskArray, fixedCharsReg) ->
      extraPos = 0
      extraPos++  while fixedCharsReg.test(maskArray[rangeStart++])
      extraPos

    __getNextInput: (input, selector) ->
      form = input.form
      return null  unless form?
      formEls = form.elements
      initialInputIndex = $.inArray(input, formEls) + 1
      len = formEls.length
      $input = null
      i = undefined
      
      # look for next input on the form of the pased input
      i = initialInputIndex
      while i < len
        $input = $(formEls[i])
        return $input  if @__isNextInput($input, selector)
        i++
      forms = document.forms
      initialFormIndex = $.inArray(input.form, forms) + 1
      y = undefined
      tmpFormEls = undefined
      _len = forms.length
      
      # look for the next forms for the next input
      y = initialFormIndex
      while y < _len
        tmpFormEls = forms[y].elements
        len = tmpFormEls.length
        i = 0
        while i < len
          $input = $(tmpFormEls[i])
          return $input  if @__isNextInput($input, selector)
          i++
        y++
      null

    __isNextInput: ($formEl, selector) ->
      formEl = $formEl.get(0)
      formEl and (formEl.offsetWidth > 0 or formEl.offsetHeight > 0) and formEl.nodeName isnt "FIELDSET" and (selector is true or (typeof selector is "string" and $formEl.is(selector)))

    
    # http://www.bazon.net/mishoo/articles.epl?art_id=1292
    __setRange: (input, start, end) ->
      end = start  if typeof end is "undefined"
      if input.setSelectionRange
        input.setSelectionRange start, end
      else
        
        # assumed IE
        range = input.createTextRange()
        range.collapse()
        range.moveStart "character", start
        range.moveEnd "character", end - start
        range.select()
      return

    
    # adaptation from http://digitarald.de/project/autocompleter/
    __getRange: (input) ->
      if not $.browser.msie and not $.browser.android
        return (
          start: input.selectionStart
          end: input.selectionEnd
        )
      pos =
        start: 0
        end: 0

      range = document.selection.createRange()
      pos.start = 0 - range.duplicate().moveStart("character", -100000)
      pos.end = pos.start + range.text.length
      pos

    
    #deprecated
    unmaskedVal: (el) ->
      $(el).val().replace $.mask.fixedCharsRegG, ""

  $.fn.extend
    setMask: (options) ->
      $.mask.set this, options

    unsetMask: ->
      $.mask.unset this

    
    #deprecated
    unmaskedVal: ->
      $.mask.unmaskedVal this[0]

  return
) jQuery
