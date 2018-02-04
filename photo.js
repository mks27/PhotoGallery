var express = require("express");
var app=express();

var request =require("request");

//adding database
var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/photo_gallery");

var bodyparser=require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));

app.use(express.static('public'));
//use this line and make public folder in your project directory and put all photos there and access them directly by name.jpg


//schema setup
var campgroundschema= new mongoose.Schema({
     name:String,
     image:String
});

var campground= mongoose.model("campground",campgroundschema);

campground.create(
     {name:"harry potter" , image:"http://localhost:3000/harry potter.jpg"},
     function(err,campground)
     {
          if(err){
               console.log("something goes wrong");
          }
          else{
               console.log("newly created: ");
               console.log(campground);
          }
     }
);


app.get("/",function(req,res){
	res.redirect("/campgrounds");
});


/*
var camps =[
     {name:"apple" , image:"http://localhost:3000/apple.jpg"},
     {name:"assassins creed" , image:"http://localhost:3000/assassins creed.jpg"},
     {name:"batman" , image:"/batman.jpg"},
     {name:"harry potter" , image:"/harry potter.jpg"},
     {name:"bike" , image:"/bike.jpg"},
     {name:"call of duty" , image:"/call of duty.jpg"},
     {name:"devilmaycry", image:"devilmaycry.jpg"},
     {name:"GTA 4", image:"GTA 4.jpg"},
     {name:"man-of-steel-poster", image:"man-of-steel-poster.jpg"},
     {name:"lamborghini", image:"lamborghini.jpg"},
     {name:"Thor", image:"Thor.jpg"},
     {name:"tornado", image:"tornado.jpg"},
     {name:"Transformer", image:"Transformer.jpg"},
     {name:"dragon age", image:"dragon age.jpg"},
];


app.get("/campgrounds",function(req,res){
     	res.render("camp.ejs",{camps:camps});
}); */

app.get("/campgrounds",function(req,res){
        //extract photos from DB
        campground.find({},function(err,allcamp){
        if(err)
        {
             console.log(err);
        }
        else{
             res.render("camp.ejs",{camps:allcamp});
        }
   });
});



/*
app.post("/campgrounds",function(req,res){
	//get data from form and add to campgrounds array
	var name= req.body.name;
	var image= req.body.image;
	var newcampground= {name:name, image:image};
	camps.push(newcampground);
	
	//redirect back to campground page
	res.redirect("/campgrounds");  //default is get request
});
*/

app.post("/campgrounds",function(req,res){
     //get data from form and add to campgrounds array
     var name= req.body.name;
     var image= req.body.image;
     var newcampground= {name:name, image:image};
    campground.create(newcampground,function(err,campground){
     if(err){
               console.log("something went wrong");
          }
          else{
                //redirect to campground page
                res.redirect("/campgrounds");
          }
     
});
     
});


/*
app.get("/campgrounds/new",function(req,res){
     	res.sendfile(__dirname + "/newcamp.html");
});*/

app.get("/campgrounds/new",function(req,res){
          res.render( "newcamp.ejs");
});

app.listen(3000, function(err){
	if(err)
	{
		console.log("error");
	}
else
{
	console.log("server is running");
}

});