




const slider = document.querySelector(".slider")
const next = document.querySelector(".next")
const prev = document.querySelector(".prev")

list=[
    {tag:"img",
    img:"imgs/slider/cheung-yin-FA24njLpmug-unsplash.jpg"
            

},
    {tag:"img",
    img:"imgs/slider/carlos-muza-hpjSkU2UYSU-unsplash.jpg"
            

}
,
    {tag:"img",
    img:"imgs/slider/etienne-martin-2_K82gx9Uk8-unsplash.jpg"
            

}
,
    {tag:"img",
    img:"imgs/slider/micheile-dot-com-SoT4-mZhyhE-unsplash.jpg"
            

}

]


const vw =window.innerWidth
// console.log(vw)
function insert(){
let child2_div = document.createElement("div")
child2_div.setAttribute("class","child2_div")
for(i=0;i<=list.length-1;i++){
    e=list[i]
    child1=document.createElement("span")
    child2=document.createElement("DIV")
    // child1.style.width=`${window.innerWidth}px`
    // child1.style.height="100px"
    child1.style.left=`${window.innerWidth*i}px`
    console.log(window.innerWidth*i, window.innerWidth * (list.length-1))
    child = document.createElement(`${e.tag}`)
    child.src=e[e.tag]
    child1.setAttribute("id",`${i}`)
    child2.setAttribute("id",`${i}`)
    child1.appendChild(child)
 
    child2_div.appendChild(child2)
    slider.appendChild(child1)
}
slider.appendChild(child2_div)
}
insert()

const child2_div=document.querySelector(".child2_div")
console.log(child2_div)


// setInterval(()=>{slide()},5000)
let nextInterval=true
let prevInterval=true


let a=0;
let begin = 0;
let nextTimeOut;
let prevTimeOut;
next.addEventListener("click",e=>{
    clearTimeout(nextTimeOut)
    nextInterval=false
    slide(true)
    begin++
    nextTimeOut = setTimeout(e=>{nextInterval=true},3000)


})



prev.addEventListener("click",e=>{


   
    // console.log(e.timeStamp)
    clearTimeout(prevTimeOut)
    
    prevInterval=false
    slide()
    // begin++
    prevTimeOut = setTimeout(e=>{prevInterval=true},5000)


 
})

// slider.style.left="-900px"

setInterval(()=>{if( prevInterval & nextInterval){slide()}},5000)
let animation
// slide()
function slide(i){
    // console.log("slide")
    if(a>list.length-1)
        {
            // insert()
            a=0
        }
        let _vw = vw
        if(i){
            _vw=-_vw
            
            console.log(i)
        }
      const  arr =   Array.from(child2_div.children)
     
        Array.from(slider.children).forEach(e=>{
            // console.log(e.tagName)
           if(e.tagName == "BUTTON" || e.tagName == "DIV"){
               return
           }
           

           let left1 = e.style.left.slice(0,-2);
        //    console.log(begin,e,left1,"left")
            if( i   & left1==vw*(list.length-1)){
               
               
                     // console.log("hello",1111)
                    e.style.left=`-${vw}px`
                    
            //    e.style.left=`-1000px`
            
               
                
                
                
                }
                // console.log(left)
                
                let left = e.style.left.slice(0,-2);
             animation =  e.animate([{left:`${left}px`},
            {left:`${left - _vw}px`}
            
            
        ],
        {
            duration:1000,
            fill:"forwards",
            easing:"linear",
            // iterationCount:"infinite"
        })
       
      
      
    
        
        
        
        // slider.removeChild(e)
        e.style.left=`${left - _vw}px`
        
        
        if(Math.sign(left - _vw  )==-1 & !i){
            e.style.left=`${ _vw *  (list.length-1)}px`
         
            
            
        }
       
        if(e.style.left=="0px"){
            arr.forEach(a=>{
               
               if(a.id==e.id ){
                a.style.backgroundColor="green"
               
            }else{
                a.style.backgroundColor=null
               
            }
                
            })
        }
     


     
     
        })
        

     

}


links.href=URL.createObjectURL("hello")




// document.addEventListener("touchstart",e=>{
//     console.log("start")
// })

// document.addEventListener("touchmove",e=>{
//     console.log("move")
// })

// document.addEventListener("touchend",e=>{
//     console.log("end")
// })













// function slide(){
//     if(a>list.length-1)
//     {
//         a=0
//     }
//     if(a<0)
//     {
//         a=list.length-1
//     }

//     e=list[a]
   
//     child1=document.createElement("div")
//     // child1.style.width=`${window.innerWidth}px`
//     // child1.style.height="100px"
//     child = document.createElement(`${e.tag}`)
//     child.src=e[e.tag]
//     // child.setAttribute("id",`${a}`)
//     child1.appendChild(child)
//     slider.innerHTML=""
//     slider.appendChild(child1)
  
//     a++
    
// }


// console.log(window.innerWidth)