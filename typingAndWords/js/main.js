//主流程
/*


*/

///////////////////

///////
class Player{
	constructor(name,timeLimits,hp,score,combo,highestCombo) {
	    this.name=name;
		this.timeLimits=timeLimits;
		this.hp=hp;
		this.score=score;
		this.combo=0;//疑问：必须要把constructor的参数在这里再写一遍吗？
		this.highestCombo=0;
	}	
//	var combo=0;
	scorer(x){
		var s="s1";
		var addScore=0;
		if (x != 0){
//			test("s="+s);
			addScore=x+this.combo;
			this.score+=addScore;//先上分
//			test("score="+this.score);
			if (this.combo > 1){
//				test("combo");
				s =this.combo+" combos! +" +addScore;//输出得分的文字
				if (this.combo>this.highestCombo){
					this.highestCombo=this.combo;
//					test("highest combo="+this.highestCombo);
				}
			}else{
//				test("no combo");
				s ="+" +addScore;//输出得分的文字
			}
			this.combo++;
			return s;
		}else{
//			test("2 s="+s);
			this.combo=0;
			s="try again!";
			return s;
		}
	} 
	hper(x){
		this.hp += x;
	    return this.hp;		
	}
	timer(){
		 
	}
}
var keyLocations = {
	' ':'thumb',
	'6':'right2',
	'y':'right2',
	'h':'right2',
	'n':'right2',
	'7':'right2',
	'u':'right2',
	'j':'right2',
	'm':'right2',
	'8':'right3',
	'i':'right3',
	'k':'right3',
	',':'right3',
	'9':'right4',
	'o':'right4',
	'l':'right4',
	'.':'right4',
	'0':'right5',
	'p':'right5',
	';':'right5',
	'/':'right5',
	'-':'right5',
	'[':'right5',
	'\'':'right5',
	'=':'right5',
	']':'right5',
	'5':'left2',
	't':'left2',
	'g':'left2',
	'b':'left2',
	'4':'left2',
	'r':'left2',
	'f':'left2',
	'v':'left2',
	'3':'left3',
	'e':'left3',
	'd':'left3',
	'c':'left3',	
	'2':'left4',
	'w':'left4',
	's':'left4',
	'x':'left4',
	'1':'left5',
	'q':'left5',
	'a':'left5',
	'z':'left5'
	///add shift key to indicator
/*
	'A':'s_left5',
*/
}
var fingerLocations={
	'thumb':'img/thumb.svg',
	'right2':'img/right2.svg',
	'right3':'img/right3.svg',
	'right4':'img/right4.svg',
	'right5':'img/right5.svg',
	'left2':'img/left2.svg',
	'left3':'img/left3.svg',
	'left4':'img/left4.svg',
	'left5':'img/left5.svg'	
	///add shift key
/*
	's_right2':'img/s_right2.svg',//draw shift key on the leftside of right fingers
	's_right3':'img/s_right3.svg',
	's_right4':'img/s_right4.svg',
	's_right5':'img/s_right5.svg',
	's_left2':'img/s_left2.svg',//draw shift key on the rightside of left fingers
	's_left3':'img/s_left3.svg',
	's_left4':'img/s_left4.svg',
	's_left5':'img/s_left5.svg'	
*/
}
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
	alert('test: '+ x);
}

function onTyping(x){
	var typingKey=x.key;

	if (typingKey==letterDisplay.innerHTML){//correct typing
		document.getElementById("test-js").innerHTML = '';
		fadeInOut(scoreChangeDisplay,100,player.scorer(1));
	}else if(typingKey=="Enter" && letterDisplay.innerHTML==""){//next sentence
		document.getElementById("test-js").innerHTML = '';
	}else if(letterDisplay.innerHTML != "") {// wrong typing 如果输入错误就跳出函数
		player.hper(-1);
		gameover(player.hp);	
		hpDisplay.innerHTML=heartsDisplayer(player.hp);
		letterDisplay.classList.toggle("yellow",false);
		letterDisplay.classList.toggle("red",true); 
		fadeInOut(scoreChangeDisplay,100,player.scorer(0));	
		return;
	}else {
		test('Press "Enter" to continue.');
		return;
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
		document.getElementById("show").style.display = "none";
	}else if (letterDisplay.innerHTML==" "){
		document.getElementById("test-js").innerHTML = 'Press "Space" bar';		
	}
	else{
		document.getElementById("show").style.display = "block";
	}
	hpDisplay.innerHTML=heartsDisplayer(player.hp);
	scoreDisplay.innerHTML="Score: " +player.score+" Highest Combo: "+player.highestCombo;
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

function fingerdisplay(){
	var nextfinger=letterDisplay.innerHTML;		
	for(let keys in keyLocations){
		if(nextfinger==keys){
			for (let keys1 in fingerLocations){
				if(keyLocations[keys]==keys1){
					var imgurl=fingerLocations[keys1];
					document.getElementById('img').src=imgurl;
				}
			}
		}
		else if(letterDisplay.innerHTML==""){	
		document.getElementById('img').src='';
		}
	}
}

function gameover(hp){
	if(hp==0)
	{
	window.location.href="gameover.html"
	}
}
/*		
function totalscore(x,letter){
		if(x==letter){
		score+=5;
		}
		else if(x == "Enter" && letter==""){
		score+=0;
		}
		else{
		score-=5;
		}
		return score;
}
*/
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


////////////////////
var words;
var word;
var textArea=document.getElementById('typing');
var sentenceDisplay0=document.getElementById('sentence0');
var sentenceDisplay1=document.getElementById('sentence1');
var wordDisplay0=document.getElementById('word0');
var wordDisplay1=document.getElementById('word1');
var letterDisplay=document.getElementById('letter');
var fingerDisplay=document.getElementById('showHint1');
var hpDisplay=document.getElementById('hp');
var scoreDisplay=document.getElementById('score');
var scoreChangeDisplay=document.getElementById('scorechange');
let player=new Player('one',5,3,0);

window.onload = function() {
//	loadJSON('words.json',testwps);
	loadJSON('words.json',loadWords);
//	test("loading" + player.hp);
	hpDisplay.innerHTML=heartsDisplayer(player.hp);
	scoreDisplay.innerHTML="score:" + player.score;
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

document.addEventListener('keypress', function(x){
	onTyping(x);
	
});//ignore ctrl shift etc.

textArea.onkeyup =function(x){
	textArea.value=x.key;
	fingerdisplay();	
	document.getElementById("showHint").innerHTML=letterDisplay.innerHTML;
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

