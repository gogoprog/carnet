function createAccount()
{
    var output_data = { user:"testUser", values:[1,4,8]};

    $.getJSON(
        "user/create",
        output_data,
        function( data ) {
            console.log(data);
            console.log(data.values);

        });

}