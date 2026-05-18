(function () { 
 document.addEventListener('DOMContentLoaded', Main); 
 async function Main() { 
  setTimeout(LoadedHomepage, 5000);
 }      
 
 async function LoadedHomepage(){
  window.location.href = "Homepage/index.html";
 }
})(); 
