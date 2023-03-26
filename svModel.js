const mongose = require('mongoose');

const SinhVien = new mongose.Schema({
    ten:{
        type: String,
        required : true
    },
    tuoi:{
        type: String,
        required : true
    },
    email:{
        type: String,
        required : true
    }
});

const SinhVienModel = mongose.model('lab',SinhVien);
module.exports = SinhVienModel;