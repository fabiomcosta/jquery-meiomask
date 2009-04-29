<?php

/**
* Document Navigation Menu
* 
* Example:
* 	$menu = new menu( 'docs/', '.md' );
* 	echo $menu->generate();
* 
*/
class Menu
{
	var $dir;
	var $filetype;
	var	$html;
	
	function __construct($dir='docs/',$filetype='.md')
	{
		$this->dir = & $dir;
		$this->filetype = & $filetype;
	}
	
	function __toString()
	{
		return $this->html;
	}
	
	/**
	 * Recursive glob()
	 *
	 * @param int $pattern
	 * the pattern passed to glob()
	 * @param int $flags
	 * the flags passed to glob()
	 * @param string $path 
	 * the path to scan
	 * @return array
	 * an array of files in the given path matching the pattern.
	 */
	function rglob($pattern='*', $flags = 0, $path='')
	{
	    $paths  = glob($path.'*', GLOB_MARK|GLOB_ONLYDIR|GLOB_NOSORT);
	    $files  = glob($path.$pattern, $flags);
		$length = strlen($path);

	    foreach ($paths as $path) { 
			$files[substr($path,$length,-1)] = $this->rglob($pattern, $flags, $path); 
		}

	    return $files;
	}

	/**
	 * Generate the documentation navigation menu
	 *
	 * @return string $html
	 */
	function generate()
	{
		$files = $this->rglob('*'.$this->filetype,0,$this->dir);

		$this->html = "";

		foreach ($files as $group => $files) {

			$this->html .= "<h4>$group</h4>\n";

			foreach ($files as $file) {
				$file        = pathinfo($file);
				$url         = "?file=$group/$file[filename]";
				$this->html .= "\t<div><a href=\"$url\">$file[filename]</a></div>\n";

			}

		}

		return $this->html;
	}

}


?>