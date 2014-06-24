function createAccount(email, pwd)
{
    var output_data = {
        email:email,
        password:$.md5(pwd)
    };

    $.post(
        "user/create",
        JSON.stringify(output_data),
        function( data ) {
            console.log(data);
        }
        );
}