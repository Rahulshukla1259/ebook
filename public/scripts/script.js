const page = document.getElementById('page');
const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');



// मेरे पापा के ही तरह बहुत सारे लोग हैं जिन्हें लगता है कि ऑनलाइन काम करके कोई stable पैसा नहीं कमाया जा सकता है।



// document.addEventListener("touchcancel")






const ebookContent = [
     "This is page 1 of the e-book." ,
    "This is page 2 of the e-book.",
    "This is page 3 of the e-book.",
    // Add more pages here
];

let currentPage = 0;

const synth = window.speechSynthesis;
let speaking = false;

const speakButton = document.getElementById('speak-button');
const stopButton = document.getElementById('stop-button');

let startTime;
let endTime;



axios.post("/page").then(res=>{

 
    function displayPage(pageNumber) {
        if (pageNumber >= 0 && pageNumber < res.data.length) {
            page.textContent = res.data[pageNumber].page;
        }
    
        speakButton.addEventListener('click', () => {
            if (!speaking) {
                const text = page.textContent;
                if (text !== '') {
                    const utterance = new SpeechSynthesisUtterance(text);
                    //utterance.lang = 'hi-IN';
                    utterance.rate = 0.7
                    startTime=Date.now()
                    synth.speak(utterance);
                    speaking = true;
                    console.log("first");
                    
        
                    utterance.onend = () => {
                        speaking = false;
    
                        endTime=Date.now()
    
                        console.log((endTime-startTime)/1000);
                        
                    };
                }
            }
        });
        
        stopButton.addEventListener('click', () => {
            if (speaking) {
                synth.cancel();
                speaking = false;
            }
        });
        
    }
    
    displayPage(currentPage);
    
    prevPageButton.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            displayPage(currentPage);
            if(speaking){
             synth.cancel();

             speaking=false

            }
            
        }
    
    
    });
    
    nextPageButton.addEventListener('click', () => {
        if (currentPage < res.data.length - 1) {
            currentPage++;
            displayPage(currentPage);

            if(speaking){
                synth.cancel();
   
                speaking=false
   
               }
        
        }
    
    
    });
    
    
})








