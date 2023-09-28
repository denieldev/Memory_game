const input = document.querySelector('.login_input');
const button = document.querySelector('.login_button');
const form = document.querySelector('.login-form')
const somDe_Fundo = new Audio();

somDe_Fundo.src = './audio/gametheme.mp3';


const validateInput = ({ target}) => {
if (target.value.length>2) {
  button.removeAttribute('disabled');
  return;
} 
  button.setAttribute('disabled', '');
}

const handleSubmit = (event) => {
  event.preventDefault();
  
  localStorage.setItem('player', input.value);
  window.location = 'pages/game.html';
}

somDe_Fundo.loop = true;
somDe_Fundo.volume = 0.4;
somDe_Fundo.play();


input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);

