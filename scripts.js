
const submitBtn = document.getElementById('submit');
const comebackBtn = document.getElementById('comeback');
let socaudung = 0;
let  cauhoi_hientai = 0;
const quiz = document.getElementById('question');
const cautraloi = document.querySelectorAll('.cautraloi');
load_cauhoi();
let diem = 0;
function load_cauhoi(){
    submitBtn.disabled = true;
    remove_answer();
const data_cauhoi = '';


 fetch('http://localhost/restful_api/api/question/read.php')
.then(res => res.json())
.then(data => {
   // console.log(data);

   document.getElementById('tongsocauhoi').value =data.data.length;


   const cauhoi = document.getElementById('title');
  
   
   const a_cautraloi = document.getElementById('a_cautraloi');
   const b_cautraloi = document.getElementById('b_cautraloi');
   const c_cautraloi = document.getElementById('c_cautraloi');
   const d_cautraloi = document.getElementById('d_cautraloi');
   //hien thi cau hoi va cau tra loi
   const get_cauhoi = data.data[cauhoi_hientai];
    console.log(get_cauhoi);

    cauhoi.innerText = get_cauhoi.title;
    a_cautraloi.innerText = get_cauhoi.cau_a;
    b_cautraloi.innerText = get_cauhoi.cau_b;
    if(get_cauhoi.cau_c != null){ 
        c_cautraloi.innerText = get_cauhoi.cau_c;
        document.getElementById('cau_c').classList.remove('hienthicautraloi');


    }
    else{
        document.getElementById('cau_c').classList.add('hienthicautraloi');
    }
   
    if(get_cauhoi.cau_d != null){ 
        d_cautraloi.innerText = get_cauhoi.cau_d;
        document.getElementById('cau_d').classList.remove('hienthicautraloi');
    }
    else{
       document.getElementById('cau_d').classList.add('hienthicautraloi'); 
   } 
    document.getElementById('caudung').value = get_cauhoi.cau_dung;

   

})

.catch(error => console.log(error));
}
//Check to next question

cautraloi.forEach((elem) =>{
    elem.addEventListener("change", function(event){
        submitBtn.removeAttribute("disabled");
    })
})


//chon cau tra loi dung
function get_Answer(){
    let answer = undefined;
    cautraloi.forEach((cautraloi) =>{
       if ( cautraloi.checked){
           
           answer = cautraloi.id;
       }
    });
    return answer;
}
//remove cau tra loi

function remove_answer(){
cautraloi.forEach((cautraloi) =>{
    cautraloi.checked = false;
})
}
//Su kien click submit

submitBtn.addEventListener("click", () => {
    const answer = get_Answer();
    console.log(answer);
    if(answer){
        if ( answer === document.getElementById('caudung').value){
            socaudung++
           diem++;
        }
    }
    cauhoi_hientai++;
    
        
        load_cauhoi();
if ( cauhoi_hientai <   document.getElementById('tongsocauhoi').value){
    load_cauhoi();
} else{
//tong ket bai
const tongsocauhoi =document.getElementById('tongsocauhoi').value;
quiz.innerHTML = `
<h2> Bạn đã đúng ${socaudung} / ${tongsocauhoi} câu hỏi. Điểm của bạn là ${diem}  </h2>
<button onclick="location.reload()"> Làm lại bài </button>


`
}
// Giu lai cau tra loi

function hold_answer(){
    cautraloi.forEach((cautraloi) =>{
        cautraloi.checked = false;
    })
    }
// Su kien click comeback

comebackBtn.addEventListener("click", () =>{
    console.log(cauhoi_hientai);
    load_cauhoi();
    if ( cauhoi_hientai > 0){
cauhoi_hientai--;
load_cauhoi();
    }
   
    
    
    
        
        
})
    })
