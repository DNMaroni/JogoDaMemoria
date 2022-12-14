window.cartas = new Array();
window.virada = false;
window.flagdupla = 1;
window.arraynumeros = [0,1,2,3,4,5,6,7,8,9,10,11];
window.tentativas = 0;
window.contador = 0;
window.primeira = '';
window.geracartas = f => {
    for(var i = 0; i<6; i++){

        var random_number = Math.floor(Math.random() * 10) + 1;
        var random_number2 = Math.floor(Math.random() * 10) + 1;

        var operators = [{
            sign: "+",
            metodo: function(a,b){ return a + b; },
            expressao: function(a,b){ return '[ '+a+' + '+b+' ]'; }
        },{
            sign: "-",
            metodo: function(a,b){ return a - b; },
            expressao: function(a,b){ return '[ '+a+' - '+b+' ]'; }
        },{
            sign: "*",
            metodo: function(a,b){ return a * b; },
            expressao: function(a,b){ return '[ '+a+' * '+b+' ]'; }
        },{
            sign: "/",
            metodo: function(a,b){ return a / b; },
            expressao: function(a,b){ return '[ '+a+' / '+b+' ]'; }
        }];
    
        var selectedOperator = Math.floor(Math.random()*operators.length);
        
        var resultado = operators[selectedOperator].metodo(random_number, random_number2);
        var expressao = operators[selectedOperator].expressao(random_number, random_number2);

    }
    return [resultado,expressao];
};

window.shuffle = array => {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    while (0 !== currentIndex) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
};

window.ehinteiro = n => {
    return n % 1 === 0;
};

window.salvacartas = f => {
    cartas = [];
    var cartascheck = [];
    var i = 0;
    while(true){
        var expressao_inteira = geracartas();
        //console.log(expressao_inteira);
        if(ehinteiro(expressao_inteira[0]) && !cartascheck.includes(expressao_inteira[0]) && Math.sign(expressao_inteira[0])  != -1){
            cartascheck[i] = expressao_inteira[0];
            cartas[i] = [expressao_inteira[0],expressao_inteira[0]];
            i++
            cartas[i] = [expressao_inteira[1],expressao_inteira[0]]; 
            i++;
            if(Object.keys(cartas).length == 12) break;
        }
    }
    montajogo();
}

window.montajogo = f => {
    var botoes = document.getElementsByClassName('backface');
    var arraytemp = arraynumeros;
    var arraytemp = shuffle(arraytemp);

    for(var i = 0; i<12; i++){
        botoes[i].innerHTML = cartas[arraytemp[i]][0];
        botoes[i].setAttribute('data-value',cartas[arraytemp[i]][1]);
    }
};

window.girapecas = trava => {
    var botoes = document.getElementsByClassName('elements');
    
    for(var i = 0; i<botoes.length; i++){
        if(botoes[i].childNodes[0].classList.contains('hidden')) botoes[i].childNodes[0].classList.remove('hidden');

        if(botoes[i].classList.contains('pointernone')) botoes[i].classList.remove('pointernone');
        if(botoes[i].classList.contains('flip')) botoes[i].classList.remove('flip');
        if(botoes[i].childNodes[1].getAttribute("style"))  botoes[i].childNodes[1].style.transform = "none";
    }


    for(var i = 0; i<botoes.length; i++){
        if(botoes[i].childNodes[0].classList.contains('hidden')) botoes[i].childNodes[0].classList.remove('hidden');

        botoes[i].classList.add('flip');
    }

    setTimeout(() => {
        for(var i = 0; i<botoes.length; i++){
            botoes[i].classList.remove('flip');
        }
    
    }, 1500);

    if(trava == "trava"){
        var elementos = document.getElementsByClassName('elements');
        for(var i = 0; i<elementos.length; i++){
            elementos[i].classList.add('pointernone');
        }
    }
};
window.escondebotao = esconde => {
    if(esconde == "sim"){
        var botao = document.getElementById('botaoiniciar');
        botao.classList.add('hidden');
        return;
    }
    var botao = document.getElementById('botaoiniciar');
    botao.classList.remove('hidden');
    var tentativass = document.querySelector('.feedbacktentativas');
    var tempo = document.querySelector('.feedbacktentativastempo');
    tentativass.innerHTML = '';
    tempo.innerHTML = '';

};

window.seacabou = f => {

    var elementos = document.getElementsByClassName('pointernone');
    if(elementos.length == 12 || f == 'acaba'){
        var tentativass = document.querySelector('.feedbacktentativas');
        var tempo = document.querySelector('.feedbacktentativastempo');
        var tempohtml = document.querySelector('.timer');

        console.log(tempohtml,tempohtml.innerHTML);

        tentativass.innerHTML = 'Parabéns!<br>Número de tentativas: '+tentativas;

        tempo.innerHTML = 'Tempo: '+tempohtml.innerHTML;
        setTimeout(() => {
            alert('Parabéns, você ganhou o jogo!');
        }, 1500);

        pauseTimer();
    }

    flagdupla++;
};

window.viracarta = carta => {

    if(flagdupla <= 2){

        if(virada == false){
            carta.classList.add('flip');
            carta.childNodes[1].style.transform = "rotateY(180deg)";
            carta.childNodes[0].classList.add('hidden');
            virada = true;
            primeira = carta;
            flagdupla++;
            return;
        }


        carta.classList.add('flip');
        carta.childNodes[1].style.transform = "rotateY(180deg)";
        carta.childNodes[0].classList.add('hidden');
        flagdupla++;
        tentativas++;
        if(primeira.childNodes[1].getAttribute('data-value') == carta.childNodes[1].getAttribute('data-value')){
            //console.log('é par');
    
           primeira.classList.add('pointernone');
           carta.classList.add('pointernone');
           virada = false;
    
            seacabou();
            setTimeout(() => {
                flagdupla = 1;
            },500);
        }else{
            //console.log('naoépar');
    
            setTimeout(() => {
                carta.classList.remove('flip');
                carta.childNodes[1].style.transform = "rotateY(180deg)";
                carta.childNodes[0].classList.remove('hidden');
    
                primeira.classList.remove('flip');
                primeira.childNodes[1].style.transform = "rotateY(180deg)";
                primeira.childNodes[0].classList.remove('hidden');
            
            }, 2000);
           virada = false;

           setTimeout(() => {
            flagdupla = 1;
          },2000);

           seacabou();
            
        }
    }
    
};

window.addEventListener("DOMContentLoaded", function(event) {
    salvacartas();
});

