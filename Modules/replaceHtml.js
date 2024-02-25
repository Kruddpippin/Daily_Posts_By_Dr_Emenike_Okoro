module.exports = function replaceHtml (template, post){
    let output = template.replace('{Post_title_Placeholder}', post.title); //shows the title of the post
        output = output.replace('{Image}', post.dailyImage); //shows the image
        output = output.replace('{ID}', post.id); //shows the id
        //output = output.replace('{Post_Placeholder}', post.title); //post title displayed
        output = output.replace('{dailyPost}', post.dailyPost); //shows the daily Post

        return output;
};