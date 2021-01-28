//主流程
/*
读取键盘输入的函数：
typing();
判断对错的函数：

*/

///////////////////
class Player{
	constructor(name,hp,timeLimits,score) {
	    name="player1";
		hp=3;
		timeLimits=0;
		score=0;
	}
	// timer(){
		
	// }
	scorer(){
		
	}
}
///////
const keyLocations={
	32:'right1 left1',
	54:'right2',
	89:'right2',
	72:'right2',
	78:'right2',
	55:'right2',
	85:'right2',
	74:'right2',
	77:'right2',
	56:'right3',
	73:'right3',
	75:'right3',
	188:'right3',
	57:'right4',
	79:'right4',
	76:'right4',
	190:'right4',
	48:'right5',
	80:'right5',
	186:'right5',
	191:'right5',
	53:'left2',
	84:'letf2',
	71:'left2',
	66:'left2',
	52:'left2',
	82:'left2',
	70:'left2',
	86:'left2',
	56:'left3',
	69:'left3',
	68:'left3',
	67:'left3',	
	50:'left4',
	87:'left4',
	83:'left4',
	88:'left4',
	189:'left5',
	219:'left5',
	222:'left5',
	187:'left5',
	13:'left5',
	49:'left5',
	81:'left5',
	65:'left5',
	90:'left5'
}
function hint(x){
	
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
//	test("key:"+typingKey);
	if (typingKey==letterDisplay.innerHTML){//correct typing
		document.getElementById("test-js").innerHTML = '';
//		test("match");
	}else if(typingKey=="Enter" && letterDisplay.innerHTML==""){//next sentence
//		test("go");
		document.getElementById("test-js").innerHTML = '';
	}
	else{// wrong typing
		letterDisplay.classList.toggle("yellow",false);
		letterDisplay.classList.toggle("red",true);
		return;
	}
	console.log(typingKey)
	var yieldedObj=word.next()
	if (yieldedObj.done){
		test("done. Reloading...");
		location.reload();
		return;
		}
	var yieldedValue=yieldedObj.value;

//	test("yieldedValue:"+yieldedValue);

	if (yieldedValue=="isSentence"){
		yieldedValue=word.next().value;
		sentenceDisplay0.innerHTML=yieldedValue;
		sentenceDisplay1.innerHTML=word.next().value;
		wordDisplay0.innerHTML=word.next().value;
		wordDisplay1.innerHTML=word.next().value;
		letterDisplay.innerHTML=word.next().value;
		letterDisplay.classList.toggle("red",false);
		letterDisplay.classList.toggle("yellow",true);
	}else{
		wordDisplay0.innerHTML=yieldedValue;
		wordDisplay1.innerHTML=word.next().value;
		letterDisplay.innerHTML=word.next().value;
		letterDisplay.classList.toggle("red",false);
		letterDisplay.classList.toggle("yellow",true);
//		test("match");
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

var words;
var word;
var textArea=document.getElementById('typing');
var sentenceDisplay0=document.getElementById('sentence0');
var sentenceDisplay1=document.getElementById('sentence1');
var wordDisplay0=document.getElementById('word0');
var wordDisplay1=document.getElementById('word1');
var letterDisplay=document.getElementById('letter');
var fingerDisplay=document.getElementById('showHint1');

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
	var typingkeycode=x.keyCode;
	for(let keys in keyLocations){
		if(typingkeycode==keys){
		fingerDisplay.innerHTML=keyLocations[keys];	
		document.getElementById("showHint1").innerHTML="显示字母应该用什么手指：" + fingerDisplay.innerHTML;
		}
			console.log(keys);
	}
	console.log(typingkeycode);	
	document.getElementById("showHint").innerHTML="显示应该接下来应该输入的字母:"+letterDisplay.innerHTML;
	
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