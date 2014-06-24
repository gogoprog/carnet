
function writeResponse(res, params)
{
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(
        JSON.stringify(
            params
            )
        );
}

function createUser(res, params)
{
    var db = require("./db");

    console.log(params);

    db.users.find({email:params.email}, function(err, users) {
        if(err)
        {
            writeResponse(res, { error: err });
            return;
        }

        if(!users.length)
        {
            db.users.save(params);

            writeResponse(res, { success: true });
        }
        else
        {
            writeResponse(res, { already_exists: true });
        }

    });
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
                handlers[k](res, JSON.parse(alldata))
            });
        }
    }
}

exports.handle = handle;
