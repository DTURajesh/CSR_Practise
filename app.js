const express= require('express');
const mongoose = require('mongoose');
const BlogModel= require('./models/Blogs');
const bodyParser = require('body-parser');
const path=require('path');
const methodOverride= require('method-override');
const app= express();

mongoose.connect('mongodb://127.0.0.1:27017/BlogDB')
.then(()=> console.log("Mongoose is connected"))
.catch(()=> console.log("error", err));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride('_method'));

app.get('/api', (req, res)=>{
    
    const item="<h1>Hello from Server</h1>";
   res.json({
      item
   })

   //res.json({ user: 'geek' });
})
app.get('/Blogs',  async (req, res)=>{
    
    const result= await BlogModel.find();
    console.log(result);
     res.json({result});
})


app.get('/Blogs/:id', async (req, res)=>{      
    const BlogID= req.params.id;
    //console.log(BlogID);
    const blog= await BlogModel.findById({_id : BlogID});
      console.log("hello ",blog);
      
      res.status(200).json({blog});

})


app.get('/Blogs/:id/edit', async (req, res)=>{
   
    const BlogID= req.params.id;
    //console.log(BlogID);
    const blog= await BlogModel.findById({_id : BlogID});
    
    res.status(200).json({blog});
})

app.put('/Blogs/:id', async (req, res)=>{

    const BlogID= req.params.id;

    const {Tittle ,Author, Content}= req.body;
    //console.log(BlogID);
    const blog= await BlogModel.findById(BlogID);
    
    blog.Tittle=Tittle;
    blog.Author=Author;
    blog.Content=Content;
    console.log(blog);
     blog.save();
    //console.log(path.join(__dirname,"/public/index.js"));
    res.sendFile(path.join(__dirname,"/public/index.html"));

})


const port= 3000;
app.listen(port, ()=>{
    console.log(`Server is working at ${port}`);
})

