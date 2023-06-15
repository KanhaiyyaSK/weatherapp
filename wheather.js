const express = require('express');
const { sendfile } = require('express/lib/response');
const bodyParser = require('body-parser')
const http = require('http')
const app= express();

app.use(bodyParser.urlencoded({extended:true}))



app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

app.post('/',(req,res)=>{

    const query = req.body.cityInput
    const appid = '5de812bd93d9138dbd3108c3e686c4e1'
    const units = 'metric'

    console.log("Post request is received");
    const url='http://api.openweathermap.org/data/2.5/weather?q='+query+ '&appid='+appid+'&units='+units

    http.get(url,(response)=>{        

        response.on('data',(data)=>{

            const weatherData = JSON.parse(data)
            console.log(weatherData);

            const icon = weatherData.weather[0].icon

            const imageURL =  "http://openweathermap.org/img/wn/"+ icon +"@2x.png"

            const temp = weatherData.main.temp
            const description = weatherData.weather[0].description

            res.write(" <p>The temperature in "+query+ " is "+temp+"</p>")
            res.write(" <p>Weather in  "+query+ " is "+description+"</p>")
            res.write("<img src ="+ imageURL+ ">")
            res.send();

        })

    })
    


})

app.listen(3000,()=>{
    console.log('server has started successfully at port 3000');
})
