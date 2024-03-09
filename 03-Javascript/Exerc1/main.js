let perdeu = false
let escolhaJogador
let escolhaCPU
let vitorias=0
while(perdeu==false){
    console.log("Escolha sua jogada: \n1 - Papel \n2 - Pedra \n3 - Tesoura");
    escolhaJogador = parseInt(prompt("Escolha sua jogada: \n1 - Papel \n2 - Pedra \n3 - Tesoura"));
    if(escolhaJogador!=1 && escolhaJogador!=2 && escolhaJogador!=3){
        console.log("Jogada invalida, voce perdeu! A sua pontuacao foi de "+vitorias);
        break
    }
    escolhaCPU = Math.floor(Math.random()*3)+1
    if(escolhaCPU==1){
        console.log("O computador jogou Papel")
    }
    else if(escolhaCPU==2){
        console.log("O computador jogou Pedra")
    }
    else{
        console.log("O computador jogou Tesoura")
    }
    if(escolhaCPU==escolhaJogador){
        console.log("A rodada empatou!")
    }
    else if((escolhaJogador==1 && escolhaCPU==3) || (escolhaJogador==2 && escolhaCPU==1) || (escolhaJogador==3 && escolhaCPU==2)){
        console.log("Voce perdeu! A sua pontuacao foi de "+vitorias)
        perdeu=true
        window.alert("Voce perdeu! A sua pontuacao foi de "+vitorias);
    }
    else{
        console.log("Voce ganhou!")
        vitorias++
    }
}