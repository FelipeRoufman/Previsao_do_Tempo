const API = 'e58bfd93a525a2df533b979eb459293d';

function dadosNaTela(dados) {
    if (dados.cod === 200) {
        document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name;
        document.querySelector(".temp").innerHTML = Math.floor(dados.main.temp) + "°C";

        // Atualiza o texto de previsão com efeito de digitação
        const textoPrevisao = "Nesse local está " + dados.weather[0].description;
        const elementoTexto = document.getElementById("textoPrevisao");
        digitarTexto(elementoTexto, textoPrevisao, 100);

        document.querySelector(".unidade").innerHTML = "Umidade: " + dados.main.humidity + "%";
    } else {
        alert("Cidade não encontrada!");
    }
}

async function buscarCidade(cidade) {
    const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${API}&lang=pt_br&units=metric`);
    const dados = await resposta.json();
    dadosNaTela(dados);
}

function clickButton() {
    const cidade = document.querySelector(".input-cidade").value.trim();
    if (cidade) {
        buscarCidade(cidade);
    } else {
        alert("Por favor, insira uma cidade.");
    }
}

// Função para exibir o texto com efeito de digitação
function digitarTexto(elemento, texto, velocidade = 100) {
    elemento.innerHTML = "";
    let i = 0;

    function digitar() {
        if (i < texto.length) {
            elemento.innerHTML += texto.charAt(i);
            i++;
            setTimeout(digitar, velocidade);
        }
    }

    digitar();
}
