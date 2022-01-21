function ShowImagePreview(imageUploader,previewImage) {
    if (imageUploader.files && imageUploader.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $(previewImage).attr('src', e.target.result);

        }
        reader.readAsDataURL(imageUploader.files[0]);
    }
}

//var mymodel = {};
var person = {};

function jQueryAjaxPost(form) {
    $.validator.unobtrusive.parse(form);
    debugger;
   // person.Name = "kavin";
    if ($(form).valid()) {
        var ajaxConfig = {
            type: 'POST',
            url: form.action,
            data: new FormData(form),
            // data: '{emp: ' + JSON.stringify(person) + '}',
            //data: $("#newform").serialize(),
            success: function (response) {
                if (response.success) {
                    $("#firstTab").html(response.html);
                    refreshAddNewTab($(form).attr('data-resetUrl'), true);
                    $.notify(response.message, "success");
                }
                else {
                    $.notify(response.message, "error");
                }

                

            }

        }
        if ($(form).attr('enctype') == "multipart/form-data") {
            ajaxConfig["contentType"] = false;
            ajaxConfig["processData"] = false;
        }
        $.ajax(ajaxConfig);
    }
    return false;
}




function refreshAddNewTab(resetUrl, showViewTab) {
    debugger;
    $.ajax({
        type: 'Get',
        url: resetUrl,
        success: function (response) {
            $("#secondTab").html(response);
            $('ul.nav.nav-tabs a:eq(1)').html('Add New');

            if (showViewTab)
            $('ul.nav.nav-tabs a:eq(0)').tab('show');
        }
    })
}

function Edit(url) {

    $.ajax({
        type: 'Get',
        url: url,
        success: function (response) {
            $("#secondTab").html(response);
            $('ul.nav.nav-tabs a:eq(1)').html('Edit');
            $('ul.nav.nav-tabs a:eq(1)').tab('show');
        }
    })
}


function Delete(url) {

    debugger;

        $.ajax({
            type: 'POST',
            url: url,
            success: function (response) {
                if (response.success) {
                    $("#secondTab").html(response);
                    $.notify(response.message, "warn");
                }
                else {
                    $.notify(response.message, "error");
                }
            }
        })
    
}




