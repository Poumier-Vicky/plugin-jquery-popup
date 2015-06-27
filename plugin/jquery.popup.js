(function($){
	//let's make a minimal plugin to center the popup:
	$.fn.centrer = function(){
		return this.css('top', $(window).height()/2- this.height()/2).css('left', $(window).width()/2- this.width()/2);
	}

	$.fn.modalDialog = function(options){
		var defaults= {
			content: "", 
			title: "",
			width: 200, 
			height: 200 
		};  
			
		//Melting the two objects:
		var obj = $.extend(defaults, options );
		var content = obj.content ; 
		var title   = obj.title ; 
		var width   = obj.width ; 
		var height  = obj.height; 



		//we calculate the size of the screen for the pop-up is responsive
		if($(window).width() < width){
			width = width - ($(window).width()/2);
			height = $(window).height()/2;
		}

		var div = $("<div />").css({position:"absolute",zIndex:500, width:width, height: height}). hide().appendTo($(document.body)),
			calque = $("<div />").css({background: 'url(images/calque.png)',position:'absolute', left: 0,top: 0,zIndex:400,display:'none'})
			.appendTo($(document.body));
			//an id is assigned to our pop-up
			div.attr("id", "myModal");


		//we build and add some contents in our pop-up
		var popup = '<a href="#" class="close"><img src="images/cross_2.gif" class="cross_close" title="Close Window" alt="Close" /></a>';
		popup += "<div class='content'><br/>";
		popup +="<h3>"+title+"</h3>";
		popup +=  "<p>"+content+"</p>";
		popup += "</div>"; //div content
		popup += "</div"; //div myModal

		modalDialog(content, title);

		var widthStart = width;

		//the function displays the pop-up
		function modalDialog(content, title){
			calque.height($(document).height()). width($(document).width()). show() ;
			var p = div.html(popup).fadeIn("slow").centrer() ;
			$(window).resize(function(){if(p){p.centrer(p);}});
			return p;
		}

		//this function resize the pop-up and the calque
		$(window).resize(function(){
	        width = $(window).width();
			height = $(window).height();
			calque.height(height). width(width). show() ;
			//we calculate the size of the screen for the pop-up is responsive
			if($(window).width() <= width){
				width = width - ($(window).width()/2);
				height = $(window).height()/2;
				$("#myModal").css({width:width, height: height});
			}
			else{
				width = widthStart ;
				height = $(window).height()/2;
				console.log(width, height)
				$("#myModal").css({width:width, height: height});
			}

	    });


		//it allows click on the element body and the cross
		$("body").on("click", 'div', function(){
			div.fadeOut("slow");//hide();
			calque.fadeOut("slow");//hide();
		});
	}// modalDialog




})(jQuery);
