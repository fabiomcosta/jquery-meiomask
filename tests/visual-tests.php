
<?php $version = isset($_GET['version'])? $_GET['version']: '1.2.6'; ?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta name="robots" content="index,follow" />
		<meta http-equiv="Content-type" content="text/html; charset=utf-8">
		<title>meioMask - Visual tests</title>
		
		<link rel="stylesheet" href="../assets/syntax-highlighter/SyntaxHighlighter.css" type="text/css" />
		<link rel="stylesheet" href="../assets/syntax-highlighter/docs.css" type="text/css" />
		<script type="text/javascript" src="../assets/syntax-highlighter/shCore.js"></script>
		<script type="text/javascript" src="../assets/syntax-highlighter/shBrushJScript.js"></script>
		<script type="text/javascript" src="../assets/syntax-highlighter/shBrushPhp.js"></script>
		<script type="text/javascript" src="../assets/syntax-highlighter/shBrushXml.js"></script>
		<script type="text/javascript" src="../assets/js-spec/Builder.js"></script>
		
		<script type="text/javascript" src="../assets/jquery/jquery-<?php echo $version; ?>.js"></script>
		<?php if ($version=='1.2.6'): ?>
			<script type="text/javascript" src="../assets/jquery/jquery.metadata.js"></script>
		<?php endif; ?>
		
		<script type="text/javascript" charset="utf-8">
			Builder.build('../', {
				'source': ['jquery.meio.mask']
			});
			dp.SyntaxHighlighter.ClipboardSwf = 'clipboard.swf';
			dp.SyntaxHighlighter.HighlightAll('code');
		</script>
		
		<script type="text/javascript" >
			(function($){
				$(function(){
					$('input:text').setMask();
				});
			})(jQuery);
		</script>
	</head>
	<body>
		<div id="content">
	
		<p><a title="1.2.6" href="?version=1.2.6">1.2.6</a></p>
		<p><a title="1.3.2" href="?version=1.3.2">1.3.2</a></p>
	
		<h2>Menu</h2>
		<ul>
			<li><a title="Standalone" href="#mm_standalone">Standalone</a></li>
			<li><a title="With Metadata Plugin" href="#mm_metadata">With Metadata Plugin</a></li>
			<li><a title="Paste Feature Demo" href="#mm_paste">Paste Feature</a></li>
			<li><a title="Change on-the-fly" href="#mm_change_on_the_fly">Change on-the-fly</a></li>
			<li><a title="The $.mask.string() Function" href="#mm_mask_string">The $.mask.string() Function</a></li>
			<li><a title="Applied to a Readonly Input" href="#mm_readonly">Applied to a Readonly Input</a></li>
			<li><a title="The Callbacks" href="#mm_callback">The Callbacks</a></li>
			<li><a title="Signed Reverse Masks" href="#mm_signed">Signed Reverse Masks</a></li>
		</ul>

		<script type="text/javascript">
			//(function($) {
				$.mask.masks.msk = {mask: '999'};
			//})(jQuery);
		</script>
	
		<form action="index_submit" method="get">
			<fieldset>
				<legend>Input with the 'msk' Mask</legend>
				<label for="msk">Msk:</label>
				<input type="text" id="msk_input_mask" alt="msk" />
				<br />
				<input type="password" id="msk_input_mask2" />
				<br />
				<input type="checkbox" id="msk_input_mask3" />
			</fieldset>
		</form>

		<h3 id="mm_standalone">standalone</h3>
		<form action="index_submit" method="get">
			<fieldset>
				<legend>Example form with defined masks</legend>
				<label for="cpf">Credit Card:</label>
				<input type="text" id="cc" name="cc" alt="cc" />
			
				<label for="time_example">Time:</label>
				<input type="text" id="time_example" alt="time" />
			
				<label for="decimal">Decimal number:</label>
				<input type="text" id="decimal" name="some_name" value="12345" alt="decimal" />
				
				<label for="decimal">Decimal number: (with diferent attr)</label>
				<input type="text" id="decimal_data-mask" name="some_name" value="12345" data-mask="decimal" />
				
				<input type="reset" name="some_name" value="RESET TEST" id="some_name" />
				<script type="text/javascript">
					/*(function($) {
						$(function(){
							$('#decimal_data-mask').setMask({'attr': 'data-mask'});
						});
					})(jQuery);*/
				</script>
			
			</fieldset>
		</form>
	
		<h2 id="mm_paste">meioMask paste feature demo</h2>
		<form action="index_submit" method="get">
			<fieldset>
				<legend>Example form for the paste feature</legend>
				<label for="cpf">Phone example:</label>
				<p>copy:  <strong>1234567890</strong>  and paste at the input</p>
				<p>copy:  <strong>(12) 3456-7890</strong>  and paste at the input</p>
				<p>copy:  <strong>12abcdef34567890</strong>  and paste at the input</p>
				<input type="text" id="phone" name="phone" alt="phone" />
			</fieldset>
		</form>
	
		<h3 id="mm_metadata">with metadata plugin</h3>
		<form action="index_submit" method="get">
			<fieldset>
				<legend>Example form with masks using metadata plugin</legend>
				<label for="metadata1">Mask '555-666':</label>
				<input type="text" id="metadata1" class="{mask:'555-666'}"  alt="(99) 666" />
				<span>metadata overwrote the '(99) 666' mask set at alt attribute</span>
			
				<label for="metadata1">Mask '555-666':</label>
				<input type="text" id="metadata1" class="{mask:'555-666'}"  alt="phone" />
				<span>metadata overwrote the 'phone' mask set at alt attribute</span>
			
				<label for="cpf">Mask '666-888':</label>
				<input type="text" class="teste {mask:'666-888'}" name="some_name" />
		    
			</fieldset>
		</form>
	
		<h3 id="mm_change_on_the_fly">change mask on-the-fly</h3>
		<form action="index_submit" method="get">
			<fieldset>
				<legend>Example form with the change-on-the-fly feature</legend>
				<label for="change_mask">Mask '(99) 666':</label>
				<input type="text" id="change_mask" alt="(99) 666" maxlength="10" />
				<ul>
					<li><a onclick="jQuery('#change_mask').setMask('***:***').val('');return false;" href="#">Change mask to '***:***'</a></li>
					<li><a onclick="jQuery('#change_mask').setMask('(aaa) **-9999').val('');return false;" href="#">Change mask to '(aaa) **-9999'</a></li>
	 				<li><a onclick="jQuery('#change_mask').unsetMask().val('');return false;" href="#">unset the mask</a></li>
				</ul>
			</fieldset>
		</form>
	
		<h3 id="mm_mask_string">mask string example</h3>
	
		<form action="index_submit" method="get">
			<fieldset>
				<legend>Example that shows the $.mask.string() function</legend>
				<label for="dumb_input">Enter any input:</label>
				<input type="text" id="dumb_input" /><span style="padding-left:10px;color:#0000FF;" id="masked_string"></span>
				<ul>
					<li><a id="lmask_string1" href="#">Mask input value to '99/99/99'</a></li>
					<li><a id="lmask_string2" href="#">Mask input value to 'phone'</a></li>
					<li><a id="lmask_string3" href="#">Mask input value to {mask:'999.999,999',type:'reverse'}</a></li>
					<li><a id="lmask_string4" href="#">Mask input value to 'signed-decimal'</a></li>
				</ul>
				<script type="text/javascript">
					/*(function($) {
						$('#lmask_string1').click(function(){
							$('#masked_string').text( 'Masked value: "'+$.mask.string( $('#dumb_input').val(), '99/99/99' )+'"' );
							return false;
						});
						$('#lmask_string2').click(function(){
							$('#masked_string').text( 'Masked value: "'+$.mask.string( $('#dumb_input').val(), 'phone' )+'"' );
							return false;
						});
						$('#lmask_string3').click(function(){
							$('#masked_string').text( 'Masked value: "'+$.mask.string( $('#dumb_input').val(), {mask:'999.999,999',type:'reverse'} )+'"' );
							return false;
						});
						$('#lmask_string4').click(function(){
							$('#masked_string').text( 'Masked value: "'+$.mask.string( $('#dumb_input').val(), 'signed-decimal' )+'"' );
							return false;
						});
					})(jQuery);*/
				</script>
			</fieldset>
		</form>
	
		<h3 id="mm_readonly">read-only inputs</h3>
	
		<form action="index_submit" method="get">
			<fieldset>
				<legend>Example that shows a readonly input working as it should (some plugins breaks this!)</legend>
				<label for="readonly_input">Mask '999.999.999,99':</label>
				<input type="text" readonly="readonly" alt="decimal" />
			</fieldset>
		</form>
	
		<h3 id="mm_callback">callbacks example</h3>
	
		<form action="index_submit" method="get">
			<fieldset>
				<legend>Example with a input and defined callbacks</legend>
				<label for="cb_test_input">Mask '99.99-99/99':</label>
				<input type="text" id="cb_test_input" />
				<span id="cb_alerts"></span>
			</fieldset>
		</form>
	
		<h3 id="mm_signed">signed masks example</h3>
	
		<form action="index_submit" method="get">
			<fieldset>
				<legend>Example with signed masks ('-' and '+' keys will change they're signal)</legend>
				<label for="signed_mask1">Mask 'signed-decimal':</label>
				<input type="text" alt="signed-decimal" />
				<label for="signed_mask2">Mask 'signed-decimal' with negative value at input:</label>
				<input type="text" value="-4445" alt="signed-decimal" />
				<label for="signed_mask3">Mask '999.999,99', reverse, with defaultValue='-000' (this example uses the metadata plugin):</label>
				<input type="text" class="{mask:'99,999.999',type:'reverse',defaultValue:'-000'}" />
				<input class="{mask:'9',type:'repeat'}" type="text" maxlength="10" />
			</fieldset>
		</form>
	</div>
	
	<script type="text/javascript">
		/*$('#cb_test_input').setMask({mask:'99.99-99/99', defaultValue: '000',
			onInvalid:function(c,nKey){
				$('#cb_alerts').text('You can\'t input "'+c+'" in here. It\'s keynumber is "'+nKey+'".');
				$(this).css('background','red');
			},
			onValid: function(c,nKey){
				$('#cb_alerts').text('"'+c+'" is ok. It\'s keynumber is "'+nKey+'".');
				$(this).css('background','#40FF3F');
			},
			onOverflow: function(c,nKey){
				$('#cb_alerts').text("You can't enter more characters but your input might be ok!");
				$(this).css('background','green');
			}
		});*/
	</script>

	</body>
</html>