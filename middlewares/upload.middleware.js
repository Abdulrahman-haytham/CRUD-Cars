const multer=require('multer');

const storage=multer.diskStorage({
    destinations:(req,res,cb)=>{
        cb(nul,'uploads');
    },
    filename:(req,file,cb)=>{
        const image=(Math.random()*10000)+Date.new()+"."+ file.originalname;
        cb(null,image)
    
    }
});

const upload=multer({storage});


module.exports=upload;