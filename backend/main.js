var
    http = require('http'),
    path = require('path'),
    fs = require('fs'),
    extensions = {
        ".html" : "text/html",
        ".css" : "text/css",
        ".js" : "application/javascript",
        ".png" : "image/png",
        ".gif" : "image/gif",
        ".jpg" : "image/jpeg"
    };
 
function getFile(filePath,res,page404,mimeType)
{
    fs.exists(filePath,function(exists){
        if(exists){
            fs.readFile(filePath,function(err,contents){
                if(!err){
                    res.writeHead(200,{
                        "Content-type" : mimeType,
                        "Content-Length" : contents.length
                    });
                    res.end(contents);
                } else {
                    console.dir(err);
                };
            });
        } else {
            console.log("missing "+ filePath);

            fs.readFile(page404,function(err,contents){
                if(!err){
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    res.end(contents);
                } else {
                    console.dir(err);
                };
            });
        };
    });
};
 
function requestHandler(req, res)
{
    if(req.url.indexOf('/user/') == 0)
    {
        require('./user').handle(req, res);
    }
    else
    {
        var
            fileName = req.url == '/' ? 'index.html' : req.url,
            ext = path.extname(fileName),
            localFolder = path.normalize(__dirname + '/../frontend/'),
            page404 = localFolder + '404.html';
     
        if(!extensions[ext])
        {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end("<html><head></head><body>The requested file type is not supported</body></html>");
        };

        getFile((localFolder + fileName), res, page404,extensions[ext]);
    }
};
 
http.createServer(requestHandler).listen(3000);
