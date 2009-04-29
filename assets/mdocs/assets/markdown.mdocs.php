<?php

/**
 * MarkdownExtra + mDocs Modifications
 * 
 * This class adds new features to MarkdownExtra, such as:
 * 
 * 		- Auto Header IDs for headers within the $maxlevel/minlevel
 * 		- Code Block Class/ID specification (used to specify the code language)
 * 		- And other fun stuff!
 * 
 * New Markdown Syntax Examples:
 * 		
 * 		{.javascript}
 * 		alert('my-javascript');
 * 
 * ~~~~~~~~~~~~~~~~~~~~~
 * {.php}
 * echo phpversion();
 * ~~~~~~~~~~~~~~~~~~~~~
 *
 * @author Jay Williams
 */
class MarkdownExtra_Parser_mDocs extends MarkdownExtra_Parser
{
	/**
	 * The maximum header level to create ID anchors
	 *
	 * @var int
	 */
	var $maxlevel = 1;
	
	/**
	 * The minimum header level to create ID anchors
	 *
	 * @var int
	 */
	var $minlevel = 2;
	
	function _doHeaders_permalink($title='')
	{
		$title = preg_replace('/[^a-z0-9:]/','',strtolower($title));
		
		return $title;
	}

	function _doHeaders_attr($attr='',$title='') {
		if (empty($attr) && empty($title))
			return "";
		elseif(!empty($attr) && empty($title))
			return " id=\"$attr\"";
		elseif(!empty($attr) && !empty($title))
			return $attr;
		elseif(empty($attr) && !empty($title))
			return $this->_doHeaders_permalink($title);
	}

	function _doHeaders_callback_setext($matches) {
		if ($matches[3] == '-' && preg_match('{^- }', $matches[1]))
			return $matches[0];
		
		$level = $matches[3]{0} == '=' ? 1 : 2;
		$id    = & $matches[2];
		$title = & $this->runSpanGamut($matches[1]);
		
		if ($level >= $this->maxlevel && $level <= $this->minlevel) {
			$attr  = $this->_doHeaders_attr($id ,$title);
			$block = "<h$level id=\"$attr\"><a href=\"#$attr\">".$title."</a></h$level>";
		}else {
			$attr  = $this->_doHeaders_attr($id);
			$block = "<h$level$attr>$title</a></h$level>";
		}

		return "\n" . $this->hashBlock($block) . "\n\n";
	}
	function _doHeaders_callback_atx($matches) {
		
		$level = strlen($matches[1]);
		$id    = & $matches[3];
		$title = & $this->runSpanGamut($matches[2]);

		if ($level >= $this->maxlevel && $level <= $this->minlevel) {
			$attr  = $this->_doHeaders_attr($id, $title);
			$block = "<h$level id=\"$attr\"><a href=\"#$attr\">".$title."</a></h$level>";
		}else {
			$attr  = $this->_doHeaders_attr($id);
			$block = "<h$level$attr>".$title."</h$level>";
		}
		
		return "\n" . $this->hashBlock($block) . "\n\n";
	}

	function _doCodeBlocks_callback($matches) {
		$codeblock = $matches[1];

		$codeblock = $this->outdent($codeblock);
		$codeblock = htmlspecialchars($codeblock, ENT_NOQUOTES);

		# trim leading newlines and trailing newlines
		$codeblock = preg_replace('/\A\n+|\n+\z/', '', $codeblock);
		
			
		# Get code block language if specfied on the first line
		# Example: {.php} (sets <pre> class) or {#php} (sets <pre> id)
		if(preg_match('/^(\s+)?{(\.|#)([\w\-\_]+)}(\s+)?\n/',$codeblock,$language))
		{
			// Remove the language specification the codeblock:
			$codeblock = substr($codeblock,strlen($language[0]));
			
			$attr_name = ($language[2] == '.')? 'class' : 'id'; 
			$attr = " $attr_name=\"$language[3]\"";
		}
		else 
		{
			$attr = "";
		}
			
		$codeblock = "<pre$attr><code>$codeblock\n</code></pre>";
		return "\n\n".$this->hashBlock($codeblock)."\n\n";
	}
	
	function _doFencedCodeBlocks_callback($matches) {
		$codeblock = $matches[2];
		$codeblock = htmlspecialchars($codeblock, ENT_NOQUOTES);
		$codeblock = preg_replace_callback('/^\n+/',
			array(&$this, '_doFencedCodeBlocks_newlines'), $codeblock);
		
		
		# Get code block language if specfied on the first line
		# Example: {.php} (sets <pre> class) or {#php} (sets <pre> id)
		if(preg_match('/^(\s+)?{(\.|#)([\w\-\_]+)}(\s+)?\n/',$codeblock,$language))
		{
			// Remove the language specification the codeblock:
			$codeblock = substr($codeblock,strlen($language[0]));
			
			$attr_name = ($language[2] == '.')? 'class' : 'id'; 
			$attr = " $attr_name=\"$language[3]\"";
		}
		else 
		{
			$attr = "";
		}
			
		$codeblock = "<pre$attr><code>$codeblock\n</code></pre>";
		// $codeblock = "<pre><code>$codeblock</code></pre>";
		return "\n\n".$this->hashBlock($codeblock)."\n\n";
	}
	

}


?>