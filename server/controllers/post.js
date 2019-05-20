const puppeteer = require('puppeteer');

const Post = require('../models/post');

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

// const CRED = {
//     user: process.env.CRED_USER,
//     pass: process.env.CRED_PASSWORD
// }

const testFunction = async (textPost) => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      const page = await browser.newPage();
      let login = async () => {
        // login
        await page.goto(`https://www.facebook.com/groups/${process.env.GROUP_ID}/`, {
          waitUntil: 'networkidle2'
        });
        await page.waitForSelector(ID.login);
  
        await page.type(ID.login, process.env.CRED_USER);
    
        await page.type(ID.pass, process.env.CRED_PASSWORD);
        await sleep(500);
    
        await page.click("#loginbutton")
    
        console.log("login done");
        
        await page.waitForNavigation();
      }
    await login();
      
    await page.waitFor(3000);

    await page.click('[data-testid="status-attachment-selector"]');
    
    await page.click('[data-testid="status-attachment-mentions-input"]');
    await sleep(500);
    await page.keyboard.type(textPost);
    await sleep(500);
    await page.click('[data-testid="react-composer-post-button"]');
    await new Promise(res => setTimeout(res, 2000));
    await browser.close();
    console.log("finish");
}

function startInterval(postId, countDownDate, text) {
    let x = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        console.log(days + "d " + hours + "h " + minutes + "m " + seconds + "s ");

        if (distance < 0) {
          clearInterval(x);
          testFunction(text);
          Post.deleteOne({ _id: postId })
          .then(result => {
            console.log('result  ', result);
          })
        }
      }, 1000)
}

  exports.getAllPosts = (req, res, next) => {
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
    });

    const countDownDate = new Date(req.body.post_date).getTime();
    const now = new Date().getTime();
    const distance = countDownDate - now;
    if(distance < 0) {
      console.log('send post now');
      testFunction(req.body.post_text);
      res.status(200).json({
        message: 'Post send to facebook',
      });
    } else {
      post.save().then(createdPost => {
        res.status(201).json({
          message: 'Post added successfuly',
          post: {
            ...createdPost,
            id: createdPost._id,
          }
        });
        startInterval(createdPost._id, countDownDate, createdPost.post_text);
      })
      .catch(err => {
        res.status(500).json({
          message: 'Creating a post failed!',
        });
      });
    }
  }

  exports.deletePost = (req, res, next) => {
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