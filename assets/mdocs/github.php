<?php
ob_start();


/**
 * GitHub Service Hook (Post-Receive URL)
 * 
 * This script, once properly configured, will execute a 'git pull'
 * every time someone commits a change to the documentation in a
 * GitHub repository, therefore always keeping your docs up to date.
 * 
 * For this to work, your web server must have Git installed, and
 * you must have a pre-existing Git clone repository for your project.
 */



/**
 * SETTINGS
 */
$config = new stdClass();

/**
 * The directory where the docs are stored in the repository.
 * This is used to verify that the commit actually changed a
 * document file, rather than some other non-doc related file.
 * 
 * If you want the script to run on every commit, set the path
 * to blank (''), otherwise, enter your doc path.
 */
$config->repo_path = '';


/**
* The is the local path on your server where you have the Git 
 * clone of your project (w/docs).
 * 
 * Note:
 * This folder must be a pre-existing Git clone repository.
 * 
 * Due to the limitations of Git, your entire repository will
 * be stored in this directory.  If you don't want this, you
 * may want to create a separate repository just for your docs.
 */
$config->path = './';


/**
 * Update Key
 * 
 * Prevents unauthorized updates. Be sure to include this when 
 * entering the Post-Receive URL in GitHub.
 * 
 * @example http://example.com/github.php?key=myKEYgoesHERE
 */
$config->key = 'CHANGE_ME';


/**
 * Git Pull Shell Command
 * 
 * You may need to set the full path to your Git executable depending
 * on how Git is setup on your server.
 * 
 * Adding " 2>&1" to the end of the command will allow you to see any
 * errors that occurred during the git update in the log file.
 */
$config->command = 'git pull 2>&1';


/**
 * GitHub Error Log
 * 
 * Filename & path where you want to store the GitHub error log.
 * If you don't with to keep a log, simply set the string to ''.
 */
$config->log = 'github.log';






/**
 * Verify that an authorized client is submitting the request...
 */
if (!isset($_REQUEST['key']) || $_REQUEST['key'] != $config->key)
	_die('ERROR: Incorrect Key');

/**
 * Check to see if we have a payload to process...
 */
if (!isset($_REQUEST['payload']))
	_die('ERROR: No payload received');


/**
 * Analyze the JSON data, if possible, use the built in PHP function,
 * if that doesn't exist, fall back to the slower alternate method.
 */
if (!function_exists('json_decode')) {
	require_once 'assets/json.php';
	$json = new Services_JSON();
	$paylaod = $json->decode($_REQUEST['payload']);
}else {
	$paylaod = json_decode($_REQUEST['payload']);
}



/**
 * Verify that we have something to process...
 */
if (!isset($paylaod->commits))
	_die('ERROR: No commits to process');


/**
 * Create a list of files added, removed, or modified from the commit,
 * and store them in as an array in $files.
 */
$files = array();
foreach ($paylaod->commits as $commit) {
	
	if (isset($commit->added))
		$files = array_merge($files,$commit->added);
		
	if (isset($commit->removed))
		$files = array_merge($files,$commit->removed);
		
	if (isset($commit->modified))
		$files = array_merge($files,$commit->modified);
}



$update = false;

if (empty($config->repo_path)){
	
	/**
	 * If the path is empty, we need to do an update, every time.
	 */
	$update = true;
	
}elseif(!empty($config->repo_path)) {
	
	/**
	 * Otherwise, run through the changed files, and see if any files
	 * have been changed in the docs directory of the repository
	 */
	foreach ($files as $file) {
		if (strpos($file,$config->repo_path) !== false) {
			$update = true;
			break;
		}
	}
	
}


/**
 * No updates exist...
 */
if (!$update)
	_die('No updates necessary');



/**
 * It's time to update...
 */

// Move to the path
chdir($config->path);
// Do the pull...
$last_line = system($config->command,$exit_code);


if ($exit_code !== 0 || strpos($last_line,'fatal:') !== false)
	_die("ERROR: Couldn't update local repository");
	


_die('Success!');

function _die($message='')
{
	global $config;
	
	if (empty($config->log))
		die($message);
		
	$log  = "##################################################\n";
	$log .=	date('r')."\n";
	$log .= "$message\n";
	$log .= ob_get_contents()."\n";
	
	file_put_contents($config->log,$log,FILE_APPEND);
	
	die();
}

?>