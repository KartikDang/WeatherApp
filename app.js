const express=require('express');
const bodyParser=require('body-parser');

const https=require('https');
const app=express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.set('view engine','ejs');

app.get("/",function(req,res){
    //res.send("Server is running")
    console.log(cityName);
    res.render('index',{
        tempe: null,
        desc: null,
        ic: null,
        city:null    
    });
})

var cityName;

app.post("/",function(req,res){
    console.log(req.body);
    cityName=req.body.city;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=c0b9d4c1ccd18d5b1fe8a924288afcfa&units=metric";
   
    try{
     https.get(url,function(response){
        response.on("data",function(data){
            const WeatherData=JSON.parse(data);
            console.log(WeatherData);

             

            if(WeatherData.message==="city not found"|| WeatherData.message==="Nothing to geocode"){
                res.render('index',{
                    tempe:null,
                    desc:WeatherData.message,
                    ic:null,
                    city:null
                })
            }
            else{
                const temperature=String(Math.round(WeatherData.main.temp));
                const description_temp=WeatherData.weather[0].description;
                const description=description_temp.toUpperCase();
                const icon= WeatherData.weather[0].icon;
                const cityNamemain=WeatherData.name;

             res.render('index',{
                tempe:temperature+"°C",desc:description,ic:icon,city:cityNamemain
            })
            }
        })
    })
    }catch(err){
        res.render('index',{
            city:null,
            desc:"Something Went Wrong",
            ic:null,
            tempe:null
        })
    }

})

app.listen(3000,function(){
    console.log("Server Running @ 3000");
})