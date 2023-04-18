const express = require('express');
const bodyParser = require("body-parser");
const modelSV = require('../svModel');
let alert = require('alert');
const app = express();
const exphbs = require('express-handlebars');
app.engine('.hbs', exphbs.engine({
    extname: "hbs",
    defaultLayout: 'main',
    layoutsDir: "views/layouts/"
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.set('view engine', '.hbs');
app.set('views', './views');
app.get('/', (req, res) => {
    
    res.render('AddSv.hbs',{layout: 'main'});
});
app.post('/add', async (req, res) => {
    console.log(req.body);
    var tenVL = String(req.body.ten);
    var giaVL = String(req.body.tuoi);
    var soluongVL = String(req.body.email);
    var regexNull = /^$/;
    if (tenVL.match(regexNull) || giaVL.match(regexNull) || soluongVL.match(regexNull)) {
        alert('Không được trống');
    }else if(req.body.tuoi <= 0){
        alert('Năm không được nhỏ hơn 0');
    }
        else{
        if (req.body.id == '') {
            await modelSV.create({
                ten: req.body.ten,
                tuoi: req.body.tuoi,
                email: req.body.email,
                avata: req.body.avata,
            })
            await modelSV.find({}).sort({tuoi: -1}).then(sinhVien => {
                res.redirect('/sinhVien/list')
            })
            
        }
        else {
    
            await modelSV.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true }, (err, doc) => {
                if (!err) {
                    res.redirect('/sinhVien/list')
    
                }
                else {
                    console.log('Loi');
                }
            })
        }
    }
    
}




)
app.get('/edit/:id', (req, res) => {
    modelSV.findById(req.params.id, (err, sinhVien) => {
        if (!err) {
            res.render('AddSv.hbs', { sinhVien: sinhVien.toJSON() })
        }
    })
})
app.get('/delete/:id', async (req, res) => {
    try {
        const user = await modelSV.findByIdAndDelete(req.params.id, req.body);
        if (!user) {
            res.status(400).send("No item found");
        }

        else {
            res.redirect('/sinhVien/list')
        }


    } catch (error) {
        res.status(500).send(error);
    }
})
// app.get('/list', async (req, res) => {
//     await modelSV.find({}).then(sinhVien => {
//         res.render('DanhSachSv.hbs', { sinhVien: sinhVien.map(sinhViens => sinhViens.toJSON()) })
//     })
// })

app.get('/list', async (req, res) => {
    await modelSV.find({}).sort({tuoi: 1}).then(sinhVien => {
        res.render('DanhSachSv.hbs', { sinhVien: sinhVien.map(sinhViens => sinhViens.toJSON()) })
    })
})


module.exports = app;