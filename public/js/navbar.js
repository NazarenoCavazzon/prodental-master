let nav = document.querySelector('nav');
let navIcon = document.querySelector('.fal');
let navButton = document.querySelector('.checkbtn');
let navCheckBtn = document.querySelector('#check');

window.addEventListener('load', ()=>{
    if (window.innerWidth > 768){
        window.addEventListener('scroll', ()=>{
            if (window.pageYOffset > 0){
                nav.classList.add('scroll');
            }else{
                nav.classList.remove('scroll');
            }
        })
    }
})

navButton.addEventListener("click", () =>{
    if (navCheckBtn.checked==false){
        navIcon.classList.remove('fa-bars');
        navIcon.classList.add('fa-times');
    }else{
        navIcon.classList.remove('fa-times');
        navIcon.classList.add('fa-bars');
    }
  })
  