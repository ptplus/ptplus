/* Dialog Box
*********************************/
function dialogBOX() {
	var dialogScrollable  	= 	document.querySelectorAll('.mdc-dialog-scroll');

	dialogScrollable.forEach((el, i) => {
		var dialog 		  =	  new mdc.dialog.MDCDialog(el);
		var container 	=	  $(el).closest('.dialog-container');
		
		container.find('> .mdc-link-wrapper a').on('click', function (evt) {
			dialog.lastFocusedTarget = evt.target;
		 	dialog.show();
		});
		
	});
}