import express from 'express';

const app=express();
const port=3000;
// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

//Serve static files from the "public" directory
app.use(express.static('public'));

let posts = [
  {
    id: 1,
    title: "Prompting is the New Literacy",
    author: "Carine Vincent",
    date: "January 14, 2026",
    content: "When Google first appeared, 'searching' was considered a skill. Today, we are at that same moment with AI. Most people treat prompt engineering as a series of 'hacks,' but as models get smarter, the hacks will die. What will remain is a new form of literacy. Prompting is essentially the art of precise specification. In the new world, if your prompt is vague, the AI will confidently give you exactly what you asked for—which is rarely what you actually wanted. The barrier to entry isn't technical anymore; it's linguistic. If you can’t describe what you want clearly, you are, for the first time in history, technically illiterate."
  },
  {
    id: 2,
    title: "The Hard Language Advantage",
    author: "Carine Vincent",
    date: "January 12, 2026",
    content: "Learning languages like C, Rust, or Lisp doesn't just give you a tool; it changes your brain. It forces you to understand the 'why' behind the 'how.' In an age where AI can write the 'how' in seconds, the only competitive advantage left is deeply understanding the 'why.' High-level languages are for productivity, but low-level languages are for understanding. The student who understands memory management will always have a 'glass ceiling' higher than the one who only knows frameworks."
  },
  {
    id: 3,
    title: "The Death of the Mid-Level Developer",
    author: "Carine Vincent",
    date: "January 10, 2026",
    content: "We are entering a 'barbell' economy in software. AI is extremely good at the 'standard.' If your job is to translate a well-defined ticket into a standard API endpoint, the machine is already better than you. To survive the next five years, a CS student cannot aim for mere competency. You have to aim for agency. You have to be the person who decides what needs to be built, moving from a translator of ideas to an architect of systems."
  },
  {
    id: 4,
    title: "Why I’m Building My Own Blog Engine",
    author: "Carine Vincent",
    date: "January 08, 2026",
    content: "The modern web is bloated with megabytes of JavaScript and tracking cookies. Building my own engine using Node.js and EJS isn't about reinventing the wheel; it’s about understanding the axle. It teaches you about performance, control, and the craft of software. There is a specific satisfaction in building the house you live in. A blog should be a reflection of the author's mind: organized, efficient, and clear."
  }
];

app.get('/',(req,res) =>{
 console.log(posts);
    res.render('index.ejs', {posts: posts}  );
});

app.get('/new',(req,res) =>{// Render form to create a new blog post
res.render('new.ejs');
});

//create posts
app.post('/posts',(req,res) =>{// Handle form submission to create a new blog post
  const newpost={
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
    author:   req.body.author,
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      

  })
};



posts.push(newpost);
res.redirect('/');
});


app.post('/posts/delete/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  posts = posts.filter(post => post.id !== postId);
  res.redirect('/');
});

app.get('/posts/edit/:id', (req, res) => {
  const postID= parseInt(req.params.id);
  const post=posts.find(p => p.id === postID);
  res.render('edit.ejs', {post: post});
});

app.post('/posts/update/:id', (req, res) => {
  const postID= parseInt(req.params.id);
  const post=posts.find(p => p.id === postID);

  post.title=req.body.title;//updating post, gets the new title from edit form
  post.content=req.body.content;
  post.author=req.body.author;
  res.redirect('/');
});



 
app.listen(port, () =>{
    console.log(`Server is running at ${port}`);
});
