const puppeteer = require('puppeteer');

const Post = require('../models/post');


// TODO:
const sleep = async (ms) => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res();
      }, ms)
    });
  }

const ID = {
    login: '#email',
    pass: '#pass'
  };

const CRED = {
    user: "valerii.davydenko.9",
    pass: "Daviddavidenko"
}

const testFunction = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      const page = await browser.newPage();
      let login = async () => {
        // login
        await page.goto('https://facebook.com', {
          waitUntil: 'networkidle2'
        });
        await page.waitForSelector(ID.login);
        console.log(CRED.user);
        console.log(ID.login);
        await page.type(ID.login, CRED.user);
    
        await page.type(ID.pass, CRED.pass);
        await sleep(500);
    
        await page.click("#loginbutton")
    
        console.log("login done");
        await page.waitForNavigation();
      }
      await login();
      
      await page.goto('https://www.facebook.com/groups/451398875419759/');
    await page.click('a[class="_4-h7 _5qtn fbReactComposerAttachmentSelector_STATUS"]');
    //   await page.waitFor('div[aria-label="Create a post"] a[aria-label="Insert an emoji"]');
    //   await page.keyboard.type('test post');
    //   await page.click('div[aria-label="Create a post"] button[type=submit]');
    console.log('finish')
}


// TODO: 

  exports.getAllPosts = (req, res, next) => {
        testFunction()
      const allPosts = Post.find();
      allPosts.then(posts => {
        res.status(200).json({
            message: 'Fetch posts is ok!',
            posts,
        })
      }).catch(err => {
        res.status(500).json({
            message: 'Failed fetch posts!'
        });
      })
  }


  exports.createPost = (req, res, next) => {
    const post = new Post({
        user_name: req.body.user_name,
        post_text: req.body.post_text,
        post_date: req.body.post_date,
        post_time: req.body.post_time,
    });
    post.save().then(createdPost => {
      res.status(201).json({
        message: 'Post added successfuly',
        post: {
          ...createdPost,
          id: createdPost._id,
        }
      })
    })
    .catch(err => {
      res.status(500).json({
        message: 'Creating a post failed!',
      });
    });
  }

  exports.deletePlayer = (req, res, next) => {
    Post.deleteOne({ _id: req.params.id })
    .then(result => {
        if (result.n > 0) {
            res.status(200).json({ message: 'Delete succesful!' });
        } else {
            res.status(401).json({ message: 'Not authorized' });
        }
    })
    .catch(err => {
        res.status(500).json({
            message: 'Deleting player failed!'
        });
    });
}