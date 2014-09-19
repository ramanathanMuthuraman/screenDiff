

$(document).ready(function() {

 $('#fileupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
           
        }
    });
    
   
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