const express = require('express');
const path = require('path');
const hbs = require('hbs');
const collection = require('./mongodb');

const port = process.env.PORT || 3000
const app = express();

const templatesPath = path.join(__dirname, '../templates');
const publicPath = path.join(__dirname, '../public');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'hbs');
app.set('views', templatesPath);
app.use(express.static(publicPath))

app.get('/', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});


app.post('/signup', async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password
    }

    const checking = await collection.findOne({ name: req.body.name })

   try{
    if (checking.name === req.body.name && checking.password===req.body.password) {
        res.send("user details already exists")
    }
    else{
        await collection.insertMany([data])
    }
   }
   catch{
    res.send("wrong inputs")
   }

    res.status(201).render("home", {
        naming: req.body.name
    })
})

app.get('/home', (req, res) => {
    res.render('home');
});

app.post('/login', async (req, res) => {
    
    try{
    const check = await collection.findOne({name:req.body.name});

    if(check===req.body.password){
        res.render('home');
    }
    else{
        res.send('Wrong Password');
    }
    }
    catch{
        res.status('Wrong Details')
    }
})

app.get('/home', (req, res) => {
    res.render('home');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
