const fs = require('fs');
const http = require('http');
const _ = require('lodash');
function getUrl(page,newPage){
    // this function return the correct url the user want.
    if(newPage == '/' || newPage =='/index'){
        page+=('/index.html');
    }
    else if(newPage == '/about-us'){
        page+=('/about.html');
    }
    else{
        page+='/404.html';
    }
    return page;
}
const server = http.createServer((req, res) =>{
    // console.log("am just requesting",req.url);
    
    // lodash here
    var num = _.random(1,5);
    console.log(num);
    // returning html pages
    res.setHeader('content-type' , 'text/html');
    var path = getUrl('./views' , req.url)
    if(path == './views/404.html'){
        res.statusCode = 404;
    }
    else{
        res.statusCode = 200;
    }
    fs.readFile(path , (err , data) =>{
        if(err){
            console.log(err);
            res.end();
        }
        else{
            res.end(data);
        }
    });
})

server.listen(3000 , 'localhost' , () =>{
    console.log("we are in port 3000");
});