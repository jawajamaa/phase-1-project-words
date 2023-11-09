document.addEventListener("DOMContentLoaded", () => {
    const baseUrl = "http://localhost:3000/";
    let wordId = "words";

    // /////////////////////////////////////////////////////////////////////
    // Global variables for rendering definitions
    let mainMiddle = document.getElementById("four");
    let mainRight = document.getElementById("five");
    let wordEntryCard = document.createElement("div");
    let word = document.createElement("h3");
    let partSpeech = document.createElement("p");
    let definition = document.createElement("p");
    let synonym = document.createElement("p");


    fetch(`${baseUrl}${wordId}`)
    .then(response=>{
        if (response.ok) {
            return results = response.json();
        } else {
            throw error(response.statusText);
        }
    }) .then (results =>{
        let wordsDb = results;
        console.log(wordsDb);
        renderSideBarWords(wordsDb);
        searchWord(wordsDb);
        compareBtnSwitch(wordsDb);
    })

    // //////////////////////////////////////////////////////////////////////
    // Head of Search

    function compareBtnSwitch(wordsDb) {
        let compareBtn = document.getElementById("compare-button");
        compareBtn.addEventListener("dblclick", ()=>{
            console.log("I was double clicked");
            let currentDef = (document.querySelector("#four").querySelector(".card"));
            mainRight.appendChild(currentDef);
        })  
    }

    function searchWord(wordsDb) {
        const searchForm = document.getElementById("word-search");
        let wordInput = document.getElementById("word-input");
        let selectOption = document.getElementById("select");
        searchForm.addEventListener("submit", (event)=>{
            event.preventDefault();
            console.log(wordsDb);
            let searchValue = wordInput.value;
            console.log(searchValue);
            let wordFound = wordsDb.find(singleWord=>singleWord.word === `${searchValue.toLowerCase()}`);
            console.log(wordFound);
            if (selectOption.value === "Definition") {
                console.log(selectOption.value);
                renderWordDef(wordFound);   
            } else if (selectOption.value === "Part of Speech") {
                console.log(selectOption.value);
                renderWordPartSpeech(wordFound); 
            } else if (selectOption.value === "Synonym(s)") {
                console.log(selectOption.value);
                renderSynonym(wordFound);
            } else {
                console.log(selectOption.value);
                renderCompleteWordDef(wordFound);
            }
            
    })
    }


    // //////////////////////////////////////////////////////////////////////
    // Render functions

    function renderSideBarWords(wordsDb) {
        let wordList = document.getElementById("word-list");
        wordsDb.forEach(wordEntry=>{
            let li = document.createElement("li");
            console.log(wordEntry);
            li.textContent = wordEntry.word;
            li.id = wordEntry.id;
            li.addEventListener("click", slctWordEntry=>{
                console.log("I was clicked");
                console.log(li.textContent);
                console.log(wordsDb);
                slctWordEntry = li;
                console.log(slctWordEntry);
                renderFullDefinition(slctWordEntry, wordsDb);
            })
            wordList.appendChild(li);
    })
    }

    function renderFullDefinition(slctWordEntry, wordsDb) {
        for (let i = 0; i <= wordsDb.length-1; i++) {
            if (slctWordEntry.id == wordsDb[i].id) {
                slctWordEntry = wordsDb[i];

                word.textContent = slctWordEntry.word;
                wordEntryCard.appendChild(word);
                
                partSpeech.textContent = `Part of speech: ${slctWordEntry.partOfSpeech}`;
                wordEntryCard.appendChild(partSpeech);
                
                definition.textContent = `Definition: ${slctWordEntry.definition}`;
                wordEntryCard.appendChild(definition);
                
                synonym.textContent = `Synonym(s): ${slctWordEntry.synonyms}`;
                wordEntryCard.appendChild(synonym);
                wordEntryCard.setAttribute("class", "card");
                mainMiddle.append(wordEntryCard);
        }    
    }
    }

    function renderWordDef(wordFound) {
        word.textContent = wordFound.word;
        wordEntryCard.appendChild(word);

        definition.textContent = `Definition: ${wordFound.definition}`;
        wordEntryCard.appendChild(definition);
        mainMiddle.append(wordEntryCard);
    }

    function renderWordPartSpeech(wordFound) {
        word.textContent = wordFound.word;
        wordEntryCard.appendChild(word);
        
        partSpeech.textContent = `Part of speech: ${wordFound.partOfSpeech}`;
        wordEntryCard.appendChild(partSpeech);
        wordEntryCard.setAttribute("class", "card");
        mainMiddle.append(wordEntryCard);
    }

    function renderSynonym(wordFound) {
        word.textContent = wordFound.word;
        wordEntryCard.appendChild(word);

        synonym.textContent = `Synonym(s): ${wordFound.synonyms}`;
        wordEntryCard.appendChild(synonym);
        wordEntryCard.setAttribute("class", "card");
        mainMiddle.append(wordEntryCard);
    }

    function renderCompleteWordDef(wordFound) {
        word.textContent = wordFound.word;
        wordEntryCard.appendChild(word);
        
        partSpeech.textContent = `Part of speech: ${wordFound.partOfSpeech}`;
        wordEntryCard.appendChild(partSpeech);
        
        definition.textContent = `Definition: ${wordFound.definition}`;
        wordEntryCard.appendChild(definition);
        
        synonym.textContent = `Synonym(s): ${wordFound.synonyms}`;
        wordEntryCard.appendChild(synonym);
        wordEntryCard.setAttribute("class", "card");
        mainMiddle.append(wordEntryCard);
    }

// End of DOM Content Loaded callback
})