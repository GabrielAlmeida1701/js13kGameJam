const   fs          = require('fs'),
        path        = require('path'),
        join        = path.join,
        distFolder  = join(__dirname, 'build/'),
        assetsExclude = [
            'links.txt',
            '*.ceol'
        ];

var day = new Date()
var start = day.getMilliseconds()

let assets = join(distFolder, 'assets')
let files = fs.readdirSync(assets)
files.forEach(file => {
    let path = join(assets, file)
    fs.unlinkSync(path)
})

let assetsFolder = join(__dirname, 'src/assets')
files = fs.readdirSync(assetsFolder)
files.forEach(file => {
    let type = file.substring(file.indexOf('.'))
    let exclude =   assetsExclude.find(x => x == file) !== undefined ||
                    assetsExclude.find(x => x == '*' + type) !== undefined

    if(!exclude) fs.copyFileSync( join(assetsFolder, file), join(assets, file) )
})

var hour = ("0"+day.getHours()).slice(-2) + ":" + ("0"+day.getMinutes()).slice(-2) + ":" + ("0"+day.getSeconds()).slice(-2)
var elapsed = new Date().getMilliseconds() - start
const   gray = '\u001b[1;30m',
        blue = '\u001b[1;36m',
        pink = '\u001b[1;35m',
        end = '\u001b[0m'

console.log(`[${gray}${hour}${end}] Finished '${blue}assets${end}' after ${pink}${elapsed} ms${end}`)