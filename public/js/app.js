$(document).ready(function() {
 
    status('Choose a file :)');
    var appConfig = {
        "height":$(window).height()-150,
        "width":$(window).width()-150
    }
   $.fn.wizard.logging = true;
				var wizard = $('#some-wizard').wizard({
					keyboard : false,
                    contentHeight : appConfig.height,
                    contentWidth : appConfig.width,
				    backdrop: false,
                    showClose: false,
                    container:"#main" // new config to append content inside the DOM specified
				});
    
    wizard.show();
    // Check to see when a user has selected a file                                                                                                                
    
    $("#archiveFolder").click(function(){
     
        var timerId = setInterval(function() {
	if($('#archiveFolder').val() !== '') {
            clearInterval(timerId);
 
            $('#uploadForm').submit();
        }
    }, 500);
    })
    
 
    $('#uploadForm').submit(function() {
        status('uploading the file ...');
 
        $(this).ajaxSubmit({                                                                                                                 
 
            error: function(xhr) {
		status('Error: ' + xhr.status);
            },
 
            success: function(response) {
                $('#status').text("upload completed successfully");
                   $('#uploadForm').resetForm();
		//TODO: We will fill this in later
            }
	});
 
	// Have to stop the form from submitting and causing                                                                                                       
	// a page refresh - don't forget this                                                                                                                      
	return false;
    });
 
    function status(message) {
	$('#status').text(message);
    }
});