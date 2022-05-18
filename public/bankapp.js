

const profilebtn = document.querySelector(".profilebtn")
const profile = document.querySelector(".profile")
console.log("Dddddddddddddddd")

const homepageMenuButton  = document.querySelector(".homepage-menu-button")
const headerInputbutton = document.querySelector(".header-inputbutton")
const inputSearch = document.querySelector(".input-search")
const headerInputbars= document.querySelector(".header-inputbars")
const headerInputtext= document.querySelector(".header-inputtext")

const listHead2  = document.querySelector(".list-head2")
const header = document.querySelector("header")
const section = document.querySelectorAll("section")


block = new Map([
    [true,"block"],
    [false,"none"]

])


fixed = new Map([
    [true,"block"],
    [false,"fixed"]

])


// console.log(block.get(true))



if(homepageMenuButton ){


homepageMenuButton.addEventListener("click",e=>{
listHead2.classList.toggle("active-block-495px")

})}

document.addEventListener("mousemove",e=>{
    // console.log(e.y)
})
console.log(header.offsetHeight)



document.addEventListener("scroll",e=>{
    
    let y =window.scrollY
    // console.log(window.scrollY,header.style.height )

    
    if( y >= 5){
        header.style.position="fixed"
        listHead2.style.position="fixed"
        header.style.zIndex="4"
        listHead2.style.zIndex="4"
  
        listHead2.style.top= `${header.offsetHeight}px`
        // header.style.width="100%"
        // listHead2.style.width=`${listHead2.offsetWidth}px`
        
        console.log(header.offsetHeight,listHead2.offsetWidth)

    }else{
        header.style.position=null
        listHead2.style.position=null
        listHead2.style.top= null


    }



// section.forEach(e=>{
//   p = e.querySelectorAll("p")
//   img = e.querySelectorAll("img")
//   console.log(p)

//   child =[...p,...img]
//   console.log(child)
//   child.forEach(a=>{
//       console.log(a.y)
//   })
// })













})



 
headerInputbutton.addEventListener("click",e=>{
   
    headerInputbars.classList.toggle("active-text-495px")


    if(headerInputbars.classList.contains("active-text-495px")){
        console.log("gg")
        headerInputtext.style.display="none"
    }else{
        headerInputtext.style.display=null

    }

    


    headerInputtext.classList.toggle("active-text-495px")
    // console.log(headerInputbars)
    

})




const header_option = document.querySelectorAll(".header_option")



header_option.forEach(e=>{
    parent = e.parentElement
    console.log(parent)
    parent.addEventListener("mouseenter",(a)=>{
        // e.toggle
        console.log("Dcdewdw")
        pol = e.style.display=="block"
        e.style.display=block.get(!pol)

        // console.log(e.style.display=="block")
    }) 
    parent.addEventListener("mouseleave",(a)=>{
        // e.toggle
        // console.log("Dcdewdw")
        pol = e.style.display=="block"
        e.style.display=block.get(!pol)

        // console.log(e.style.display=="block")
    }) 
})



const  home_footer_txtbtn =document.querySelectorAll(".home-footer-txtbtn")


home_footer_txtbtn.forEach(e=>{
btn = e.querySelector("button")

btn.addEventListener("click",a=>{
    home_footer_txtbtn.forEach(b=>{


        btn = b.querySelector("button")
        e =   b.parentElement.querySelector(".home-footer-options")
    // console.log(btn ,a.target)
        if(btn!=a.target){
            // console.log(btn.parentElement)
      e.classList.remove("home-footer-options-toggle")
    
        }else{

            e.classList.toggle("home-footer-options-toggle")
        }
    })


})
})


const section1 =document.querySelector(".section1")
if(section1){


const section1btn =  section1.children[0].querySelectorAll("button")

section1btn.forEach(e=>{
    e.addEventListener("click",e=>{
  
    targt =e.target.getAttribute("id")
    section1btn.forEach(e=>{
        xx=e.getAttribute("id") 
        if(xx != targt ){
            
            section1.querySelector(`.${xx}`).style.display="none"
           e.style.borderColor="grey";
            console.log(     section1.querySelector(`.${xx}`).style.borderBottom)

        }
        else{
            mm=      section1.querySelector(`.${xx}`)
       mm.style.display="flex"
            e.style.borderColor=null;
        console.log(mm.children[0].nodeName=="IMG" & mm.children.length == 1)
        if(mm.children[0].nodeName=="IMG" & mm.children.length == 1){
            div=document.createElement("div")
            mm.children[0].style.width ="100%"
            mm.children[0].style.maxWidth ="100%"
            div.appendChild(mm.children[0])
           div.style.width ="100%"
           div.style.maxHeight ="400px"
           div.style.overflow="hidden"
           mm.innerHtml=""
           mm.appendChild(div)
            console.log("jdsjkdnd",mm.children[0])
        }

        

        
            
        }

    })

})})}


// const profilebtn = document.querySelector(".profilebtn")
// const profile = document.querySelector(".profile")
console.log("Dddddddddddddddd")
if(profilebtn){
    const profileclose =profile.querySelector(".profileclose")
    let profileblock = false
    profileclose.addEventListener("click",e=>{ profile.style.display="none";  profileblock=false})
    profilebtn.addEventListener("click" , (e)=>{
        console.log(profile.style.display,"jnjnnjn",profile)
        profileblock = !profileblock
        profile.style.display=block.get(profileblock)
    })
}


const alertt = document.querySelector(".alert")
let _alertt

if(alertt){
    _alertt=alertt
    

}

