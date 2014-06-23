function createUser(res, params)
{
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(params));
}

function handle(req, res)
{
    var db = require("./db");

    if(req.url.indexOf("/user/create") == 0)
    {
        var params = require('url').parse(req.url, true).query;

        createUser(res, params);
    }
    else
    {
        res.end();
    }
}

exports.handle = handle;
