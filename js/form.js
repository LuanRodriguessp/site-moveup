// --- FORMULÁRIO DE ORÇAMENTO ---
function initFormOrcamento() {
    const form = document.getElementById('formOrcamento');
    if (!form) return;
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        // Honeypot: bloqueia se o campo oculto estiver preenchido
        if (this.website && this.website.value) {
            document.getElementById('statusOrcamento').textContent = 'Envio bloqueado.';
            document.getElementById('statusOrcamento').style.color = 'red';
            return;
        }
        const nome = this.nome.value.trim();
        const email = this.email.value.trim();
        const tel = this.telefone.value.trim();
        const empresa = this.empresa.value.trim();
        const segmento = this.segmento.value.trim();
        const quantidade = this.quantidade.value.trim();
        const cidade = this.cidade.value.trim();
        const necessidade = this.necessidade.value.trim();
        const statusElement = document.getElementById('statusOrcamento');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const telRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;
        if (!nome || !email || !tel || !necessidade || !empresa || !segmento || !quantidade || !cidade) {
            statusElement.textContent = 'Por favor, preencha todos os campos obrigatórios.';
            statusElement.style.color = 'red';
            return;
        }
        if (!emailRegex.test(email)) {
            statusElement.textContent = 'Por favor, insira um e-mail válido.';
            statusElement.style.color = 'red';
            return;
        }
        if (!telRegex.test(tel)) {
            statusElement.textContent = 'Por favor, insira um telefone válido.';
            statusElement.style.color = 'red';
            return;
        }
        if (typeof grecaptcha !== 'undefined') {
            const recaptchaResponse = grecaptcha.getResponse();
            if (!recaptchaResponse) {
                statusElement.textContent = 'Por favor, confirme que você não é um robô.';
                statusElement.style.color = 'red';
                return;
            }
        }
        function sanitize(str) {
            return str.replace(/[<>"'`]/g, '');
        }
        const templateParams = {
            nome: sanitize(nome),
            email: sanitize(email),
            telefone: sanitize(tel),
            empresa: sanitize(empresa),
            segmento: sanitize(segmento),
            quantidade: sanitize(quantidade),
            cidade: sanitize(cidade),
            necessidade: sanitize(necessidade)
        };
        const lastSent = localStorage.getItem('lastOrcamentoSent');
        const now = Date.now();
        if (lastSent && now - lastSent < 60000) {
            statusElement.textContent = 'Aguarde um minuto antes de enviar novamente.';
            statusElement.style.color = 'red';
            return;
        }
        emailjs.init('NfSsVB7vSZ0UzJWtZ');
        emailjs.send('service_966s1gw', 'template_poqrnzf', templateParams)
            .then(function(response) {
                localStorage.setItem('lastOrcamentoSent', now);
                statusElement.textContent = 'Sua mensagem foi enviada com sucesso!';
                statusElement.style.color = 'green';
                this.reset();
            }.bind(this))
            .catch(function(error) {
                statusElement.textContent = 'Falha ao enviar a mensagem. Por favor, tente novamente.';
                statusElement.style.color = 'red';
            });
    });
}
