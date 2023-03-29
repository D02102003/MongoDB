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
app.use(bodyParser.json())
app.set('view engine', '.hbs');
app.set('views', './views');
app.get('/', (req, res) => {
    res.render('AddSv.hbs', { layout: 'main' });
    console.log('http://127.0.0.1:5500/traitim.png');
});
app.post('/add',async (req,res)=>{
    console.log(req.body);
    if(req.body.id == ''){
        await modelSV.create({
            ten : req.body.ten,
            tuoi : req.body.tuoi,
            email : req.body.email,
        })
        res.render('AddSv.hbs',{layout:'main',helpers: {
            successfully() { return 'ADD SUCSSECCFULLY'; },
           
          }})
    }
    else{
        
        await modelSV.findOneAndUpdate({_id:req.body.id},req.body,{new :true},(err,doc) =>{
            if(!err){
                    res.redirect('/sinhVien/list')
                
            }
            else{
                console.log('Loi');
            }
        })
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
app.get('/list',async (req,res) =>{
    await modelSV.find({}).then(sinhVien =>{
        res.render('DanhSachSv.hbs',{sinhVien : sinhVien.map(sinhViens => sinhViens.toJSON())})
    })
})


module.exports = app;