import express from 'express'
const authRouter = express.Router();

authRouter.post('/register', (req, res) => {
    console.log("sdsadsda")
});
authRouter.post('/login', (req, res) => {
    console.log("sdsadsda");
})

authRouter.get('/login', (req, res) => {
    // Implement logic to render login form
    res.send('Login form');
});


export default authRouter