const express = require('express');
const bodyParser = require("body-parser");
const modelSV  = require('../svModel')
const app = express();
const exphbs = require('express-handlebars');
app.engine('.hbs', exphbs.engine({
    extname: "hbs",
    defaultLayout:'main',
    layoutsDir: "views/layouts/"
}));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', '.hbs');
app.set('views', './views');
app.get('/', (req, res) => {
    res.render('AddSv.hbs', { layout: 'main' });
});
app.post('/add',(req,res)=>{
    console.log(req.body);
    modelSV.create({
        ten : req.body.ten,
        tuoi : req.body.tuoi,
        email : req.body.email,
    })
    modelSV.find({}).then(sinhVien =>{
        res.render('DanhSachSv.hbs',{sinhVien : sinhVien.map(sinhViens => sinhViens.toJSON())})
    })
})

module.exports = app;