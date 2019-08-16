

    function mdcSNACKBAR() {
		 
        var MDCSnackbar  = mdc.snackbar.MDCSnackbar;
        var MDCTextField = mdc.textField.MDCTextField;
        var snackbar     = new MDCSnackbar(document.getElementById('mdc-js-snackbar'));
        var messageInput = document.getElementById('message');
        var actionInput  = document.getElementById('action');
        // var messageInput = $("#copyFile").data("snackbar--message");
        // var messageInput = $("#copyFile").data("snackbar--message");
		 
        var show = function(sb) {
          var data =  {
            message: messageInput.value,
            timeout: 2750
          };
          if (actionInput.value) {
            data.actionText = actionInput.value;
            data.actionHandler = function() {
              console.log(data);
            }
          }
          sb.show(data);
        };

        document.getElementById('show-snackbar').addEventListener('click', function() {
          show(snackbar);
        });
		 
		 
        // [].forEach.call(document.querySelectorAll('.mdc-text-field'), function(tf) {
        //   MDCTextField.attachTo(tf);
        // });
		 
		 
    }