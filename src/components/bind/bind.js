/* Create Binding
*************************************************************************/
function dataBIND() {
    
    $('[data-bind]').each(function (){

        var mdcTEXTFIELD  =   $(this).hasClass("mdc-text-field__input");
        var mdcTEXTAREA   =   $(this).hasClass("mdc-text-field__input");
        var mdcSELECT     =   $(this).hasClass("mdc-select__native-control");
        var mdcSLIDER     =   $(this).hasClass("mdc-slider");
        var mdcSWITCH     =   $(this).hasClass("mdc-switch__native-control");
        var mdcRADIO      =   $(this).hasClass("mdc-radio__native-control");
        var mdcCHECKBOX   =   $(this).hasClass("mdc-checkbox__native-control");

        var dataBIND      =   $(this).data("bind");
        var dataUPDATE    =   $(this).data("update");
        var dataARIA      =   $(this).attr("aria-valuenow");

        /* Text Fields
        **************************/
        if (mdcTEXTFIELD) {
            $("[data-update='" +dataBIND+ "']").html($(this).val());
        }

        /* Select
        **************************/
        if (mdcSELECT) {
            $("[data-update='" +dataBIND+ "']").html($(this).val());
        }

        /* Sliders
        **************************/
        if (mdcSLIDER) {
            $("span[data-update='" +dataBIND+ "']").html(dataARIA);
        }

        /* Switches
        **************************/
        if (mdcSWITCH) {
            if ($(this).is(':checked')) {
                $(this).val("true");
            } 
            else {
                $(this).val("false");
            }
            $("[data-update='" +dataBIND+ "']").html($(this).val());
        }

        $(this).on('change keyup keydown mousemove mouseup', function() {

            var mdcTEXTFIELD  =   $(this).hasClass("mdc-text-field__input");
            var mdcTEXTAREA   =   $(this).hasClass("mdc-text-field__input");
            var mdcSELECT     =   $(this).hasClass("mdc-select__native-control");
            var mdcSLIDER     =   $(this).hasClass("mdc-slider");
            var mdcSWITCH     =   $(this).hasClass("mdc-switch__native-control");
            var mdcRADIO      =   $(this).hasClass("mdc-radio__native-control");
            var mdcCHECKBOX   =   $(this).hasClass("mdc-checkbox__native-control");
    
            var dataBIND      =   $(this).data("bind");
            var dataUPDATE    =   $(this).data("update");
            var dataARIA      =   $(this).attr("aria-valuenow");

            /* Text Fields
            **************************/
            if (mdcTEXTFIELD) {
                $("[data-update='" +dataBIND+ "']").html($(this).val());
            }

            /* Select
            **************************/
            if (mdcSELECT) {
                $("[data-update='" +dataBIND+ "']").html($(this).val());
            }

            /* Sliders
            **************************/
            if (mdcSLIDER) {
                $("span[data-update='" +dataBIND+ "']").html(dataARIA);
            }

            /* Switches
            **************************/
            if (mdcSWITCH) {
                if ($(this).is(':checked')) {
                    $(this).val("true");
                } 
                else {
                    $(this).val("false");
                }
                $("[data-update='" +dataBIND+ "']").html($(this).val());
            }
        });

    });
}

dataBIND();