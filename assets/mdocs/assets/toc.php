<?php

/**
* Create a Table of Contents based off the specified HTML
* 
* Example:
* 
* 	$toc = new TOC( $html );
* 	echo $toc->generate();
* 
* 
* @author Jay Williams
*/
class TOC
{
	/**
	 * The HTML to scan when creating the Table of Contents
	 *
	 * @var string
	 */
	var $content = "";
	
	/**
	 * The the raw Table of Contents array is stored here
	 *
	 * @var array
	 * @access private
	 */
	var $toc     = array();
	
	/**
	 * The maximum header level to include in the TOC
	 *
	 * @var int
	 */
	var $maxlevel = 1;
	
	/**
	 * The minimum header level to include in the TOC
	 *
	 * @var int
	 */
	var $minlevel = 2;
	
	/**
	 * All headers will be split based off of this delimiter.
	 * If you don't want to split the headers, simply set this variable to false, or empty.
	 *
	 * @var string
	 */
	var $delimiter = ':';
	
	/**
	 * Headers will be trimmed based off of this variable.
	 * If you don't want headers to be trimmed, simply set this variable to false, or empty.
	 *
	 * @var string
	 */
	var $trim = '$ ';
	
	var $html;

	function __construct($content='',$maxlevel=1,$minlevel=2)
	{
		if (empty($content))
			return false;
		
		$this->content  = & $content;
		$this->maxlevel = & $maxlevel;
		$this->minlevel = & $minlevel;
		
		return true;
	}
	
	function __toString()
	{
		return $this->html;
	}
	

	function scan()
	{
		$regex = '#<h(['."$this->maxlevel-$this->minlevel".'])(.*?id=("|\')([\w\:\-_]+)\3.*?)?>(.*?)</h\1>#';
		
		preg_replace_callback($regex, array(&$this, 'add'), $this->content);
	}
	
	
	function add($match)
	{		
		$this->toc[] = array(
						'level'=>(int)$match[1],
						'id'=>$match[4],
						'text'=>$match[5]
						);
	}
	
	function generate()
	{
		if (count($this->toc) < 1) {
			$this->scan();
		}
		
		return $this->output();
	}
	
	
	function output_list()
	{
		$this->html = "";
		
		$toc_total = count($this->toc);
	    for ($i = 0; $i < $toc_total; $i ++) {
			
			$level = & $this->toc[$i]['level'];
			$id    = & $this->toc[$i]['id'];
			$text  = $item['text'];
			
			if (!empty($this->delimiter))
				$text = end(explode($this->delimiter,$text));
			
			if (!empty($this->trim))
				$text = trim($text,$this->trim);

	        $link = "<a href=\"#$id\">$text</a>";
	
	        if ($i == 0) {
	            $level = min($level, $this->minlevel);
	            $stack = array($level);
	            $this->html .= "\t<ol><li>$link";
	        } else {
	            $prev = $stack[count($stack)-1];
	            if ($level == $prev) {
	                $this->html .= "</li>\n\t<li>$link";
	            } elseif ($level < $prev) {
					
	                while (count($stack) > 1) {
	                    array_pop($stack);
	                    $this->html .= "</li></ol>";
	                    $prev = $stack[count($stack)-1];
	                    if ($level >= $prev)
	                        break;
	                }
	                $this->html .= "</li>\n\t<li>$link";
	            } else {
	                $stack[] = $level;
	                $this->html .= "\n\t<ol><li>$link";
	            }
	        }
	    }
	    while (count($stack) > 0) {
	        array_pop($stack);
	        $this->html .= "</li></ol>";
	    }	 
		
		return $this->html;
	}
	
	function output()
	{

		$this->html = "";
		
		foreach ($this->toc as $item) {
			
			$level = & $item['level'];
			$id    = & $item['id'];
			$text  = & $item['text'];
			
			if (!empty($this->delimiter))
				$text = end(explode($this->delimiter,$text));
			
			if (!empty($this->trim))
				$text = trim($text,$this->trim);
			
			 $link = "<a href=\"#$id\">$text</a>";
			
			if ($level == $this->maxlevel) {
				$this->html .= "<h4>$link</h4>\n";
			}else {
				$this->html .= "\t<div class=\"menu-item\">$link</div>\n";
			}
			
		}
		
		return $this->html;
	}	
}


?>