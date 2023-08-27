// Simple Express server setup to serve the build output
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const path = require('path');

const app = express();
app.use(helmet());
app.use(compression());

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3001;
const DIST_DIR = './dist';
app.use((req,res,next)=>{
    res.setHeader(
        'Content-Security-Policy',
        "script-src 'self' https://api.adzuna.com/v1/api/jobs/in/search/",
        "img-src 'self' https://api.adzuna.com/v1/api/jobs/in/search/"
    )
    return next()
})
app.use(express.static(DIST_DIR));

app.use('*', (req, res) => {
    res.sendFile(path.resolve(DIST_DIR, 'index.html'));
});

app.listen(PORT, () =>
    console.log(`✅  Server started: http://${HOST}:${PORT}`)
);
