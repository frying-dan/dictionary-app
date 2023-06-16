const url = `https://api.dictionaryapi.dev/api/v2/entries/en/`;
const result = document.querySelector(`.result`);
const sound = document.getElementById(`sound`);
const btn = document.getElementById(`search-btn`);


btn.addEventListener(`click`, () => {
    let inpWord = document.getElementById(`inp-word`).value;
    fetch(`${url}${inpWord}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        let example = '';
        for (let i = 0; i < data[0].meanings.length; i++) {
          const definitions = data[0].meanings[i].definitions;
          for (let j = 0; j < definitions.length; j++) {
            if (definitions[j].example) {
              example = definitions[j].example;
              break; // Exit the loop if an example is found
            }
            if (!data[0].meanings.length) {
                throw new Error('Word not found in the dictionary');
            }
          }
          if (example) {
            break; // Exit the outer loop if an example is found
          }
        }
        result.innerHTML = `
        <div class="word">
                <h3>${inpWord}</h3>
                <button onclick="playSound()">
                    <i class="fas fa-volume-up"></i>
                </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>/${data[0].phonetic}/</p>
            </div>
            <p class="word-meaning">
                ${data[0].meanings[0].definitions[0].definition}
            </p>
            <p class="word-example">
                ${example}
            </p>`;
            sound.setAttribute("src", data[0].phonetics[0].audio);
    })
    .catch((error) => {
        result.innerHTML = `<p class="error">${error.message}</p>`;
      });
});

function playSound() {
    sound.play();
}

