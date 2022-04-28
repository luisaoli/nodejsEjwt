//import pegaArquivo from "../index.js";
const { it, expect } = require('@jest/globals');
const { describe } = require('yargs');
const pegaArquivo = require('../index'); //nao funcionou porque o jest nao aceita importacao pelo modelo novo

const arrayResult = [
    {
        FileList: 'https://developer.mozilla.org/pt-BR/docs/Web/API/FileList'
    }
]

describe('pegaArquivo', () => {
    it('deve ser uma função', () => {
        expect(typeof pegaArquivo).toBe('function');
    })
    it('deve retornar array com resultados', async () => {
        const resultado = await pegaArquivo('/Users/luisa/OneDrive/Documentos/Tecnologia/Alura/JavaScript/node.js/LIB-MARKDOWN/test/arquivos/texto1.md');
        expect(resultado).toEqual(arrayResult)
    })
    it('deve retornar mensagem "não há links"', async () => {
        const resultado = await pegaArquivo('/Users/luisa/OneDrive/Documentos/Tecnologia/Alura/JavaScript/node.js/LIB-MARKDOWN/test/arquivos/texto1_semLinks.md')
        expect(resultado).toBe('não há links');
    })
});

// test('deve ser uma função', () => {
//     expect(typeof pegaArquivo).toBe('function');
// });
