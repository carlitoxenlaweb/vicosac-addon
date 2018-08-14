(function() {

  if (window.hasRun) {
    return;
  }
	
	window.hasRun = true;

	function clipboard(request, sender, sendResponse) {
	  content.document.getElementById("dni").value = request.dni;
	}

	browser.runtime.onMessage.addListener(clipboard);

})();