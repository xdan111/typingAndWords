//主流程
/*
读取键盘输入的函数：
typing();
判断对错的函数：

*/

///////////////////
//加载json文件
function loadJSON(url,callback){
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
    xobj.open('GET', url, true);//设置请求方法与路径
	xobj.send(); //XMLHttpRequest.send()方法用于实际发出 HTTP 请求。它的参数是可选的，如果不带参数，就表示 HTTP 请求只有一个 URL，没有数据体，典型例子就是 GET 请求
	xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
			callback(xobj);
			}
		};
 }
 
// function testwps(xhttp){
// 	test(" words loading "+xhttp.responseText);
// }
function loadWords(xhttp){
	words=JSON.parse(xhttp.responseText);
//	test(" words loaded "+JSON.stringify(words));
//	test("type of words:"+typeof(words));
	test("object keys:"+Object.keys(words)+"\n object values:"+Object.values(words));
	word=wordGenerator(words);
//	test(words.apple);
}
window.onload = function() {
	document.getElementById('typing').focus();
	loadJSON('words.json',loadWords);

//	document.getElementById("test-js").innerHTML = words.apple;
};

function test(x){
	alert('test: '+ x);
}

function onTyping(x){
	var typingKey=x.key;
//	test("key:"+typingKey);
	if (typingKey==letterDisplay.innerHTML){
		document.getElementById("test-js").innerHTML = '';
//		test("match");
	}else if(typingKey=="Enter" && letterDisplay.innerHTML==""){
//		test("go");
		document.getElementById("test-js").innerHTML = '';
	}
	else{
		letterDisplay.classList.toggle("yellow",false);
		letterDisplay.classList.toggle("red",true);
		return;
	}
	
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
		wordDisplay0.classList.toggle("green",true);
		wordDisplay1.innerHTML=word.next().value;
		letterDisplay.innerHTML=word.next().value;
		letterDisplay.classList.toggle("red",false);
		letterDisplay.classList.toggle("yellow",true);
	}else{
		wordDisplay0.innerHTML=yieldedValue;
		wordDisplay0.classList.toggle("green",true);
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
	
	// if (typingKey==" "){
	// 	test("space");
	// 	document.getElementById("test-js").innerHTML = "test ok space";
	// }
}

function* wordGenerator(obj){
//	yield "Start!";
	for (let x in obj){
		yield "isSentence";//yield定义（生产）不同的内部状态。
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


document.addEventListener('keypress', function(x){
	onTyping(x);
	});//ignore ctrl shift etc.

textArea.onkeyup =function(x){
	textArea.value=x.key;
	document.getElementById("showHint").innerHTML="显示示意图应该用哪个手指按哪个键来输入： "+letterDisplay.innerHTML;
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