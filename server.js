require('dotenv').config();
import app from "./src/app";

app.listen(3000,() => {
    console.log('Server running on 3000');
})