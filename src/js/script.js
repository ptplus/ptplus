    // // Toolbar (waterfall)
    // var toolbar = mdc.toolbar.MDCToolbar.attachTo(document.querySelector('.mdc-toolbar'));
    // toolbar.fixedAdjustElement = document.querySelector('.mdc-toolbar-fixed-adjust');

    // Form Data (Sheetsu)
    function applicationFILE() {
        return $.ajax({
            url: "https://sheetsu.com/apis/v1.0su/56041bc9dd90",
            type:"GET",
            dataType: 'json',
            success: function() {
              console.log('Application Loaded');
            }
        });
    }

    function configurationFILE() {
        return $.ajax({
            url: "https://sheetsu.com/apis/v1.0su/4533392909a5",
            type:"GET",
            dataType: 'json',
            success: function() {
              console.log('Configuration Loaded');
            }
        });
    }

    function pairsFILE() {
        return $.ajax({
            url: "https://sheetsu.com/apis/v1.0su/1abfbd1a79aa",
            type:"GET",
            dataType: 'json',
            success: function() {
              console.log('Pairs Loaded');
            }
        });
    }

    function dcaFILE() {
        return $.ajax({
            url: "https://sheetsu.com/apis/v1.0su/faf07152c388",
            type:"GET",
            dataType: 'json',
            success: function() {
              console.log('DCA Loaded');
            }
        });
    }

    function indicatorsFILE() {
        return $.ajax({
            url: "https://sheetsu.com/apis/v1.0su/f53e6b048232",
            type:"GET",
            dataType: 'json',
            success: function() {
              console.log('Indicators Loaded');
            }
        });
    }
    
    // When ready...
    $(document).ready(function() {

      // Run these functions first

      // When data is finished loading...
      $.when( applicationFILE(), configurationFILE(), pairsFILE(), dcaFILE(), indicatorsFILE() ).done(function(){
          setTimeout(function(){

              // Run these functions next
              // dataTABS();
              // dataTITLE();
              mdcFORMS();
              dataCLIPBOARD();
              dataCHART();
              // dataACCORDION();
              dataCOUNT();
              dataBIND();
              dataDOWNLOAD();

              $("code pre").hover(function () {
                $(this).toggleClass("font-big");
                $(this).prev("code pre").toggleClass("font-medium");
                $(this).next("code pre").toggleClass("font-medium");
              });
              // Initialize UI last
              mdc.autoInit();

            /* Create Binding
            *************************************************************************/
            $('[data-mdc-auto-init] *').each(function (){
                $(this).on('input', function() {
                    dataCOUNT();
                });
            });

          }, 2000);

      });

  });


//   $( "input, textarea" ).change(function() {
//       dataCOUNT();
//   });