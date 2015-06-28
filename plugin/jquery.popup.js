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
			height: 200,
			style: {'backgroundColor': '#fff' }
		};  
			
		//Melting the two objects:
		var obj = $.extend(defaults, options );

		var content = obj.content ; 
		var title   = obj.title ; 
		var width   = obj.width ; 
		var height  = obj.height; 


		//If the popup width is greater than the screen we shrink it to 90%
		if($(window).width() < width){ width =  $(window).width()* .9 ; }

		var popup = $("<div />").css({
				'position':"absolute",
				'zIndex':500, 
				'width':width,
				'height' : height
				}) . hide()
				. appendTo($(document.body)); 


		popup.css(obj.style) ; 

		var calque = $("<div />").css({
				'background': 'url(images/calque.png)',
				'display':'none',
				'left' : '0px',
		    		'padding': '5px', 
				'position':'absolute', 
				'top' : '0px',
				'zIndex':400
				}) .appendTo($(document.body));

		//we build and add some contents in our pop-up
		var titlediv  = $('<span></span>' ); 
		var closebox  = $('<a href="#">X</a>') . css({ 
							'color': '#bbb',
							'position':'absolute',
							'right': '4px',
		    					'textDecoration':'none',
							'top':'3px'
							});

		var titlebar  = $('<div></div>')
				. append(titlediv)
				. append(closebox); 

		var contentdiv = $('<div></div>') ;


		popup.append(titlebar).append(contentdiv)   ; 
		setTitle(title) ; 
		setContent(content) ; 
		var p = modalDialog();

		// Dismiss the popup on window click
		
		calque .on("click", close );
		closebox.on("click",close ) ; 

		
		function setTitle(title){
			titlediv.html(title) ; 
		}

		function setContent(content){
			contentdiv.html(content) ; 
		}

		function close(){
			if(popup){ popup.fadeOut("slow") ; }
			if(calque){ calque.fadeOut("slow") ; } 
		}

		//Displays the background,  the popup and return it 
		function modalDialog(){
			if(calque){
				calque 	. height($(document).height())
					. width($(document).width())
					. show() ;
			}
			popup.fadeIn("fast").centrer() ;
			$(window).resize(function(){
				updateSize(popup,calque) ; 
			});
			return popup;
		}

		// Adjust popup and background size when the user resizes the screen.
		function updateSize(popup, bg ){
			// Update the modal background if any:
			if(bg){
				bg . height($(document).height()) . width($(document).width()) ;
			}

			// update the popup width according to the screen viewport:
			if(popup){
				if($(window).width() < width){ 
					width =  $(window).width()* .9 ; 
				}else{
					width = obj.width ;// original width 
				}
				popup.css('width', width) ; 
				popup.centrer(); // center the popup

			}
		}

	}// modalDialog

})(jQuery);
