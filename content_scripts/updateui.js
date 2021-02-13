browser.runtime.onMessage.addListener(updateUi);

function updateUi(request, sender, sendResponse){
    let pageTitle = document.querySelector('meta[property="og:title"]')
    if(pageTitle){
        let title = pageTitle.getAttribute("content");
        switch(title){
            case 'The Crew':
                updateForTheCrew(request);
                break;
        }
    }
}

function updateForTheCrew(cookieVals){
    let ensureButton = function(){
        let button = document.getElementById("btnBgaUiTheCrewCardCounter");
        if(button === null){
            addButton();
        } 
    }
    let addButton = function(){
        let logWrapper = document.getElementById('logs_wrap');
        let cardCountButton = document.createElement("button");
        cardCountButton.id = "btnBgaUiTheCrewCardCounter";
        cardCountButton.type = "button";
        cardCountButton.innerText = "Count Cards";
        cardCountButton.style="padding: 1ex;background: #e74742;color: white;font-style: oblique;"
        cardCountButton.addEventListener('click', function(){addCardCounterToLog();})
        logWrapper.prepend(cardCountButton);
    };
    let addCardCounterToLog = function(){
        let logContainer = document.getElementById('logs');
        
        let counts = getCardCounts(logContainer);
        let cardCountElement = generateLogEntry(counts.pinkCards, counts.blueCards, counts.greenCards, counts.yellowCards, counts.blackCards);

        logContainer.prepend(cardCountElement);
    };
    let getCardCounts = function (logContainer){
        let counts = {
            pinkCards: [],
            blueCards: [],
            greenCards: [],
            yellowCards: [],
            blackCards: []
        };
        let commanderAssignmentReached = false;
        for(let i = 0; i <logContainer.children.length && !commanderAssignmentReached; i++) {
            let log = logContainer.children[i];
            if(log.textContent.includes(" plays ")){
                let selectedCard = log.querySelector("strong");
                let denomination = selectedCard.innerText;
                let suit = selectedCard.classList[0];
                switch(suit){
                    case "pink": counts.pinkCards.push(denomination); break;
                    case "blue": counts.blueCards.push(denomination); break;
                    case "green": counts.greenCards.push(denomination); break;
                    case "yellow": counts.yellowCards.push(denomination); break;
                    case "black": counts.blackCards.push(denomination); break;                    
                }
            } else if(log.textContent.includes("is your new commander")){
                commanderAssignmentReached = true;
            }
        }
        counts.pinkCards.sort();
        counts.blueCards.sort();
        counts.greenCards.sort();
        counts.yellowCards.sort();
        counts.blackCards.sort();

        return counts;
    };

    let generateLogEntry = function(pinkCards, blueCards, greenCards, yellowCards, blackCards){
        let roundedBox = document.createElement("div");
        roundedBox.classList.add("roundedbox");
        
        let title = document.createElement("strong");
        title.innerText = "The following have been played this round:";
        roundedBox.append(title);
    
        roundedBox.append(document.createElement("br"));

        let pinkElements = generateCardList(pinkCards, "pink");
        for(let i = 0; i < pinkElements.length; i++){ roundedBox.append(pinkElements[i]);}
        
        let blueElements = generateCardList(blueCards, "blue");
        for(let i = 0; i < blueElements.length; i++){ roundedBox.append(blueElements[i]);}
        
        let greenElements = generateCardList(greenCards, "green");
        for(let i = 0; i < greenElements.length; i++){ roundedBox.append(greenElements[i]);}
        
        let yellowElements = generateCardList(yellowCards, "yellow");
        for(let i = 0; i < yellowElements.length; i++){ roundedBox.append(yellowElements[i]);}
        
        let blackElements = generateCardList(blackCards, "black");
        for(let i = 0; i < blackElements.length; i++){ roundedBox.append(blackElements[i]);}

        let logEntry = document.createElement("div");
        logEntry.classList.add("log");
        logEntry.style = "height: auto; display: block; color: rgb(0, 0, 0);";
        logEntry.append(roundedBox);
        return logEntry;
    };
    let generateCardList = function(numbers, color){
        let result = []
        if(numbers.length > 0){
            for(var i = 0; i < numbers.length; i++){
                let card = document.createElement("strong");
                card.classList.add(color);
                card.innerText = numbers[i];
                result.push(card);
            }
            let suit = document.createElement("span");
            suit.classList.add('logicon');
            suit.classList.add(color);
            suit.title = color;
            result.push(suit);
            result.push(document.createElement("br"));
        }
        return result;
    };
    ensureButton();
    let button = document.getElementById("btnBgaUiTheCrewCardCounter");
    if(cookieVals.theCrewCardCounter){
        addCardCounterToLog();
        button.style="padding: 1ex;background: #e74742;color: white;font-style: oblique;"
        console.log("making button visible");
    } else {
        button.style = "display:none;";
        console.log("making button invisible");
    }
}