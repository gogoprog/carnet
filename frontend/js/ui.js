
function generateUi()
{
    $.extend($.ui.dialog.prototype.options, { 
        create: function() {
            var $this = $(this);

            // focus first button and bind enter to it
            $this.parent().find('.ui-dialog-buttonpane button:first').focus();
            $this.keypress(function(e) {
                if( e.keyCode == $.ui.keyCode.ENTER ) {
                    $this.parent().find('.ui-dialog-buttonpane button:first').click();
                    return false;
                }
            });
        } 
    });

    $("#createTest")
        .button()
        .click(function( event )
        {
            var dialog = $("#dialogForm");

            dialog.dialog(
                "option",
                "buttons", [ { text: "Ok", click: function() {
                    var test = createTest();

                    var value = $('#dialogValue')[0].value;

                    if(value != "")
                    {
                        test.name = value;
                    }

                    dialog.dialog("close");

                    generateTable();
            } } ] );

            dialog.dialog("option", "title", "Enter test title");

            dialog.dialog("open");

        });

    $("#createAccount")
        .button()
        .click(function( event )
        {
            var dialog = $("#signupForm");

            dialog.dialog(
                "option",
                "buttons", [ { text: "Ok", click: function() {
                    var test = createTest();

                    var email_value = $('#signupMail')[0].value;
                    var pwd_value = $('#signupPassword')[0].value;

                    createAccount(email_value, pwd_value);

                    dialog.dialog("close");

                    generateTable();
            } } ] );

            dialog.dialog("option", "title", "Sign-up");

            dialog.dialog("open");
        });

    $("#dialogForm").dialog({
        autoOpen: false,
        modal: true
    });

    $("#signupForm").dialog({
        autoOpen: false,
        modal: true
    });
}