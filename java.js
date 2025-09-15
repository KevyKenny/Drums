// Enhanced Drum Kit JavaScript with modern features

// Initialize the drum kit
document.addEventListener('DOMContentLoaded', function() {
    initializeDrumKit();
});

function initializeDrumKit() {
    const drums = document.querySelectorAll('.drum');
    
    // Add click event listeners
    drums.forEach(drum => {
        drum.addEventListener('click', function() {
            const key = this.getAttribute('data-key');
            playDrum(key);
            animateButton(this);
        });
    });

    // Add keyboard event listeners
    document.addEventListener('keydown', function(event) {
        const key = event.key.toLowerCase();
        const drumElement = document.querySelector(`[data-key="${key}"]`);
        
        if (drumElement) {
            playDrum(key);
            animateButton(drumElement);
        }
    });

    // Add touch support for mobile
    drums.forEach(drum => {
        drum.addEventListener('touchstart', function(e) {
            e.preventDefault();
            const key = this.getAttribute('data-key');
            playDrum(key);
            animateButton(this);
        });
    });
}

function playDrum(key) {
    const audioMap = {
        'w': 'sounds/tom-1.mp3',
        'a': 'sounds/kick-bass.mp3',
        'd': 'sounds/snare.mp3',
        'k': 'sounds/tom-2.mp3',
        'n': 'sounds/tom-3.mp3',
        'm': 'sounds/crash.mp3'
    };

    const audioFile = audioMap[key];
    if (audioFile) {
        const audio = new Audio(audioFile);
        audio.volume = 0.7; // Set a comfortable volume
        audio.play().catch(error => {
            console.log('Audio play failed:', error);
        });
    }
}

function animateButton(element) {
    // Remove any existing animation class
    element.classList.remove('pressed');
    
    // Force reflow to ensure the class removal is processed
    element.offsetHeight;
    
    // Add the animation class
    element.classList.add('pressed');
    
    // Remove the class after animation completes
    setTimeout(() => {
        element.classList.remove('pressed');
    }, 200);
}

// Add visual feedback for active keys
document.addEventListener('keydown', function(event) {
    const key = event.key.toLowerCase();
    const drumElement = document.querySelector(`[data-key="${key}"]`);
    
    if (drumElement) {
        drumElement.style.transform = 'translateY(-5px) scale(0.95)';
    }
});

document.addEventListener('keyup', function(event) {
    const key = event.key.toLowerCase();
    const drumElement = document.querySelector(`[data-key="${key}"]`);
    
    if (drumElement) {
        drumElement.style.transform = '';
    }
});

// Add some fun particle effects (optional enhancement)
function createParticleEffect(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = '#f39c12';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        
        document.body.appendChild(particle);
        
        const angle = (i * 60) * (Math.PI / 180);
        const velocity = 50;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${vx}px, ${vy}px) scale(0)`, opacity: 0 }
        ], {
            duration: 500,
            easing: 'ease-out'
        }).onfinish = () => {
            document.body.removeChild(particle);
        };
    }
}

// Enhanced button animation with particle effect
function animateButton(element) {
    // Remove any existing animation class
    element.classList.remove('pressed');
    
    // Force reflow to ensure the class removal is processed
    element.offsetHeight;
    
    // Add the animation class
    element.classList.add('pressed');
    
    // Create particle effect
    createParticleEffect(element);
    
    // Remove the class after animation completes
    setTimeout(() => {
        element.classList.remove('pressed');
    }, 200);
}