const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const request = require('request');

app.set('view engine', 'pug');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('homepage');

});

app.get('/cv', (req, res) => {

    request({
                 url: 'https://api.github.com/users/' + req.query.username, headers: {'User-Agent': 'student'}},
(err, response, body) => {
    if (err) {
        console.error(err);
    } else {
        // body is a string that needs to be parsed
        const user = JSON.parse(body);
        console.log(user);
        res.render('cv', {user})
    }
});
});


app.listen(3000);