function createAccount()
{
    var output_data = { user:"testUser", values:[1,4,8]};

    $.post(
        "user/create",
        JSON.stringify(output_data),
        function( data ) {
            console.log(data);
            console.log(data.values);
        }
        );
}