var express=require('express');
var bodyParser=require('body-parser');
var app=express();
app.use(bodyParser.json()); // support json encoded bodies
var s1=bodyParser.urlencoded({ extended: false });
app.use('/public',express.static('public')); //middleware for the static data
var mysql=require("mysql");

/*app.use('/',function(req,res,next)
{
	console.log(req.url);
	
});*/

var con=mysql.createConnection(
{
	host:"localhost",
	user:"root",
	password:"",
	database:"sofia"
}
);

con.connect(function(err)
{
	if(err)throw err;
	else
		console.log("Connection Successful");
});

app.get("/",function(req,res)
{
	res.sendFile(__dirname +"/" + "design.html");
});

app.get("/gallery.html",function(req,res)
{
	res.sendFile(__dirname+"/"+ "gallery.html");
});

app.get("/contact.html",function(req,res)
{
	res.sendFile(__dirname+"/"+ "contact.html");
});

app.get("/home.html",function(req,res)
{
	res.sendFile(__dirname+"/"+ "home.html");
});

app.get("/googleMap.html",function(req,res)
{
	res.sendFile(__dirname+"/"+"googleMap.html");
});
app.post('/ff',s1,function(req,res)
{
	console.log("Hello");
	response=
	{
		name:req.body.user_name,
		company_name:req.body.company_name,
		email:req.body.email,
		contact:req.body.contact,
		message:req.body.message
	};
	
	console.log(response);
	con.query('INSERT INTO contact SET ?',response,function(err,rows)
	{
		if(err)
		{
			console.log(err);
			console.log("Error in insertion");
		}
		else
			console.log("Insertion Successful");
	});
	var result=JSON.stringify(response);
	
	res.end(result);
	
});

app.listen(3000,function()
{
	console.log("Live at Port 3000");
});

console.log("Server is running");