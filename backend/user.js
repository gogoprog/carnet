
function createUser(res, params)
{
    var db = require("./db");

    params['checked'] = true;

    return params;
}

var handlers = {
    "/user/create" : createUser
}

function handle(req, res)
{
    for(var k in handlers)
    {
        if(req.url.indexOf(k) == 0)
        {
            var alldata = '';

            req.on('data', function(data) {
                alldata += data;
            });

            req.on('end', function() {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(
                    JSON.stringify(
                        handlers[k](res, JSON.parse(alldata))
                        )
                    );
            });
        }
    }
}

exports.handle = handle;
