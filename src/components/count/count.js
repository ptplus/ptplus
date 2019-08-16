/* Data Count
*********************************/
function dataCHART() {
  $('[data-count--chart]').each(function (){

      var dataCHART   =    $(this).data("count--chart");
      var barCHART    =    `<div class="graph">
                                  <i class="meter"></i>
                            </div>`;

      $(this).find(dataCHART).html(barCHART);

  });
}

function dataCOUNT() {

  $('[data-count]').each(function (){

      // Data Attributes
      var dataCOUNT               =   $(this).data("count");
      var dataTOTAL               =   $(this).data("count--total");
      var dataCHECKED             =   $(this).data("count--checked");
      var dataPERCENT             =   $(this).data("count--percent");
      
      // Input Types
      var textfields              =   $(".mdc-text-field__input");
      var selects                 =   $(".mdc-select__native-control");
      var switches 		            =   $(".mdc-switch__native-control");
      var sliders                 =   $(".mdc-slider");

      // Count Inputs
      var textfieldsTOTAL         =   $(this).find(textfields).not(":disabled").length;
      var selectsTOTAL            =   $(this).find(selects).not(":disabled").length;
      var switchesTOTAL           =   $(this).find(switches).not(":disabled").length;
      var slidersTOTAL            =   $(this).find(sliders).not(".mdc-slider--disabled").length;
          
      // Count Inputs CHECKED
      var textfieldsCHECKED	  	  =   $(this).find(textfields).filter(function() {return !!this.value;}).length;
      var selectsCHECKED	  	    =   $(this).find(selects).filter(function() {return !!this.value;}).length;
      var slidersCHECKED	  	    =   $(this).find(sliders).not(".mdc-slider--disabled").length;
      var switchesCHECKED	  	    =   $(this).find(switches).not(":disabled").length;

      // Total Inputs
      var total    = textfieldsTOTAL + selectsTOTAL + slidersTOTAL + switchesTOTAL;
      var checked  = textfieldsCHECKED + selectsCHECKED + slidersCHECKED + switchesCHECKED;
      var percent  = ((checked/total) * 100).toFixed(0);

     
      // Target Element
      $(this).find(dataTOTAL).text(total);
      $(this).find(dataCHECKED).text(checked);
      $(this).find(dataPERCENT).text(percent);

      $(this).find('.meter').css({
          "transform": "translateX(" +percent+ "%)"
      });


  });

}

function countEVENT() {
  $( ".form-container" ).on('keyup, mouseup', function() {
    dataCOUNT();
  });
}