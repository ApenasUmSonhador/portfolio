const date = new Date().toLocaleTimeString();
console.log(date);
const hour = parseInt(date[0] + date[1]);
var saudacao = String();
if (hour < 12) {
    saudacao = "Bom dia";
}

else if (hour < 18) {
    saudacao = "Boa tarde";
}

else {
    saudacao = "Boa noite";
}
console.log(saudacao);
document.getElementById("saudacao").innerHTML = saudacao;