import { FavoritosProvider, useProdutoFavorito } from "@/app/State/FavoritosProvider";
import { render, screen } from "@testing-library/react";
import ItemFavorito from "../ItemFavorito";
import { calculaValorComPorcentagemDeDesconto } from "@/app/helpers";
import { mockProdutos } from "@/app/mocks/produtos";
import userEvent from "@testing-library/user-event";


jest.mock("../../../State/FavoritosProvider", () => ({
    ...jest.requireActual("../../../State/FavoritosProvider"),
    useProdutoFavorito: jest.fn(),
}));
  

describe("ItemFavorito", () =>{
    it("deve renderizar corretamente as informações de produto", () => {
        const useProdutoFavoritoMock = useProdutoFavorito as jest.Mock;
        useProdutoFavoritoMock.mockReturnValue(false);
    
        const produtoMockado = mockProdutos[0];
        const { nome, preco, fotos, desconto, descricao } = produtoMockado;
    
        const precoComDesconto = calculaValorComPorcentagemDeDesconto(
          Number(produtoMockado.preco),
          produtoMockado.desconto
        );
    
        render(
          <FavoritosProvider>
            <table>
                <tbody>
                    <ItemFavorito key={produtoMockado.id} itemFavorito={produtoMockado} setFavoritos={() => {}} />
                </tbody>
            </table>
          </FavoritosProvider>
        );

        expect(screen.getByAltText(fotos[0].titulo)).toBeInTheDocument();
        expect(screen.getByText(nome)).toBeInTheDocument();
        expect(screen.getByText(descricao)).toBeInTheDocument();
        expect(screen.getByText(`R$ ${precoComDesconto}.00`)).toBeInTheDocument();
        expect(screen.getByText(`${desconto}%`)).toBeInTheDocument();
    });

    it("deve ser possível clicar no botão Remover", async() => {
        const setFavoritos = jest.fn();
        const useProdutoFavoritoMock = useProdutoFavorito as jest.Mock;
        useProdutoFavoritoMock.mockReturnValue(false);
    
        const produtoMockado = mockProdutos[0];

        render(
          <FavoritosProvider>
            <table>
                <tbody>
                    <ItemFavorito key={produtoMockado.id} itemFavorito={produtoMockado} setFavoritos={setFavoritos} />
                </tbody>
            </table>
          </FavoritosProvider>
        );

        const botao = screen.getByRole("button", {
            name: /Remover/i
        });

        await userEvent.click(botao);

        expect(setFavoritos).toHaveBeenCalledTimes(1);

    });
})