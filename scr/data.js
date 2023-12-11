const date = new Date();
const hour = date.getHours();
var saudacao = "";
var idade = date.getFullYear() - 2003;
var mes = date.getMonth();
var dia = date.getDay();
if (hour < 12) {
    saudacao = "Bom dia!";
}

else if (hour < 18) {
    saudacao = "Boa tarde!";
}

else {
    saudacao = "Boa noite!";
}
if ((mes < 10) || (mes == 10 && dia < 24)) {
    idade--
}

document.getElementById("saudacao").innerHTML = saudacao;
document.getElementById("idade").innerHTML = idade;