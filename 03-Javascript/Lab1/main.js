const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');


function randomValueFromArray(array){
    const random = Math.floor(Math.random()*array.length);
    return array[random];
}

let storyText = "It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Phoenix saw the whole thing, but was not surprised — :insertx: weighs 200 pounds, and it was a hot day."
let insertX = ["Edgeworth", "Maya", "Gumshoe"]
let insertY = ["courtroom", "Global Studios", "Big Berry Circus"]
let insertZ = ["falls of a cliff", "gets kidnapped", "gets charged for murder"]

randomize.addEventListener('click', result);

function result() {
    let newStory = storyText;
    if(document.getElementById("br").checked) {
        newStory = "Estava 94 graus lá fora, então :insertx: saiu para caminhar. Quando ele foi para :inserty:, ele olhou horrorizado por alguns momentos, então :insertz:. Fênix viu tudo, mas não estava surpreso — :insertx: pesa 200 pounds, e era um dia quente."
        const weight = Math.round(200*0.45359237)+" quilos";
        insertX = ["Spada", "Alice", "Gaspar"]
        insertY = ["Tribunal", "Estúdios Global", "Circo Lossal"]
        insertZ = ["cai de um penhasco", "é sequestrado", "é acusado de homicédio"]
        newStory = newStory.replaceAll("200 pounds", weight);
        const temperature =  Math.round((94-32)/1.79999999);
        newStory = newStory.replaceAll("94", temperature);
        
    }
    else{
        storyText = "It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Phoenix saw the whole thing, but was not surprised — :insertx: weighs 200 pounds, and it was a hot day."
        insertX = ["Edgeworth", "Maya", "Gumshoe"]
        insertY = ["courtroom", "Global Studios", "Big Berry Circus"]
        insertZ = ["falls of a cliff", "gets kidnapped", "gets charged for murder"]
    }
    let xItem = randomValueFromArray(insertX);
    let yItem = randomValueFromArray(insertY);
    let zItem = randomValueFromArray(insertZ);
    newStory = newStory.replaceAll(":insertx:", xItem);
    newStory = newStory.replaceAll(":inserty:", yItem);
    newStory = newStory.replaceAll(":insertz:", zItem);
    if(customName.value !== '') {
        const name = customName.value;
        newStory = newStory.replaceAll("Phoenix", name);
        newStory = newStory.replaceAll("Fênix", name);
    }
    story.textContent = newStory;
    story.style.visibility = 'visible';
    
}

