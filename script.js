// Contador regressivo
function updateCountdown() {
    const now = new Date().getTime();
    const endTime = now + (24 * 60 * 60 * 1000); // 24 horas

    function calculate() {
        const currentTime = new Date().getTime();
        const distance = endTime - currentTime;

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(interval);
            document.querySelector('.countdown-wrapper').innerHTML = '<h3>Oferta Encerrada!</h3>';
        }
    }

    calculate();
    const interval = setInterval(calculate, 1000);
}

// Atualiza o número de vagas disponíveis aleatoriamente
function updateSpots() {
    const spotsElement = document.querySelector('.spots-number');
    const currentSpots = parseInt(spotsElement.textContent);
    
    if (currentSpots > 1) {
        const interval = setInterval(() => {
            const random = Math.random();
            if (random < 0.3 && currentSpots > 1) { // 30% de chance de diminuir
                spotsElement.textContent = (parseInt(spotsElement.textContent) - 1).toString();
            }
        }, 30000); // Verifica a cada 30 segundos
    }
}

// Formulário de Captura
function validateForm() {
    const form = document.getElementById('leadForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    let isValid = true;

    // Validação do Nome
    if (nameInput.value.trim().length < 3) {
        showError(nameInput, 'Por favor, insira seu nome completo');
        isValid = false;
    } else {
        clearError(nameInput);
    }

    // Validação do Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        showError(emailInput, 'Por favor, insira um e-mail válido');
        isValid = false;
    } else {
        clearError(emailInput);
    }

    return isValid;
}

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorDisplay = formGroup.querySelector('.error-message');
    formGroup.classList.add('error');
    errorDisplay.textContent = message;
}

function clearError(input) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.remove('error');
    const errorDisplay = formGroup.querySelector('.error-message');
    errorDisplay.textContent = '';
}

function showSuccessMessage() {
    const form = document.getElementById('leadForm');
    const successMessage = document.getElementById('successMessage');
    
    form.style.display = 'none';
    successMessage.style.display = 'block';
}

// Manipulação do envio do formulário
document.getElementById('leadForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!validateForm()) return;

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value
    };

    try {
        // Aqui você pode adicionar a lógica para enviar os dados para seu servidor
        // Exemplo de envio para um endpoint:
        /*
        const response = await fetch('seu-endpoint/api/leads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) throw new Error('Erro ao enviar dados');
        */

        // Simulando um delay de envio
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        showSuccessMessage();
        
        // Opcional: Enviar dados para o e-mail usando um serviço de e-mail
        // Você precisará implementar esta funcionalidade no seu backend
        
    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao enviar seus dados. Por favor, tente novamente.');
    }
});

// Limpar erros quando o usuário começa a digitar
document.querySelectorAll('.form-group input').forEach(input => {
    input.addEventListener('input', () => clearError(input));
});

// Inicia as funções quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    updateCountdown();
    updateSpots();
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Smooth scroll para o formulário
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Teste de responsividade
function checkResponsiveness() {
    const width = window.innerWidth;
    console.log(`Viewport width: ${width}px`);
    
    // Log elementos importantes para verificação
    console.log('Verificando elementos críticos...');
    
    const hero = document.querySelector('.hero');
    const benefits = document.querySelector('.benefits');
    const testimonials = document.querySelector('.testimonials');
    const form = document.querySelector('.lead-form');
    
    [hero, benefits, testimonials, form].forEach(section => {
        if (section) {
            const styles = window.getComputedStyle(section);
            console.log(`${section.className} padding: ${styles.padding}`);
            console.log(`${section.className} width: ${styles.width}`);
        }
    });
}

// Teste do formulário
function testForm() {
    const form = document.getElementById('leadForm');
    
    if (form) {
        // Monitora todos os campos do formulário
        const formInputs = form.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                console.log(`Campo ${input.name}: ${input.value}`);
                validateField(input);
            });
        });
    }
}

