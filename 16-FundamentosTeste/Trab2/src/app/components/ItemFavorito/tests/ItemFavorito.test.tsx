import { FavoritosProvider, useProdutoFavorito } from "@/app/State/FavoritosProvider";
import { render } from "@testing-library/react";
import ItemFavorito from "../ItemFavorito";


jest.mock("../../../State/FavoritosProvider", () => ({
    ...jest.requireActual("../../../State/FavoritosProvider"),
    useProdutoFavorito: jest.fn(),
}));
  

describe("ItemFavorito", () =>{
    it("", () => {
       
    });
})