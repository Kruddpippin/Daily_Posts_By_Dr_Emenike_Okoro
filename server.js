//CORE MODULES
const readline = require('readline');
const fs = require('fs'); //this module enables us read files i.e 'file system'
const http = require('http'); //http module
const url = require('url'); //This url is to control query strings for the page
//User modules
const replaceHtml = require('./Modules/replaceHtml')


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
let postDetailsHtml = fs.readFileSync('./post-details.html', 'utf-8');

//This postDetailsHtml is the variable that contains the mapping for the contents of the posts-details.json objects


// function replaceHtml(template, post){
//     let output = template.replace('{Post_title_Placeholder}', post.title); //shows the title of the post
//         output = output.replace('{Image}', post.dailyImage); //shows the image
//         output = output.replace('{ID}', post.id); //shows the id
//         //output = output.replace('{Post_Placeholder}', post.title); //post title displayed
//         output = output.replace('{dailyPost}', post.dailyPost); //shows the daily Post

//         return output;
// };
// Create a server
// Step 1: Create 

//This handles everything that has to do with URL 
const server = http.createServer((request, response) => {
    //adding query names for resources
    let {query, pathname: path} = url.parse(request.url, true)
    // console.log(x);
    // let path = request.url;

    
    
    //  Routing for nav bar
    if (path === '/' || path.toLocaleLowerCase() === '/home') {
        response.writeHead(200, {
            'content-type': 'text/html',
            'krudd-header': 'Nice one Chief'
        });
        response.end(html.replace('{Placeholder}', 'You are in Home Page'));} 
    
    else if (path.toLocaleLowerCase() === '/posts') {
        
        if(!query.id){ //this checks for a query string before executing the next line.
            let postsHtmlArray = posts.map((thePost) => {
              return replaceHtml(postCatalogueHtml, thePost); 
            })
            let postsResponseHtml = html.replace('{Placeholder}', postsHtmlArray.join('  '));
        response.writeHead(200, {'content-type': 'text/html'});
        response.end(postsResponseHtml);}

        else{
            let thePost = posts[query.id]
            let postDetailsResponseHtml = replaceHtml(postDetailsHtml, thePost)
            response.end(html.replace('{Placeholder}', postDetailsResponseHtml))};
    }
    

    else if (path === '/The_Man') {
        response.writeHead(200, {
            'content-type': 'text/html',
            'krudd-header': 'Nice one Chief'
        });
        response.end(html.replace('{Placeholder}', 'You are in Profiles Page'))}

    
    else if (path.toLocaleLowerCase() === '/contact') {
        response.writeHead(200, {
            'content-type': 'text/html',
            'krudd-header': 'Nice one Chief'});

        response.end(html.replace('{Placeholder}', 'You are in Contact Page'))}

    else {
        response.writeHead(404, {
            'content-type': 'text/html',
            'krudd-header': 'Nice one Chief'});

        response.end('Error 404: Not Found');}
});


//Step 2: Start the server
server.listen(5000, '127.0.0.1', () => {
    console.log('The server is up and running!');
})

