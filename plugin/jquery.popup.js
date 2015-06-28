/**
 * this is derhy.com jquery popup plugin project.
 * Please see: https://github.com/Poumier-Vicky/plugin-jquery-popup/
 */
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
			style: {'backgroundColor': '#fff' },
			modal : true, 
			poz : {'align':'center' },
			popid : 'popup-derhy',
			calcid : 'calque-derhy' 
		};  
			
		//Melting the two objects into one obj :
		var obj = $.extend(defaults, options );

		var content = obj.content ; 
		var title   = obj.title ; 
		var width   = obj.width ; 
		var height  = obj.height; 


		//If the popup width is greater than the screen we shrink it to 90%
		if($(window).width() < width){ width =  $(window).width()* .9 ; }

		// Avoid to open another popup each time:
		if($("#"+ obj.popid).length){
			var popup = $("#" + obj.popid).html("") ;
		}else{
		var popup = $("<div />").css({
				'position':"absolute",
				'zIndex':500, 
				'width':width,
				'height' : height
				}) . hide()
				. css(obj.style)
				. attr('id', obj.popid) 
				. appendTo($(document.body)); 
		}

		if( obj.modal){
			// avoid to re-open the background :
			if($("#"+ obj.calcid ).length ){
				//re-use it if it exists:
				var calque = $("#" + obj.calcid ) ;
			}else{
				var calque = $("<div />").css({
						'backgroundColor':'#333',
						'display':'none',
						'left' : '0px',
						'opacity': 0.5,
						'padding': '5px', 
						'position':'absolute', 
						'top' : '0px',
						'zIndex':400
						}) 
				.attr('id', obj.calcid) 
				.on("click",close)
				.appendTo($(document.body));
			}
		}

		// Adding the content
		var titlediv  = $('<span></span>' ); 
		var closebox  = $('<a href="#">X</a>') . css({ 
							'color': '#bbb',
							'position':'absolute',
							'right': '4px',
		    					'textDecoration':'none',
							'top':'3px'
							})
				. on("click", close )  ; 

		var titlebar  = $('<div></div>')
				. append(titlediv)
				. append(closebox); 

		var contentdiv = $('<div></div>') ;

		popup.append(titlebar).append(contentdiv)   ; 
		setTitle(title) ; 
		setContent(content) ; 
		var p = modalDialog();

		return $(this) ; 

		// --------------------------------------------------
		// below only functions: 
		//---------------------------------------------------
		function setTitle(title){
			titlediv.html(title) ; 
		}

		function setContent(content){
			contentdiv.html(content) ; 
		}

		// Dismiss the popup 
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
