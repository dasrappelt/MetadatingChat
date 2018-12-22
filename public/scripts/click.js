$(document).ready(function() {

    $(".clickable").on("click", function() {
        $('.clicked').removeClass('clicked'); 
        $(this).addClass('clicked');
    });

    $(".clickable").on("click", function(){
        
        var updateName = {};
        updateName.value = $(this).find(".show_name").text();

        var updateDescription = {};
        updateDescription.value = $(this).find(".show_description").text();

        var updateWorkspaceID = {};
        updateWorkspaceID.value = $(this).find(".show_workspace_id").text();

        var updateIamApikey = {};
        updateIamApikey.value = $(this).find(".show_iam_apikey").text();

        var showDocumentID = {};
        //showDocumentID.value = $(this).find(".show_document_id").text();
        showDocumentID.value = $.trim($(this).find(".show_document_id").text());
        
        $('.updateName').attr(updateName);
        $('.updateDescription').attr(updateDescription);
        $('.updateWorkspaceID').attr(updateWorkspaceID);
        $('.updateIamApikey').attr(updateIamApikey);
        $('.showDocumentID').attr(showDocumentID);

        $('.confirmTick').attr(showDocumentID);

        $('form.imgupload').removeClass("hidden");

        //$('.showDocumentID').empty();
        //$('.showDocumentID').append(showDocumentID);

    });

});

