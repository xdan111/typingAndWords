//主流程
/*


*/

///////////////////

///////

class Player{
	constructor(name,timeLeft,hp,score,gameState,combo,highestCombo) {
	    this.name=name;
		this.timeLeft=timeLeft;
		this.hp=hp;
		this.score=score;
		this.gameState=gameState;
		this.combo=0;//疑问：必须要把constructor的参数在这里再写一遍吗？
		this.highestCombo=0;
	}	
//	var combo=0;
	scorer(x){//x==1, correct typing; x==0, wrong typing
		var s="s1";//return value, to display on screen
		var addScore=0;//how much should be added in one time
		if (x != 0){//correct typing
//			test("s="+s);
			addScore=x+(this.combo>7 ? 7:this.combo);//combo数很大就不再叠加了
			this.score+=addScore;//先上分，下面是分数显示
//			test("score="+this.score);
			if (this.combo > 1){//combo 1 will not be shown
//				test("combo");
				s =this.combo+" combos! +" +addScore;//输出得分的文字
				if (this.combo>this.highestCombo){//update highest combo
					this.highestCombo=this.combo;
//					test("highest combo="+this.highestCombo);
				}
			}else{
//				test("no combo");
				s ="+" +addScore;//输出得分的文字
			}
			this.combo++;
			return s;
		}else{//wrong typing
//			test("2 s="+s);
			this.combo=0;
			s="try again!";
			return s;
		}
	} 
	hper(x){
		this.hp += x;
//		test(this.hp);
	    return this.hp;		
	}
	gameStart(){
		this.gameState=1;
	}
	gameContinue(){
		this.gameState=1;
	}
	gameOver(){
		this.gameState=0;
		window.location.href="gameover.html?score="+this.score+"&highestCombo="+this.highestCombo +"&timeLeft="+this.timeLeft+"&hp="+this.hp;
	}
	gamePause(){
		this.gameState=2;
	}
}

// var keyToIndicator ={
// 	' ':'thumb',
// 	'6yhn7ujm':'right2',
// 	'8ik,':'right3',
// 	'9ol.':'right4',
// 	"0p;/-[']=":'right5',
// 	'5tgb4rfv':'left2',
// 	'3edc':'left3',
// 	'2wsx':'left4',
// 	'1qaz':'left5'
// }

var keyLocations = {
	'&nbsp;':'thumb',
	"^":'right2',
	'6':'right2',
	'y':'right2',
	'Y':'right2',
	'h':'right2',
	'H':'right2',
	'n':'right2',
	'N':'right2',
	"&":'right2',
	'7':'right2',
	'u':'right2',
	'U':'right2',
	'j':'right2',
	'J':'right2',
	'm':'right2',
	'M':'right2',
	'*':'right3',
	'8':'right3',	
	'i':'right3',
	'I':'right3',
	'k':'right3',
	'K':'right3',
	',':'right3',
	'"':'right3',
	'<':'right3',
	'9':'right4',
	'(':'right4',
	'o':'right4',
	'O':'right4',
	'l':'right4',
	'L':'right4',
	'.':'right4',
	'>':'right4',
	')':'right5',
	'0':'right5',
	'p':'right5',
	'P':'right5',
	';':'right5',
	':':'right5',
	'?':'right5',
	'/':'right5',
	'-':'right5',
	'_':'right5',
	'[':'right5',
	'{':'right5',
	'}':'right5',
	'\'':'right5',
	'\\':'right5',
	'|':'right5',
	'=':'right5',
	'+':'right5',
	']':'right5',
	'%':'left2',
	'5':'left2',
	't':'left2',
	'T':'left2',
	'g':'left2',
	'G':'left2',
	'b':'left2',
	'B':'left2',
	'$':'left2',
	'4':'left2',
	'r':'left2',
	'R':'left2',
	'f':'left2',
	'F':'left2',
	'v':'left2',
	'V':'left2',
	'#':'left3',
	'3':'left3',
	'e':'left3',
	'E':'left3',
	'd':'left3',
	'D':'left3',
	'c':'left3',
	'C':'left3',
	'@':'left4',	
	'2':'left4',
	'w':'left4',
	'W':'left4',
	's':'left4',
	'S':'left4',
	'x':'left4',
	'X':'left4',
	'!':'left5',
	'1':'left5',
	'q':'left5',
	'Q':'left5',
	'a':'left5',
	'A':'left5',
	'z':'left5',
	'Z':'left5'
	///add shift key to indicator

}

