var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
    console.log('请指定端口号可不可以？\nnode server.js 8888 这样是不是舒服点？')
    process.exit(1)
}

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) { queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method

    /******** 从这里开始看，上面不要看 ************/

    console.log('含查询字符串的路径\n' + pathWithQuery)

    if (path === '/') {
        var string = fs.readFileSync('./index.html', 'utf8')
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.statusCode = 200
        response.write(string)
        response.end()
    } else if (path === '/main.js'){
        var string = fs.readFileSync('./main.js', 'utf8')
        response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
        response.statusCode = 200
        response.write(string)
        response.end()
    } else if (path === '/xxx' && method === 'GET'){
        response.statusCode = 200
        response.setHeader('Content-type', 'text/xml;charset=utf-8')
        response.setHeader('Access-Control-Allow-Origin', 'http://frank.com:8001')
        response.write(`
        {
            "note":{
                "to": "James Raynor"
                "from": "Sarah Kerrigan"
                "heading": "Message"
                "body": "For Im the queen of blades.Vengeance shall be mine."
            }
        }
        `)//返回一个字符串，这个字符串，刚好符合JSON对象语法
        // 这不是对象这不是对象这不是对象
        response.end()
    } else {
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write('找不到对应路径，你需要自行修改 index.js')
        response.end()
    }


    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用洗衣机打开 http://localhost:' + port)
