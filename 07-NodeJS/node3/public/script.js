const form = document.getElementById("loremForm");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const numParagrafos = document.getElementById("numParagrafos").value;
    try{
        const response = await fetch(`/lorem?num=${numParagrafos}`);
        const data = await response.text();
        resultDiv.innerHTML = data;
    } 
    catch(error){
        console.error("Erro produzindo Lorem Ipsum:", error);
    }
});
