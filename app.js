import express from 'express';
import path from 'path';
import indexRouter from './routes/index.js'; // Asegúrate de tener la extensión .js en los imports

const app = express();
const PORT = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(process.cwd(), 'public')));

// Use the router for handling routes
app.use('/', indexRouter);

// Catch-all route for handling 404 errors
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(process.cwd(), 'views', '404.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});