<!DOCTYPE html>
<html>
<head>
	<title>Test plugin popup</title>
	<script src="http://code.jquery.com/jquery-2.1.3.min.js"></script></head>
	<link rel="stylesheet" type="text/css" href="popup.css">
<body>
	<h1>Test exemple 1 du plugin Popup</h1>
	<p id="test">Click on me</p>

	<script>
	(function($){
	        $(document).ready(function(){
	        	//we put some contents in the pop-up
				var title = "Plugin jQuery";
				var content="This is a plugin test";
				
				// 1 - The first way is to call the plugin on an id. 
				//It can be on any tag you want : a button, a link, a div ... whatever
				//$("#test").modalDialog(contenu, title, 0, 0);


				// 2 - otherwise, start it on an id's click
				$("#test").on("click", function(){
					//we call the jQuery plugin pop-pup
					//									width, height
					$(this).modalDialog(content, title,  500,    0);
				})
				
	        });

	})(jQuery) ;
	</script>
	<!-- we include the popup script -->
	<script src="popup.js" ></script>
</body>
</html>