var imgUrlArr = [
    'img/enter.png',
    'img/go.gif',
	'img/go.png',
	'img/hp.svg',
	'img/keyboard.svg',
	'img/left1.svg',
	'img/left2.svg',
	'img/left3.svg',
	'img/left4.svg',
	'img/left5.svg',
	'img/right1.svg',
	'img/right2.svg',
	'img/right3.svg',
	'img/right4.svg',
	'img/right5.svg',
	'img/thumb.svg'	
];
/////
function loadJSON(url,callback){
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
    xobj.open('GET', url, true);
	xobj.send(); 
	xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
			callback(xobj);
			}
		};
 }
 
function testwps(xhttp){
	test(" words loading "+xhttp.responseText);
}
function loadWords(xhttp){
	words=JSON.parse(xhttp.responseText);
//	test(" words loaded "+JSON.stringify(words));
//	test("type of words:"+typeof(words));
//	test("object keys:"+Object.keys(words)+"\n object values:"+Object.values(words));
	word=wordGenerator(words);
//	test(words.apple);

}
function test(x){
	if (player.gameSate==1){
	clearInterval(timeCtl);//pause timer
	player.gamePause();
	}
	alert('test: '+ x);
//	timeCtl = setInterval(countDownTimer, 100);
}

function* wordGenerator(obj){
//	yield "Start!";
	for (let x in obj){
		yield "isSentence";
		let sentence=obj[x];
		let word=x;
		let splitedSentence=sentence.split(word);
		yield splitedSentence[0];
		yield splitedSentence[1];
		for (let i in x){
//			test("0:"+x.slice(0,parseInt(i)));
			yield x.slice(0,parseInt(i));
//			test("1:"+x.slice(parseInt(i)+1));
			yield x.slice(parseInt(i)+1);
//			test("x[i]:"+x[i]);
			yield x[i];
		}
		yield x;
		yield "";
		yield "";
//		yield "endSentence";
	}
	return;
}


function heartsDisplayer(hp){
	var hearts=" ";
	for (var i=0; i<hp ; i++){
		hearts+="<img src='img/hp.svg'>";
//		test(hearts);
	}
	return hearts;
}

