var express=require('express');
var app=express();
app.use(express.static('public'));
var router=express.Router();

router.use(function(req,res,next)
{
	console.log("/" + req.method());
	next();
});

router.get("/",function(req,res)
{
	res.sendFile(__dirname +"/" + "design.html");
});

router.get("/gallery",function(req,res)
{
	res.sendFile(__dirname+"/"+gallery.html);
});

app.use("/",router);

app.listen(3000,function()
{
	console.log("Live at Port 3000");
});


