//主流程
/*
读取键盘输入的函数：
typing();
判断对错的函数：

*/

///////////////////

///////
class Player{
	constructor(name,timeLimits) {
	    this.name=name;
		this.timeLimits=timeLimits;
	}	
	scorer(x,letter){
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
	}
var keyLocations = {
	'Space':'right1 left1',
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
	't':'letf2',
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
	var score=0;
	var player=new Player('one',3);
	scoreDisplay.innerHTML='当前分数'+player.scorer(typingKey,letterDisplay.innerHTML);
	if (typingKey==letterDisplay.innerHTML){//correct typing
		document.getElementById("test-js").innerHTML = '';
	}else if(typingKey=="Enter" && letterDisplay.innerHTML==""){//next sentence
		document.getElementById("test-js").innerHTML = '';
	}	
	else{// wrong typing 如果输入错误就跳出函数
		letterDisplay.classList.toggle("yellow",false);
		letterDisplay.classList.toggle("red",true); 
		return;//
		 
	}	
	var yieldedObj=word.next()
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
		//wordDisplay2.innerHTML=word.next().value;
		// wordDisplay0.style.color='#EE7752';
		wordDisplay1.innerHTML=word.next().value;
		//wordDisplay1.style.color='#FF0000';
		letterDisplay.innerHTML=word.next().value;
		//letterDisplay.style.color='#008000';
		console.log(yieldedValue);
		letterDisplay.classList.toggle("red",false);
		letterDisplay.classList.toggle("yellow",true);
	}else{
		wordDisplay0.innerHTML=yieldedValue;
		//wordDisplay2.innerHTML=yieldedValue.next().value;
		wordDisplay1.innerHTML=word.next().value;
		letterDisplay.innerHTML=word.next().value;
		letterDisplay.classList.toggle("red",false);
		letterDisplay.classList.toggle("yellow",true);
	}
	
	if (letterDisplay.innerHTML==""){
		document.getElementById("test-js").innerHTML = 'Press "Enter" to Continue';
	}else if (letterDisplay.innerHTML==" "){
		document.getElementById("test-js").innerHTML = 'Press "Space" bar';
	}

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

////////////////////
var hp=0;
var score=0;
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
var hpDisplay=document.getElementById('hp');
window.onload = function() {
//	loadJSON('words.json',testwps);
	loadJSON('words.json',loadWords);
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
	var nextfinger=letterDisplay.innerHTML;
	for(let keys in keyLocations){
		if(nextfinger==keys){
		fingerDisplay.innerHTML="显示接下来应该用什么手指：" + keyLocations[keys];
	}
	else if(letterDisplay.innerHTML==""){	
	fingerDisplay.innerHTML="";
	}
	}
	document.getElementById("showHint").innerHTML="显示接下来应该输入的字母:"+letterDisplay.innerHTML;
	}
	
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


	// var nextWord=wordGenerator(words);
	// var i=nextWord.next();
	// document.getElementById('sentence').innerHTML=i.value[0];

// function displayJSON(some){
// 	test(some);
// }

// function loadJSON() {
//     var xobj = new XMLHttpRequest();
// 	xobj.overrideMimeType("application/json");
//     xobj.open('GET', 'words.json', true);
// 	xobj.send(); 
// 	xobj.onreadystatechange = function () {
//           if (this.readyState == 4 && this.status == "200") {
//             test(this.responseText);
//           }
// 		  else{
// 			test('error');
// 		  }
//     }
//  }
 


// function createTextarea(text) {
//   const textArea = document.createElement('textarea');

//   // Place in top-left corner of screen regardless of scroll position.
//   textArea.style.position = 'fixed';
//   textArea.style.top = 0;
//   textArea.style.left = 0;
//   textArea.style.width = '20em';
//   textArea.style.height = '20em';

//  // textArea.style.padding = 0;

//   // Clean up any borders.
//  // textArea.style.border = 'none';
//   //textArea.style.outline = 'none';
//   //textArea.style.boxShadow = 'none';

//   // Avoid flash of white box if rendered for any reason.
//   //textArea.style.background = 'transparent';

//   textArea.value = text;

//   document.body.appendChild(textArea);
//   return textArea;
// }
//var x = document.getElementById('typing');


// // 获取<p>javascript</p>节点:
// var js = document.getElementById('test-js');

// // 修改文本为JavaScript:
// // TODO:
// js.innerHTML="JavaScript";
// // 修改CSS为: color: #ff0000, font-weight: bold
// // TODO:
// js.style.color='#ff0000';
// js.style.fontWeight='bold';


// document.getElementById("typing").onfocusout=function() {
// 	alert("out");
// 	document.getElementById("typing").focus();
// }

// x.addEventListener('mouseover',function(){
// 	test(4);
// });