const expess = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose= require('mongoose');
const sinhVien = require('./router/SinhVienController');
const SinhVienModel = require('./svModel');

const url = 'mongodb+srv://hieuttph27500:hieuttph27500@cluster0123.cqbgwlw.mongodb.net/dbPH27500?retryWrites=true&w=majority';
const app = expess();

// app.use(bodyParser.urlencoded({
//     extended: true
// }));
// app.use(bodyParser.json());

app.engine('.hbs', exphbs.engine({
    extname:'hbs',
    defaultLayout:'main',
    layoutsDir: "views/layouts/"    
}));

//app.engine( "hbs", engine({ extname: "hbs", defaultLayout: false, layoutsDir: "views/layouts/", }) );

app.set('view engine', '.hbs');
app.set('views', './views');



// app.use(expess.json())
mongoose.connect(url,{useUnifiedTopology:true,useNewUrlParser:true});

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html')
});
app.use('/sinhVien' , sinhVien)
// app.use('/sinhVien', sinhVien);

app.listen(4000)