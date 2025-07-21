document.getElementById('menuToggle').addEventListener('click', function () {
  document.getElementById('navMenu').classList.toggle('show');
});

document.getElementById('formOrcamento').addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = this.nome.value.trim();
    const email = this.email.value.trim();
    const tel = this.telefone.value.trim();
    const empresa = this.empresa.value.trim(); // Adicionado do seu HTML
    const segmento = this.segmento.value.trim(); // Adicionado do seu HTML
    const quantidade = this.quantidade.value.trim(); // Adicionado do seu HTML
    const cidade = this.cidade.value.trim(); // Adicionado do seu HTML
    const necessidade = this.necessidade.value.trim(); // Nome alterado para 'necessidade' para corresponder ao HTML

    const statusElement = document.getElementById('statusOrcamento');

    if (!nome || !email || !tel || !necessidade || !empresa || !segmento || !quantidade || !cidade) {
        statusElement.textContent = 'Por favor, preencha todos os campos obrigatórios.';
        statusElement.style.color = 'red';
        return;
    }

    // Configuração do EmailJS
    emailjs.init('NfSsVB7vSZ0UzJWtZ'); // Sua Chave Pública do EmailJS

    const templateParams = {
        nome: nome,
        email: email,
        telefone: tel,
        empresa: empresa,
        segmento: segmento,
        quantidade: quantidade,
        cidade: cidade,
        necessidade: necessidade
    };

    emailjs.send('service_966s1gw', 'template_poqrnzf', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            statusElement.textContent = 'Sua mensagem foi enviada com sucesso!';
            statusElement.style.color = 'green';
            this.reset(); // Limpa o formulário após o envio
        }.bind(this)) // bind(this) para manter o contexto do formulário
        .catch(function(error) {
            console.log('FAILED...', error);
            statusElement.textContent = 'Falha ao enviar a mensagem. Por favor, tente novamente.';
            statusElement.style.color = 'red';
        });
});

// Carousel functionality
const carouselContainer = document.querySelector('.carousel-container');
const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');
const carouselIndicatorsContainer = document.querySelector('.carousel-indicators');
let carouselIndicators = document.querySelectorAll('.carousel-indicator'); // Será reatribuído se criado dinamicamente

const visibleImages = 3; // Quantidade de imagens visíveis por vez
let counter = 0; // Contador de índice da primeira imagem no slide atual
let slideWidth = carouselContainer.offsetWidth; // Largura total do container do carrossel
let autoSlideInterval; // Variável para controlar o intervalo do slide automático

// Função para atualizar os indicadores de página
function updateIndicators() {
    // Remove a classe 'active' de todos os indicadores
    carouselIndicators.forEach(indicator => indicator.classList.remove('active'));
    // Calcula o índice do indicador ativo (baseado no conjunto de imagens visíveis)
    const activeIndex = Math.floor(counter / visibleImages);
    // Adiciona a classe 'active' ao indicador correspondente
    if (carouselIndicatorsContainer && carouselIndicatorsContainer.children.length > activeIndex) {
        carouselIndicatorsContainer.children[activeIndex]?.classList.add('active');
    }
}

// Função para ir para um slide específico
function goToSlide(slideIndex) {
    // Define o contador para o início do conjunto de imagens do slide selecionado
    counter = slideIndex * visibleImages;
    // Ajusta a posição do carrossel com base no novo contador e largura do slide
    carouselSlide.style.transform = `translateX(${-slideWidth * counter / visibleImages}px)`;
    updateIndicators(); // Atualiza o indicador ativo
    resetAutoSlide();   // Reinicia o slide automático
}

// Função para avançar para o próximo slide
function nextSlide() {
    // Verifica se chegou ao final das imagens. Se sim, volta para o início.
    if (counter >= carouselImages.length - visibleImages) {
        counter = 0;
    } else {
        counter += visibleImages; // Avança pelo número de imagens visíveis
    }
    // Ajusta a posição do carrossel
    carouselSlide.style.transform = `translateX(${-slideWidth * counter / visibleImages}px)`;
    updateIndicators(); // Atualiza o indicador ativo
}

// Função para voltar para o slide anterior
function prevSlide() {
    // Verifica se está no início. Se sim, vai para o último conjunto de imagens.
    if (counter <= 0) {
        counter = Math.floor((carouselImages.length - 1) / visibleImages) * visibleImages;
    } else {
        counter -= visibleImages; // Volta pelo número de imagens visíveis
    }
    // Ajusta a posição do carrossel
    carouselSlide.style.transform = `translateX(${-slideWidth * counter / visibleImages}px)`;
    updateIndicators(); // Atualiza o indicador ativo
}

// Inicia o slide automático
function autoSlide() {
    autoSlideInterval = setInterval(nextSlide, 3000); // Troca a cada 3 segundos
}

// Reinicia o slide automático (para quando o usuário interage)
function resetAutoSlide() {
    clearInterval(autoSlideInterval); // Limpa o intervalo existente
    autoSlide(); // Inicia um novo intervalo
}

// Cria indicadores dinamicamente se não estiverem no HTML ou adiciona listeners se já existirem
if (carouselIndicatorsContainer) {
    if (carouselIndicatorsContainer.children.length === 0 && carouselImages.length > 0) {
        const numberOfSlides = Math.ceil(carouselImages.length / visibleImages);
        for (let i = 0; i < numberOfSlides; i++) {
            const indicator = document.createElement('span');
            indicator.classList.add('carousel-indicator');
            indicator.setAttribute('data-slide', i);
            indicator.addEventListener('click', (event) => {
                const slideIndex = parseInt(event.target.getAttribute('data-slide'));
                goToSlide(slideIndex);
            });
            carouselIndicatorsContainer.appendChild(indicator);
        }
        // Reatribui carouselIndicators após a criação dinâmica
        carouselIndicators = document.querySelectorAll('.carousel-indicator');
        carouselIndicators[0]?.classList.add('active'); // Define o primeiro como ativo
    } else if (carouselImages.length > 0) {
        // Se os indicadores já existirem no HTML, apenas adiciona os listeners
        carouselIndicators.forEach(indicator => {
            indicator.addEventListener('click', (event) => {
                const slideIndex = parseInt(event.target.getAttribute('data-slide'));
                goToSlide(slideIndex);
            });
        });
        updateIndicators(); // Garante que o indicador inicial esteja ativo
    }
}


// Inicia o slide automático na carga da página, se houver imagens
if (carouselImages.length > 0) {
    autoSlide();
}

// Ajusta a largura do slide e a posição do carrossel ao redimensionar a janela
window.addEventListener('resize', () => {
    slideWidth = carouselContainer.offsetWidth; // Atualiza a largura do container
    carouselSlide.style.transform = `translateX(${-slideWidth * counter / visibleImages}px)`;
});