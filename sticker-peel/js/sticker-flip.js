/*! Sticker Flip */

(function($) {
	$.fn.stickerFlip = function(D) {
		var $self = this;
		var params = {
			"stickiness":{ "level":"normal"},
		};
		params = $.extend(params, D);
		
		var DATA_KEY = 'flip';
		$self.data(DATA_KEY, params);
				
		
		function get(key) {
			return $self.data(DATA_KEY)[key];
		}
		
		function set(key, value) {
			var D = $self.data(DATA_KEY);
			D[key] = value;
			$self.data(DATA_KEY, D);
		}
		
		// write plugin here
		
		var data = $self.data();

		switch(data.flip.stickiness.level){
			case("normal"):
				var k = 10, L=($self.height()/3), bP1 = L+k, U = (2*L)-(6*k);				
				$self.data({ "stickiness":{"level":k, "lowerLimit":L, "breakpoint1":bP1, "upperLimit": U} });
			break;
			
			default:
				var k = 3, L=80, bP1 = 150, U = 170;				
				$self.data({ "stickiness":{"level":k, "lowerLimit":L, "breakpoint1":bP1, "upperLimit": U} });
				
			break;
					
		}
		
		$self.data({"mouse":{
							"x":0,
							"y":0,
							"delta":{
									"x":0,
									"y":0
									}
							}
					});
					
		$self.wrap('<div class="sticker-wrapper" />');
					
		$self.wrap('<div class="sticker-flip" />');
		
		var copy = $self.clone().addClass("copy");
		
		var $flip = $(".sticker-flip");
		
		$self.addClass("sticker-flip-item");
		

		
			$flip

			.width($self.width())
			.height($self.height())
			.append(copy)
			
			.bind({
				mouseenter:
					function(){
						//$flip.removeClass("timeout");
					},
				mouseleave:
					function(){
						$flip.removeClass("timeout").removeClass("timeout-x");
						$(copy).dequeue();
					},
				mousemove:
					function(e){
					
					
						x0 = data.mouse.x;
						y0 = data.mouse.y;
        				data.mouse.x = e.pageX - this.offsetLeft;
        				data.mouse.y = e.pageY - this.offsetTop;
        				data.mouse.delta.x = x0-data.mouse.x ;
        				data.mouse.delta.y = y0-data.mouse.y ;
        				
        				distance_x = $self.width() - data.mouse.x;
        				distance_y = $self.height() - data.mouse.y
        				
						
						if(!$flip.hasClass("timeout")){
							if (data.mouse.y < data.stickiness.lowerLimit ) { //80
								$(copy).css({"top": -distance_y });
								$self.css({ "top": Math.round(-data.mouse.y) });
								$flip.css({ "top": Math.round(data.mouse.y/2.5), "height":$self.height() - Math.round(data.mouse.y/2) });
								$(".sticker-wrapper").css({ "top": Math.round(data.mouse.y/2) });
								
								}
								//Then check the lower limit to the first breakpoint.
							else if ( data.mouse.y >= data.stickiness.lowerLimit && data.mouse.y < data.stickiness.breakpoint1) { //80 150

								$(".sticker-wrapper").animate({"top": 0},500);
								$self.animate({"top": 0},500);
								$flip.addClass("timeout").animate({ "top":0, "height":$self.height()},500);
								
								$(copy).animate({"top": -300 },500);
								
							}
							
							else if (data.mouse.y >= data.stickiness.breakpoint1 && data.mouse.y <= data.stickiness.upperLimit) {  //150 170
								$flip.addClass("timeout").animate({"height":$self.height()},500);
								
								$(copy).animate({"top": 300 },500);

							}
													
							else if (data.mouse.y > data.stickiness.upperLimit) { //170
								$(copy).css({"top": 300-distance_y });
								$flip.css({ "height":$self.height() - (distance_y/2) });
							}

        				}
        				// else {
							// if (data.mouse.x < 80 ) { //80
								// $(copy).css({"left": -distance_x });
								// $self.css({ "left": Math.round(-data.mouse.x) });
								// $flip.css({ "left": Math.round(data.mouse.x/2.5), "width":$self.width() - Math.round(data.mouse.x/2) });
								// $(".sticker-wrapper").css({ "left": Math.round(data.mouse.x/2) });
								
								// }
							// else if ( data.mouse.x >= 80 && data.mouse.x < 150) { //80 150

								// $(".sticker-wrapper").animate({"left": 0},500);
								// $self.animate({"left": 0},500);
								// $flip.addClass("timeout-x").animate({ "left":0, "width":$self.width()},500);
								
								// $(copy).animate({"left": -300 },500);
								
							// }
							
							// else if (data.mouse.x >= 150 && data.mouse.x <= 170) {  //150 170
								// $flip.addClass("timeout-x").animate({"width":$self.width()},500);
								
								// $(copy).animate({"left": 300 },500);

							// }
													
							// else if (data.mouse.x > 170) { //170
								// $(copy).css({"left": 300-distance_x });
								// $flip.css({ "width":$self.width() - (distance_x/2) });
							// }

        				// }
        				
						
        				
        				
        				$('#coords').html("X: " + data.mouse.x  + " Y: " + data.mouse.y );
        				$('#delta').html("X: " + data.mouse.delta.x  + " Y: " + data.mouse.delta.y );
        				$('#distance').html("X: " + distance_x  + " Y: " + distance_y );
        			} 
    		}); //end bind
		
		return $self;
	}
})(jQuery);

$(document).ready(function(){
$('.circle').stickerFlip();
});