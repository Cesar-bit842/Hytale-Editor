(function () { 
 document.addEventListener('DOMContentLoaded', Main); 
 async function Main() { 
  let MenuButtonContext = document.getElementById('MenuScreenToggle'); 
  MenuButtonContext.addEventListener('click', ContextMenuToggleVisibility);
  
  //Behaviour
  
 }     
 
 async function ContextMenuToggleVisibility(event){
  let ContextMenuObject = document.querySelectorAll('body>main>mainboard>menubar')[0];
  let Visibility = ContextMenuObject.getAttribute("status");
  if(Visibility === "Show"){
   ContextMenuObject.setAttribute("status", "Hidden");
  }else{
   ContextMenuObject.setAttribute("status", "Show");
  }
 }
})(); 
