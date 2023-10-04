  const grid = document.querySelector('.grid');
  const spanPlayer = document.querySelector('.player');
  const timer = document.querySelector('.timer');
  const gameSong = new Audio();

  gameSong.src = '../audio/Kaikai Kitan.mp3';

  const characters = [
    'BESTOFRIEND',
    'Gojo',
    'Itadori',
    'Nobara',
    'Kento',
    'Maki',
    'Mahito',
    'Megumi',
    'Sukuna',
    'Yuta',
  ];

  const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
  }

  let firstCard= '';
  let secondCard = '';

  const checkEndGame = () =>{
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === 20) {
      clearInterval(this.loop);
      
      // Exibe um alerta personalizado
      const confirmation = confirm(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML}. Deseja reiniciar o jogo?`);
  
      if (confirmation) {
        // Se o jogador clicar em "OK", reinicia o jogo
        restartGame();
      } else {
        // Se o jogador clicar em "Cancelar", retorna à página index.html
        window.location.href = '../index.html';
      }
    }
  };

  gameSong.loop = true;
  gameSong.volume = 0.4;
  gameSong.play();
 
  const checkCards = () =>{
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter == secondCharacter) {

      firstCard.firstChild.classList.add('disabled-card');
      secondCard.firstChild.classList.add('disabled-card');
      firstCard = '';
      secondCard = '';

      checkEndGame();

    } else {
      setTimeout(()=>{
        firstCard.classList.remove('reveal-card');
        secondCard.classList.remove('reveal-card');

        firstCard = '';
        secondCard = '';
      }, 500); 
  }
}

  const revealCard = ({target}) => {

    if(target.parentNode.className.includes('reveal-card')){
      return;
    }

    if (firstCard == '') {
      target.parentNode.classList.add('reveal-card');
      firstCard = target.parentNode;

    } else if (secondCard == '') {

      target.parentNode.classList.add('reveal-card')
      secondCard = target.parentNode;

      checkCards();
    }
  }

  const createCard = (character) => {

  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../images/JUJUTSU\ CARDS/${character}.jpg')`;
    
  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character);

  return card;
}

const loadGame = () =>{

  const duplicateCharacters = [ ...characters, ...characters ];

  const shuffledArray = duplicateCharacters.sort(()=>Math.random() - 0.5 );
  
  shuffledArray.forEach((character)=>{
    
    const card = createCard(character);
    grid.appendChild(card)

  });
}
const startTimer = () => {

  this.loop = setInterval(() => {
  const currentTime = Number (timer.innerHTML);
  timer.innerHTML = currentTime + 1;
  }, 1000);

}

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();
}

const restartGame = () => {
  // Remove todas as cartas do tabuleiro
  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    grid.removeChild(card);
  });

  // Reinicializa as variáveis e inicia um novo jogo
  firstCard = '';
  secondCard = '';
  timer.innerHTML = '0';
  startTimer();
  loadGame();
};



// Adicione um evento de clique ao botão "Reiniciar"
const restartButton = document.getElementById('restart-button');
restartButton.addEventListener('click', restartGame);