function fingerDisplayer(){
	var nextKey=letterDisplay.innerHTML;		
	var imgURL;
	hintDisplay.innerHTML="&nbsp;";//增加一个行高
	if (nextKey!="" && keyLocations[nextKey]!=null){//这里只考虑查找手指
		imgURL="img/"+keyLocations[nextKey]+".svg";
		 //loadImage(imgURL,  function() {});
	} else if (nextKey==""){
		hintDisplay.innerHTML="";//先把这一行行高去掉
		imgURL='img/go.gif';//加一个默认图，比如点赞或者go！之类的		
	} else{
		test('error:cant find key in keyLocations');//写个兜底的条件，捕捉keyLocations里面找不到的键值
	}
	if (nextKey=="&nbsp;"){
		hintDisplay.innerHTML="&nbsp;";
	}
	else if (/[!@#$%^&*()_+{}|:"<>?,A-Z]+/.test(nextKey)){//这里只考虑加Shift，这个正则表达式可以简化了，我写不来
		hintDisplay.innerHTML="Shift+";		
	}

	document.getElementById('img').src=imgURL;
}


////////////// 以下为淡入淡出函数
function fadeInOut(element,s,text){
	element.style.opacity=0;
	element.innerHTML=text;
	var speed = s || 30 ;
	var num = 0;
	var st = setInterval(function(){
	num++;
	element.style.opacity = num/2;
	if(num>=5)  {  clearInterval(st);  }
	},speed);
//	test("in");
	fadeOut(element,speed);
}

function fadeOut(element,s){
	element.style.opacity=1;
	var speed = s || 30 ;
	var num = 5;
	var st = setInterval(function(){
	num--;
	element.style.opacity = num / 2;
	if(num<=0)  {   clearInterval(st);  }
	},speed);
//	test("out");
}

function onTyping(x){
	var typingKey=x.key;
	console.log(typingKey);
	if(typingKey==' '){
		typingKey=typingKey.replace(' ','&nbsp;');
		if (typingKey==letterDisplay.innerHTML){//correct typing
				document.getElementById("test-js").innerHTML = '';
				fadeInOut(scoreChangeDisplay,100,player.scorer(1));
			}else if(typingKey=="Enter" && letterDisplay.innerHTML==""){//next sentence
				document.getElementById("test-js").innerHTML = '';
			}else if(letterDisplay.innerHTML != "") {// wrong typing 如果输入错误就跳出onTyping函数
				player.hper(-1);
				if(player.hp<=0){player.gameOver()};
		//		gameover(player.hp);
				hpDisplay.innerHTML=heartsDisplayer(player.hp);
				letterDisplay.classList.toggle("yellow",false);		
				letterDisplay.classList.toggle("red",true);
				fadeInOut(scoreChangeDisplay,100,player.scorer(0));	
				return;
			}else {
				test('Press "Enter" to continue.');
				return;
			}
		
	}
	else{
	 if (typingKey==letterDisplay.innerHTML){//correct typing
	 		document.getElementById("test-js").innerHTML = '';
	 		fadeInOut(scoreChangeDisplay,100,player.scorer(1));
	 	}else if(typingKey=="Enter" && letterDisplay.innerHTML==""){//next sentence
	 		document.getElementById("test-js").innerHTML = '';
	 	}else if(letterDisplay.innerHTML != "") {// wrong typing 如果输入错误就跳出onTyping函数
	 		player.hper(-1);
	 		if(player.hp<=0){player.gameOver()};
	 //		gameover(player.hp);
	 		hpDisplay.innerHTML=heartsDisplayer(player.hp);
	 		letterDisplay.classList.toggle("yellow",false);		
	 		letterDisplay.classList.toggle("red",true);
	 		fadeInOut(scoreChangeDisplay,100,player.scorer(0));	
	 		return;
	 	}else {
	 		test('Press "Enter" to continue.');
	 		return;
	 	}
	}
	var yieldedObj=word.next();
	if (yieldedObj.done){
		test("done. Reloading...");
		location.reload();
		return;
		}
	var yieldedValue=yieldedObj.value;
	console.log(yieldedValue);
	if (yieldedValue=="isSentence"){
		yieldedValue=word.next().value;
		sentenceDisplay0.innerHTML=yieldedValue;
		sentenceDisplay1.innerHTML=word.next().value;
		wordDisplay0.innerHTML=word.next().value;
		wordDisplay1.innerHTML=word.next().value;
		letterDisplay.innerHTML=word.next().value;
		console.log(yieldedValue);
		letterDisplay.classList.toggle("red",false);
		letterDisplay.classList.toggle("yellow",true);
	}else{
		wordDisplay0.innerHTML=yieldedValue;
		wordDisplay1.innerHTML=word.next().value;
		letterDisplay.innerHTML=word.next().value;
		letterDisplay.classList.toggle("red",false);
		letterDisplay.classList.toggle("yellow",true);
	}
	
	if (letterDisplay.innerHTML==""){
		document.getElementById("test-js").innerHTML = 'Press "Enter" to Continue';		
//		document.getElementById("show").style.display = "none";
	}else if (letterDisplay.innerHTML==" "){
		letterDisplay.innerHTML="&nbsp;";
		document.getElementById("test-js").innerHTML = 'Press "Space" bar';
		
	}
	else{
		document.getElementById("test-js").innerHTML = 'test-js';	
//		document.getElementById("show").style.display = "block";
	}
	hpDisplay.innerHTML=heartsDisplayer(player.hp);
	scoreDisplay.innerHTML="Score: " +player.score+" Highest Combo: "+player.highestCombo;
}

////////////////////下面是各种声明各种触发

var words;
var word;
//var testtestTime=12000;
var textArea=document.getElementById('typing');
var sentenceDisplay0=document.getElementById('sentence0');
var sentenceDisplay1=document.getElementById('sentence1');
var wordDisplay0=document.getElementById('word0');
var wordDisplay1=document.getElementById('word1');
var letterDisplay=document.getElementById('letter');
var letterbackground=document.getElementById('letterbackground');
var hintDisplay=document.getElementById('showHint');
var hpDisplay=document.getElementById('hp');
var scoreDisplay=document.getElementById('score');
var scoreChangeDisplay=document.getElementById('scorechange');
var timeDisplay=document.getElementById('time');
var timeCtl;// = setInterval(countDownTimer, 100);
let player=new Player('one',1200,3,0,0);//name,timeLeft,hp,score,gameState,combo,highestCombo


window.onload = function() {
//	loadJSON('words.json',testwps);
	loadJSON('words.json',loadWords);
//	test("loading" + player.hp);
	hpDisplay.innerHTML=heartsDisplayer(player.hp);
	scoreDisplay.innerHTML="score:" + player.score;
	document.getElementById("show").style.display = "block";
	loadImage(imgUrlArr,function(){});
//	hintDisplay.innerHTML="Let's go!";
//	document.getElementById("test-js").innerHTML = words.apple;
};

document.addEventListener('readystatechange', () => {
	setTimeout(()=>{
	if (document.readyState=="complete"){
		document.getElementById("loader").style.display = "none";
		document.getElementById("myDiv").style.display = "block";
		setTimeout(()=>textArea.focus(),100);
	}
	},189);
});

document.addEventListener('compositionstart',function(){//check input method
	test("Please change input method to English.");
	textArea.value="";
});

document.addEventListener('keypress', function(x){
//	test(gameCtl.gameState+":"+gameCtl.timeLeft);
	if (player.gameState !=1){
	 	player.gameStart();
		timeCtl = setInterval(countDownTimer, 100);
	}
//	var nInterval=setInterval(gameCtl.timer,100);//试过很多次都没法调用class的方法做timer，求解
	onTyping(x);
});//ignore ctrl shift etc.


function countDownTimer() {
 // var d = new Date();
	player.timeLeft--;
	if (player.timeLeft<=0){player.gameOver()};
	timeDisplay.innerHTML = (player.timeLeft/10).toFixed(1) + " S";
}

textArea.onkeyup =function(x){
	textArea.value=x.key;
	fingerDisplayer();	
//	document.getElementById("showHint").innerHTML=letterDisplay.innerHTML;
};
	
textArea.onblur =function(){
	if (!this.value.includes('/exit')) {
		//test("error");
		this.classList.add("focused");
//		this.classList.add("yellow")
		setTimeout(()=>textArea.focus(),100);
	} else {
		//test("good");
		this.classList.remove("focused");
	}
};
	 
function loadImage(list, callback){  
    var images =[],count=0;
    for(i in list){  
        images[i] = new Image();  
        images[i].onload = function(){  
			count++;
            if(count >= list.length){  
                callback(images);  
				console.log('加载完成');
            };  
        }  
        images[i].src = list[i];  
    }  
	}
// function typing(typingKey){
// 	if (typingKey==letterDisplay.innerHTML){//correct typing
// 				document.getElementById("test-js").innerHTML = '';
// 				fadeInOut(scoreChangeDisplay,100,player.scorer(1));
// 			}else if(typingKey=="Enter" && letterDisplay.innerHTML==""){//next sentence
// 				document.getElementById("test-js").innerHTML = '';
// 			}else if(letterDisplay.innerHTML != "") {// wrong typing 如果输入错误就跳出onTyping函数
// 				player.hper(-1);
// 				if(player.hp<=0){player.gameOver()};
// 		//		gameover(player.hp);
// 				hpDisplay.innerHTML=heartsDisplayer(player.hp);
// 				letterDisplay.classList.toggle("yellow",false);		
// 				letterDisplay.classList.toggle("red",true);
// 				fadeInOut(scoreChangeDisplay,100,player.scorer(0));	
// 				return;
// 			}else {
// 				test('Press "Enter" to continue.');
// 				return;
// 			}
// 			}