 const height=document.getElementById("height");
 const weight=document.getElementById("weight");
 const Congratulations=document.getElementById("Congratulations");
 const input=document.getElementById("input");
 const Result=document.getElementById("Result");
const head=document.getElementById("head");
const button=document.getElementById("button");

 function submit(){
    //to check if the height and weight are filed 
    if(height.value.length>0 || weight.value.length>0){

 //to show results
 Congratulations.style.display="block";
 input.style.display="block"
 Result.style.display="block"
  
   let result=weight.value/Math.pow(height.value,2)
   if(result<18.5){
    let type="Underweight"
    input.value=input.value+type
   }
   if(result==18.5){
    let type="Underweight"
    input.value=input.value+type
   }
   if(result>18.5&&result<24.9){
    let type="Normal"
    input.value=input.value+type
   }
   if(result==24.9){
      let type="Normal"
      input.value=input.value+type
   }
   if(result==25){
   Congratulations.innerHTML="Sorry!"
    let type="Overweight"
    input.value=input.value+type
   }
   if(result>25&&result<29.9){
   Congratulations.innerHTML="Sorry!"
    let type="Overweight"
    input.value=input.value+type
   }
   if(result==30){
      Congratulations.innerHTML="Sorry!"
    let type="Obese"
    input.value=input.value+type
   }
   if(result>30&&result<39.9){
      Congratulations.innerHTML="Sorry!"
    let type="Obese"
    input.value=input.value+type
   }
   if(result==40){
      Congratulations.innerHTML="Sorry!"
    let type="Morbidly Obese"
    input.value=input.value+type
   }
   if(result>40){
      Congratulations.innerHTML="Sorry!"
    let type="Morbidly Obese"
    input.value=input.value+type
   }
   result=result.toString()
   Result.textContent = "Your BMI is: " + result;
   console.log(result)
   //to make the current blocks invisible
 height.style.display="none"
 weight.style.display="none"
 head.style.display="none"
button.style.display="none"
    }else{
       //if height and weight are not filed say enter your deatails
        alert("enter your deatails!")
    }
 }