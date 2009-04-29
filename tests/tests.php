
<?php $version = isset($_GET['version'])? $_GET['version']: '1.2.6'; ?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
	<head>
		<title>MeioMask jQuery Specs</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
		
		<link rel="stylesheet" type="text/css" media="screen" href="../assets/js-spec/Specs.css" />
		<script type="text/javascript" src="../assets/js-spec/JSSpec.js"></script>
		<script type="text/javascript" src="../assets/js-spec/DiffMatchPatch.js"></script>
		<script type="text/javascript" src="../assets/js-spec/Builder.js"></script>

		<script type="text/javascript" src="../assets/jquery/jquery-<?php echo $version; ?>.js"></script>
		<?php if ($version=='1.2.6'): ?>
			<script type="text/javascript" src="../assets/jquery/jquery.metadata.js"></script>
		<?php endif; ?>
		
		<script type="text/javascript" charset="utf-8">
			Builder.build('../', {
				source: ['jquery.meio.mask'],
				tests: {
					'meio': ['jquery.meio.mask']
				}
			});
		</script>
	</head>
	<body>
	</body>
</html>