function validateField(input) {
    const formGroup = input.closest('.form-group');
    let isValid = true;
    let errorMessage = '';

    switch(input.type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                isValid = false;
                errorMessage = 'Por favor, insira um e-mail válido';
            }
            break;
            
        case 'text':
            if (input.value.trim().length < 3) {
                isValid = false;
                errorMessage = 'Por favor, insira pelo menos 3 caracteres';
            }
            break;
    }

    if (!isValid) {
        formGroup.classList.add('error');
        const errorDisplay = formGroup.querySelector('.error-message');
        if (errorDisplay) {
            errorDisplay.textContent = errorMessage;
            errorDisplay.style.display = 'block';
        }
    } else {
        formGroup.classList.remove('error');
        const errorDisplay = formGroup.querySelector('.error-message');
        if (errorDisplay) {
            errorDisplay.style.display = 'none';
        }
    }

    return isValid;
}

// Teste de carregamento da página
window.addEventListener('load', function() {
    console.log('Página carregada completamente');
    checkResponsiveness();
    testForm();
});

// Teste de redimensionamento
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        console.log('Janela redimensionada');
        checkResponsiveness();
    }, 250);
});

// Teste de botões CTA
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        console.log('Botão CTA clicado');
        const targetId = this.getAttribute('href');
        console.log(`Redirecionando para: ${targetId}`);
    });
});

// Animated Background
function createParticles() {
    const particlesContainer = document.querySelector('.particles-container');
    const numberOfParticles = 50;

    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        // Posição aleatória
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Tamanho aleatório
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Opacidade aleatória
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        // Atraso na animação
        particle.style.animationDelay = `${Math.random() * 4}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Background Light Effect
function createLightEffect() {
    const hero = document.querySelector('.hero');
    let mouseX = 0;
    let mouseY = 0;

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;

        // Atualiza a posição do gradiente radial
        hero.style.setProperty('--mouse-x', `${mouseX}px`);
        hero.style.setProperty('--mouse-y', `${mouseY}px`);
    });
}

// Inicializa os efeitos quando a página carregar
window.addEventListener('load', () => {
    createParticles();
    createLightEffect();
});

// Live Views Counter
function updateViewerCount() {
    const viewerCount = document.getElementById('viewerCount');
    let baseCount = 90;
    
    function getRandomChange() {
        return Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
    }
    
    function updateCount() {
        const change = getRandomChange();
        const newCount = Math.max(85, Math.min(95, baseCount + change));
        baseCount = newCount;
        
        // Animate the number change
        viewerCount.style.transform = 'scale(1.1)';
        viewerCount.style.color = change > 0 ? '#ffc371' : '#ff4d4d';
        
        setTimeout(() => {
            viewerCount.textContent = newCount;
            viewerCount.style.transform = 'scale(1)';
            viewerCount.style.color = '#ffc371';
        }, 200);
    }
    
    // Update every 3-7 seconds
    setInterval(() => {
        updateCount();
    }, Math.random() * 4000 + 3000);
}

// Initialize live views counter when page loads
document.addEventListener('DOMContentLoaded', () => {
    updateViewerCount();
});

// Countdown Timer
function startOfferCountdown() {
    const minutesElement = document.querySelector('.countdown-block .minutes');
    const secondsElement = document.querySelector('.countdown-block .seconds');
    
    let duration = 15 * 60; // 15 minutes in seconds
    
    function updateDisplay(timeLeft) {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
        
        // Add urgency classes when time is running low
        if (timeLeft <= 300) { // Last 5 minutes
            minutesElement.style.color = '#ff4d4d';
            secondsElement.style.color = '#ff4d4d';
            document.querySelector('.countdown-wrapper').style.borderColor = '#ff4d4d';
        }
        
        if (timeLeft <= 60) { // Last minute
            minutesElement.style.animation = 'pulse 0.5s infinite';
            secondsElement.style.animation = 'pulse 0.5s infinite';
        }
    }
    
    function countdown() {
        if (duration <= 0) {
            clearInterval(timer);
            document.querySelector('.countdown-wrapper').style.display = 'none';
            return;
        }
        
        updateDisplay(duration);
        duration--;
    }
    
    // Initial display
    updateDisplay(duration);
    
    // Update every second
    const timer = setInterval(countdown, 1000);
}

// Initialize countdown when page loads
document.addEventListener('DOMContentLoaded', () => {
    startOfferCountdown();
});

// Animação de Progresso
function animateProgress() {
    const progress = document.querySelector('.progress');
    let width = 15;
    
    setInterval(() => {
        if (width > 13) {
            width -= 0.1;
            progress.style.width = width + '%';
        }
    }, 10000); // Atualiza a cada 10 segundos
}

document.addEventListener('DOMContentLoaded', () => {
    animateProgress();
});
