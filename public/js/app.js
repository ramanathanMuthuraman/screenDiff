function validateName(el) {
    var name = el.val();
    var retValue = {};

    if (name == "") {
        retValue.status = false;
        retValue.msg = "Please enter a name";
    }
    else {
        retValue.status = true;
    }

    return retValue;
}

$(document).ready(function() {

 
    var appConfig = {
        "height": $(window).height() - 150,
        "width": $(window).width() - 150
    }
    $.fn.wizard.logging = true;
    var wizard = $('#some-wizard').wizard({
        keyboard: false,
        contentHeight: appConfig.height,
        contentWidth: appConfig.width,
        backdrop: false,
        submitUrl: "/extract",
        showClose: false,
        container: "#main" // new config to append content inside the DOM specified
    });

    wizard.show();
    // Check to see when a user has selected a file                                                                                                                

   /* $("#archiveFolder").click(function() {

        var timerId = setInterval(function() {
            if ($('#archiveFolder').val() !== '') {
                clearInterval(timerId);

                //$('#uploadForm').submit();
            }
        }, 500);
    })
*/

   // $('#uploadForm').submit(function() {
       // status('uploading the file ...');
//wizard.trigger("loading");
      /*  $(this).ajaxSubmit({

            error: function(xhr) {
                status('Error: ' + xhr.status);
            },

            success: function(response) {
                $('#status').text("upload completed successfully");
                wizard.trigger("success");
               // $('#uploadForm').resetForm();
                //TODO: We will fill this in later
            }
        });*/

        // Have to stop the form from submitting and causing                                                                                                       
        // a page refresh - don't forget this                                                                                                                      
       // return false;
   // });

    
});