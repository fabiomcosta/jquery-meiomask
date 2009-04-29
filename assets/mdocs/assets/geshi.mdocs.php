<?php

/**
* GeSHi + mDocs Modifications
* 
* This class adds new features to GeSHi, such as:
* 
* 		- A $default_language Variable
* 		- And a parse_codeblocks() function, which will scan html code 
* 		  and highlight any source code inside a <pre><code> wrapper.
*/
class GeSHi_mDocs extends GeSHi
{
	/**
	 * The default language to use, if one isn't 
	 * specified manually in the code block.
	 *
	 * @var string
	 */
	var $default_language = 'javascript';
	
	function __construct($source = '', $language = '', $path = '')
	{
		if (empty($language))
			$language = $this->default_language;
		else
			$this->default_language = $language;
		
		$this->GeSHi($source,$language,$path);

		$this->enable_classes();
		$this->set_overall_style('');
		$this->enable_keyword_links(false);
	}
	
	
	function parse_codeblocks($input)
	{
		$regex = '/<pre( (class|id)="([\w\-\_]+)")?><code>(.*)<\/code><\/pre>/sU';
		
		$input = & html_entity_decode($input);
		
		$input = preg_replace_callback($regex, array(&$this, '_parse_codeblocks_match'), $input);

		return $input;

	}
	
	private function _parse_codeblocks_match($match)
	{	
		$source   = trim($match[4]);
		$language = ($match[2]=='class' && !empty($match[3]))? $match[3] : $this->default_language;

		$this->set_source($source);
		$this->set_language($language);

		return $this->parse_code();
	}
}


?>