/*! Copyright topsudoku 01-04-2023 */

var gridCell,numberCell,lockInput=!1;function allNumbers(){let e=document.getElementsByClassName("cell"),l=[0,0,0,0,0,0,0,0,0,0];for(let t=0;t<e.length;t++)e[t].innerHTML&&l[parseInt(e[t].innerHTML)-1]++;let t=document.getElementsByClassName("number"),n=0;for(let e=0;e<t.length;e++)9===l[e]?(n++,t[e].style.backgroundColor="lightgray"):t[e].style.backgroundColor="white";9===n&&(t[9].style.backgroundColor="lightgray");for(let e=0;e<t.length-1;e++)t[e].children[1].innerHTML=9-parseInt(l[e])}function isValidNumber(e,l){let t,n=document.getElementsByClassName("cell");for(let l=0;l<n.length;l++)if(e===n[l]){t=l;break}let r=Math.trunc(t/9),o=t%3+r%3*3,u=3*Math.trunc(t/27)+Math.trunc(t%9/3),i=[],c=[];for(let t=0;t<n.length;t++){if(!l&&n[t].innerHTML===e.innerHTML){c.push(n[t]);continue}if(e===n[t])continue;let s=Math.trunc(t/9),a=t%3+s%3*3,g=3*Math.trunc(t/27)+Math.trunc(t%9/3);r!==s&&o!==a&&u!==g||(l?n[t].innerHTML===l&&i.push(n[t]):i.push(n[t]))}for(let e=0;e<i.length;e++)i[e].style.highlight=i[e].style.backgroundColor,i[e].style.backgroundColor=l?"red":"lightgray";for(let e=0;e<c.length;e++)c[e].style.highlight=c[e].style.backgroundColor,c[e].style.backgroundColor="red";return(i.length>0||c.length>0)&&(lockInput=!0,window.setTimeout(()=>{lockInput=!1;for(let e=0;e<i.length;e++)i[e].style.backgroundColor=i[e].style.highlight;for(let e=0;e<c.length;e++)c[e].style.backgroundColor=c[e].style.highlight},1e3)),0===i.length&&0===c.length}function isSudokuSolved(e){let l=document.getElementsByClassName("cell");if(e){let e=[];for(var t=0;t<l.length;t++){var n=l[t];e.push(n.clueNumber?"":n.innerHTML)}try{localStorage.setItem("sudoku-top-"+window.puzzleNumber,e.join(","))}catch(e){console.log(e)}}for(let e=0;e<l.length;e++)if(""===l[e].innerHTML)return!1;return-1!==window.location.href.indexOf("/en/")?sudokuPuzzle.innerHTML="SOLVED":sudokuPuzzle.innerHTML="RATKAISTU",!0}function onCellClick(){lockInput||this!==gridCell&&(gridCell&&(0===gridCell.clueNumber?this.clueNumber:gridCell.style.backgroundColor="lightgray"),0===this.clueNumber?(gridCell&&(gridCell.style.backgroundColor="white"),(gridCell=this).style.backgroundColor="lightblue"):isValidNumber(this))}function onNumberClick(){lockInput||gridCell&&(numberCell=null,"lightgray"!==gridCell.style.backgroundColor&&(isValidNumber(gridCell,this.children[0].innerHTML)?("□"===this.children[0].innerHTML?(gridCell.innerHTML="",numberCell=this):(gridCell.innerHTML=this.children[0].innerHTML,numberCell=this),this.style.backgroundColor="lightblue"):(numberCell=this,this.style.backgroundColor="lightblue"),lockInput=!0,window.setTimeout(()=>{isSudokuSolved(!0)||(lockInput=!1),numberCell.style.backgroundColor="white",allNumbers(gridCell.innerHTML)},700)))}function doShare(){navigator.share({url:"https://minimindgames.com/fi/supersudoku/",text:"Sudoku"})}window.onload=function(){screenLock=getScreenLock();for(var e=document.getElementsByClassName("cell"),l=0;l<e.length;l++){e[l].onclick=onCellClick}let t=document.getElementsByClassName("number");for(let e=0;e<t.length;e++){t[e].onclick=onNumberClick}let n;new Date;window.puzzleNumber=0,n=[[8,0,0,0,0,3,0,7,0,0,0,0,6,0,0,0,9,0,0,0,0,0,0,0,2,0,0,0,5,0,0,0,0,0,0,0,0,0,7,0,4,5,1,0,0,0,0,0,7,0,0,0,3,0,0,0,1,0,0,8,0,9,0,0,0,0,5,0,0,0,0,0,0,6,8,0,1,0,4,0,0]][window.puzzleNumber];for(let l=0;l<n.length;l++){let t=e[l];t.clueNumber=n[l]||0,t.innerHTML=t.clueNumber||"",t.clueNumber||(gridCell?gridCell!==t&&(t.style.backgroundColor="white"):(gridCell=t).style.backgroundColor="lightblue")}try{let l=localStorage.getItem("sudoku-top-"+window.puzzleNumber);if(l){let t=l.split(",");for(let l=0;l<t.length;l++)t[l]&&(e[l].innerHTML=t[l]);isSudokuSolved(!1)&&(lockInput=!0)}}catch(e){console.log(e)}allNumbers()};let name,text,sudokuPuzzle=document.getElementById("sudokuPuzzleNo"),d=new Date,share=document.getElementById("share");function isScreenLockSupported(){return"wakeLock"in navigator}var screenLock;function getScreenLock(){if(isScreenLockSupported()){let e;try{e=navigator.wakeLock.request("screen")}catch(e){console.log(e.name,e.message)}return e}}-1!==window.location.href.indexOf("/en/")?(name="World's hardest Sudoku",text="Share Sudoku"):(name="Maailman vaikein Sudoku",text="Jaa Sudoku"),sudokuPuzzle.innerHTML=name,share.innerHTML=text,share.onclick=doShare,share.style.backgroundColor="greenyellow",share.style.color="black",share.style.cursor="pointer",document.addEventListener("visibilitychange",()=>{null!==screenLock&&"visible"===document.visibilityState&&(screenLock=getScreenLock())}),document.oncontextmenu=function(){return!1};