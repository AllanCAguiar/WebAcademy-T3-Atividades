const {
    firstName,
    verifyStockAvailability,
    calculateTotalPrice,
} = require("../utils/validations")

describe("firstName()", () => {
    it("Deve retornar apenas o primeiro nome", () => {
        const fullName = "Arthur Morgan";
        const result = firstName(fullName);
        expect(result).toBe("Arthur")
    });

    it("Deve retornar o mesmo nome quando não encontra espaços em branco", () => {
        const name = "Arthur";
        const result = firstName(name);
        expect(result).toBe(name)
    });

    it("Deve retornar o primeiro nome corretamente quando encontra espaço em branco no começo", () => {
        const fullName = " Arthur Morgan";
        const result = firstName(fullName);
        expect(result).toBe("Arthur")
    });

    it("Deve retornar o primeiro nome corretamente quando encontra espaço em branco no final", () => {
        const fullName = "Arthur Morgan ";
        const result = firstName(fullName);
        expect(result).toBe("Arthur")
    });

    it("Deve retornar o primeiro nome corretamente quando tiver mais de 2 nomes", () => {
        const fullName = "Arthur Morgan II";
        const result = firstName(fullName);
        expect(result).toBe("Arthur")
    });
});

describe("verifyStockAvailability()", () => {
    it("Deve retornar falso para um produto que não existe", () =>{
        const name = "bicycle"
        const result = verifyStockAvailability(name,)
        expect(result).toBeFalsy()
    });
    it("Deve retornar falso para um produto fora de estoque", () =>{
        const name = "book"
        const result = verifyStockAvailability(name, )
        expect(result).toBeFalsy()
    });
    it("Deve retornar verdadeiro para um produto que está no estoque", () =>{
        const name = "laptop"
        const result = verifyStockAvailability(name, )
        expect(result).toBeTruthy()
    });
});

describe("calculateTotalPrice()", () => {
    it("Deve retornar a soma dos preços dos produtos", () =>{
        const products = [
                 { name: 'Product 1', price: 10, quantity: 2 },
                 { name: 'Product 2', price: 20, quantity: 2 },
                 { name: 'Product 3', price: 30, quantity: 1 }
                ]
        let soma = 0
        for(let i = 0; i<products.length; i++){
            soma+=products[i].price
        }
        const result = calculateTotalPrice(products)
        expect(result).toBe(soma)
    });
});