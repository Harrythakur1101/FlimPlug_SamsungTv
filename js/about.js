

var init = function () {
	
	
		  
	document.onkeydown = checkKey;
	function checkKey(e) {
		e = e || window.event;

		if (e.keyCode == '38') {
			// up arrow
		
			
		} else if (e.keyCode == '40') {
			// down arrow
			
			
			
		} else if (e.keyCode == '37') {
			// left key arrow
			
			
			
		} else if (e.keyCode == '39') {
			// right arrow
			
			
		} else if(e.keyCode == '13') {
			
			
			
		} else if(e.keyCode == '10009') {
			
			window.history.back();
			
		}
		else if(e.keyCode == '461') {
			
			window.history.back();
			
		}
		else if(e.keyCode == '8') {
			
			window.history.back();
			
		}
		else {
			
		}
		
	}//End checkKey
	
	

	
	
/*document.addEventListener("keydown", function(ev) {
 switch (ev.keyCode) {
 case 37:
	 // Handle mandatory key
	 break;
	 case 38:
	 // Handle mandatory key
	 break;
	 case 39:
	 // Handle mandatory key
	 break;
	 case 40:
	 // Handle mandatory key
	 break;
	 case 13:
	 // Handle mandatory key Confirm / Select / OK
	 break;
	 case 461:
		 window.history.back();
		break;
	 case 10009:
		 window.history.back();
		 break;
 case VK_BACK_SPACE:
		window.history.back();
 break;
 }
 // Block the browser from handling the keydown event.
 ev.preventDefault();
}, false);*/
	
	
};
//window.onload can work without <body onload="">
window.onload = init;




