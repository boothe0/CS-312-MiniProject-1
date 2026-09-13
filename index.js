import express from "express";
import bodyParser from "body-parser";

const app = express()
const port = 3000;
let blog_post_array = []
class BlogPost {
  constructor(name, date, blog_title, blog_information){
    this.name = name;
    this.date = date;
    this.blog_title = blog_title;
    this.blog_information = blog_information;
  }
}

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    // res.render("home.ejs");
    res.render("home.ejs", { blogPosts: blog_post_array});
});

app.post("/delete", (req, res)=>{
  let blog_post_name = req.body.delete_name;
  for (let blog in blog_post_array){
    if (blog_post_array[blog].name == blog_post_name){
      blog_post_array.splice(blog, 1);
    }
  }
  res.render("home.ejs", { blogPosts: blog_post_array});
});

app.post("/edit", (req, res)=>{
  let post = JSON.parse(req.body.edit_post);
  for (let blog in blog_post_array){
    if (blog_post_array[blog].name == post.name){
      if (req.body.blog_information != ""){
        blog_post_array[blog].blog_information = req.body.blog_information;
      }
      if (req.body.category != "Choose..."){
        blog_post_array[blog].category = req.body.category;
      }
    };
  }
  res.render("home.ejs", { blogPosts: blog_post_array});
});

app.post("/submit", (req, res) => {
    // pass in the form values of:
    // name
    // date 
    // blog title
    // blog information
    // category choosen
    let newBlogPost = new BlogPost(
      req.body.name,
      req.body.date,
      req.body.blog_title,
      req.body.blog_information,
    );
    blog_post_array.push(newBlogPost);
    console.log(blog_post_array);
    res.render("home.ejs", { blogPosts: blog_post_array});
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});