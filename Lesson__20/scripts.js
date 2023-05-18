window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let language = document.getElementById('langs');
 language.onchange = (event) => {
     recognition.lang = language.value;
 }

 recognition.lang = language.value;


let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join()

        p.textContent = transcript;
        if (e.results[0].isFinal) {
            p = document.createElement('p');
            words.appendChild(p);
        }
        if (transcript.includes('hello world')) {
            console.log('Welcome to JS!');
        }
});

recognition.addEventListener('end', recognition.start);

recognition.start();

recognition.lang = language.value;