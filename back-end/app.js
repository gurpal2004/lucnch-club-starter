
var express = require('express');
var app = express();


var fs=require('fs')
var port=2000;
var file='index.html'
var path=__dirname;
var accounts=[]

fs.readFile('account.txt',(err,out)=>{
    	if(err){
    		console.log(err)
    	}else {
    	accounts=JSON.parse(out) 
    	console.log('Data files loaded')  		
    	}
    })

app.use(express.urlencoded({extended:true}))
app.get('/',(req,res)=>{
 //res.send('We have no file to show')
 res.send(`<form method="post" action="/account">
 	<input type="text" name="email">
 	<input type="number" name="whatsapp">
 	<button type="submit">Submit</button></form>`)

})

app.post('/account',(req,res)=>{
 if(req.body){
 	var body=req.body;
 	var tmp={
 		person:body.email,
 		whatsapp:body.whatsapp
 	};
 	accounts.push(tmp)
 	fs.writeFile('account.txt',JSON.stringify(accounts),(err)=>{
 		if(err){

 		}else{
 			res.send('Added')
 		}
 	})

 }
})
app.get('/account',(req,res)=>{
    res.send(accounts)
})
app.listen(port,(e)=>{
if(e){
console.log(e)
}
else{
console.log('Server running on port : ',port)
}

})
