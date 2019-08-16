
/* Hover FX
*************************************************************************/
function hoverFX() {

  $("[data-focus]").hover(function () {
    $(this).toggleClass("font-big");
    $(this).prev("[data-focus]").toggleClass("font-med");
    $(this).next("[data-focus]").toggleClass("font-med");
  });

}

hoverFX();

/* Focus FX
*************************************************************************/
function focusFX() {
    
	$('[data-bind]').each(function (){
		var dataFOCUS  = $(this).data("bind");
		
		$(this).on('focus', function() {
			$("[data-focus='" +dataFOCUS+ "']").addClass('font-focus');
		});
		
		$(this).on('blur', function() {
			$("[data-focus='" +dataFOCUS+ "']").removeClass('font-focus');
    });
    
		$('.code').on('mouseover', function() {
			$("[data-focus='" +dataFOCUS+ "']").removeClass('font-focus');
    });
	});
}

focusFX();