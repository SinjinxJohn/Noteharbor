const express = require('express');
const cors = require('cors');
const app = express();
const userRouter = require('./Routes/userRouter');
const cookieParser = require('cookie-parser');
const { checkForToken } = require('./Middlewares/authHelper');
const notesRouter = require('./Routes/noteRouter');
const projectRouter = require('./Routes/projectRouter');



// Enable CORS for all routes
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}));


app.use(express.json());
app.use(checkForToken());

// app.use('/notes',notesRouter);

app.use('/',userRouter);
app.use('/notes',notesRouter);
app.use('/project',projectRouter);
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
});



const PORT = 5000;
app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`);
})

