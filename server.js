const fs = require('fs');
const http = require('http');


// /*Read files using node js */







// /*Reading and writing to a file*/

// /*Reading a file*/
// let textIn = fs.readFileSync('./Files/input.txt', 'utf-8');
// console.log(textIn)

// /*Writing to a file*/
// let content = `Data read from input.txt: ${textIn} \nDate created ${new Date()}`
// fs.writeFileSync('./Files/output.txt', content);







// const rl=readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })

// rl.question('Are you ready?: ', (answer) => {
//     console.log('You answered: ' +answer);
//     rl.close();
// })

// rl.on('close', () => {
//     console.log('Interface closed');
//     process.exit(0);
// })


const html = fs.readFileSync('./index.html', 'utf-8')
let posts = JSON.parse(fs.readFileSync('./posts.json', 'utf-8'));
let postCatalogueHtml = fs.readFileSync('./post-catalogue.html', 'utf-8');

let postsHtmlArray = posts.map((thePost) =>{
    let output = postCatalogueHtml.replace('{Post_Placeholder}', thePost.dailyPost);
        output = output.replace('{Image_Placeholder}', thePost.dailyImage);

        return output;
} )

// Create a server
// Step 1: Create

const server = http.createServer((request, response) => {
    let path = request.url;

    if (path === '/' || path.toLocaleLowerCase() === '/home') {
        response.writeHead(200, {
            'content-type': 'text/html',
            'krudd-header': 'Nice one Chief'
        });
        response.end(html.replace('{Placeholder}', 'You are in Home Page'));

    } 
    
    else if (path.toLocaleLowerCase() === '/posts') {
        let postsResponseHtml = html.replace('{Placeholder}', postsHtmlArray.join(','));
        response.writeHead(200, {'content-type': 'text/html'});
        response.end(postsResponseHtml);
    } 
    

    else if (path === '/The_Man') {
        response.writeHead(200, {
            'content-type': 'text/html',
            'krudd-header': 'Nice one Chief'
        });
        response.end(html.replace('{Placeholder}', 'You are in Profiles Page'))
    } 
    
    else if (path.toLocaleLowerCase() === '/contact') {
        response.writeHead(200, {
            'content-type': 'text/html',
            'krudd-header': 'Nice one Chief'
        });
        response.end(html.replace('{Placeholder}', 'You are in Contact Page'))
    }

    else {
        response.writeHead(404, {
            'content-type': 'text/html',
            'krudd-header': 'Nice one Chief'
        });
        response.end('Error 404: Not Found');
    }
});


//Step 2: Start the server
server.listen(5000, '127.0.0.1', () => {
    console.log('The server is up and running!');
})

