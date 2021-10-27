const yeniGorev = document.querySelector('.input-gorev');
const yeniGorevEkleBtn = document.querySelector('.btn-gorev-ekle');
const gorevListesi = document.querySelector('.gorev-listesi');


yeniGorevEkleBtn.addEventListener('click', gorevEkle);
gorevListesi.addEventListener('click', gorevSilTamamla)
document.addEventListener('DOMContentLoaded',localStorageOku);//sayfa yüklendiğinde localstorageden verileri çektik.

function gorevSilTamamla(e) {

    const tiklanilanEleman = e.target;

    if (tiklanilanEleman.classList.contains('gorev-btn-tamamlandi')) {
        tiklanilanEleman.parentElement.classList.toggle('gorev-tamamlandi');//sınıfı ekledik.s
    }
    if (tiklanilanEleman.classList.contains('gorev-btn-sil')) {
        if(confirm('Silmek istediğinize emin misiniz ?')){
            tiklanilanEleman.parentElement.classList.toggle('kaybol');
            const silinicekGorev=tiklanilanEleman.parentElement.children[0].innerText;
            localStorageSil(silinicekGorev);
            tiklanilanEleman.parentElement.addEventListener(('transitionend'),function (){//animasyon bitince sildik
                tiklanilanEleman.parentElement.remove();
            })
        }

    }
}

function gorevEkle(e) {
    e.preventDefault();
    if(yeniGorev.value!=""){
        gorevItemOlustur(yeniGorev.value);
        localStorageKaydet(yeniGorev.value);
        yeniGorev.value = '';

    }
    else{
        alert('Boş Not Girilemez');
    }

}

function localStorageKaydet(yeniGorev){
let gorevler;
if (localStorage.getItem('gorevler')===null){
    gorevler=[];
}else{
    gorevler=JSON.parse(localStorage.getItem('gorevler'));
}

gorevler.push(yeniGorev);

localStorage.setItem('gorevler',JSON.stringify(gorevler));

}

function localStorageOku(){
    let gorevler;
    if (localStorage.getItem('gorevler')===null){
        gorevler=[];
    }else{
        gorevler=JSON.parse(localStorage.getItem('gorevler'));
    }

    gorevler.forEach(function (gorev){
        gorevItemOlustur(gorev);
    });
}

function localStorageSil(gorev){
    let gorevler;
    if (localStorage.getItem('gorevler')===null){
        gorevler=[];
    }else{
        gorevler=JSON.parse(localStorage.getItem('gorevler'));
    }
    //splice ile item sil
    const silinecekElemanIndex=gorevler.indexOf(gorev);
    gorevler.splice(silinecekElemanIndex,1);

    localStorage.setItem('gorevler',JSON.stringify(gorevler));

}

function gorevItemOlustur(gorev) {


    //div oluşturma
    const gorevDiv = document.createElement('div');
    gorevDiv.classList.add('gorev-item');

    //li oluşturma
    const gorevLi = document.createElement('li');
    gorevLi.classList.add('gorev-tanim')
    gorevLi.innerText = gorev;
    gorevDiv.appendChild(gorevLi);




    //const gorevTamamlandi

    const gorevTamamBtn = document.createElement('button');
    gorevTamamBtn.classList.add('gorev-btn');
    gorevTamamBtn.classList.add('gorev-btn-tamamlandi');
    gorevTamamBtn.innerHTML = '<i class="far fa-check-square"></i>'
    gorevDiv.appendChild(gorevTamamBtn);

    //gorev sil

    const gorevSilBtn = document.createElement('button');
    gorevSilBtn.classList.add('gorev-btn');
    gorevSilBtn.classList.add('gorev-btn-sil');
    gorevSilBtn.innerHTML = '<i class="far fa-trash-alt"></i>'
    gorevDiv.appendChild(gorevSilBtn);



    //ul'ye oluşturduğumuz divi ekleyelim
    gorevListesi.appendChild(gorevDiv);
}