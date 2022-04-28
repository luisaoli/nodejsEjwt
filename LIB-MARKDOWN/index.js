import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

// console.log(chalk.blue('Vamos começar!'));

// const paragrafo = 'Texto retornado por uma função';

// function texto(string){
//     return string;
// }

// console.log(texto(paragrafo));

function extraiLinks(texto) {
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
    const arrayResultados = [];
    let temp;
    while((temp = regex.exec(texto)) !== null) {
        arrayResultados.push({ [temp[1]]: temp[2] })
    }
    return arrayResultados.length === 0 ? 'Não há links no arquivo' : arrayResultados;
}

function trataErro(erro) {
    throw new Error(chalk.red(erro.code, 'não há arquivo no caminho'));
}

// export default async function pegaArquivo(caminhoDoArquivo) {
//     const caminhoAbsoluto = path.join("__dirname", '..', caminhoDoArquivo)
//     const encoding = 'utf-8';
//     try {
//         const arquivos = await fs.promises.readdir(caminhoAbsoluto, {encoding});
//         const result = await Promise.all(arquivos.map( async (arquivo) => {
//             const localArquivo = `${caminhoAbsoluto}/${arquivo}`;
//             const texto = await fs.promises.readFile(localArquivo, encoding);
//             return extraiLinks(texto);
//         }))
//         return result;
//     } catch(erro) {
//         return trataErro(erro);
//     }
// }

export default async function pegaArquivo(caminhoDoArquivo) {
    const encoding = 'utf-8';
    try {
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
        return extraiLinks(texto);
    } catch (erro) {
        trataErro(erro);
    } finally {
        console.log(chalk.yellow('\n Operação concluída.'));
    }
}

// function pegaArquivo(caminhoDoArquivo){
//     const encoding = 'utf-8';
//     fs.promises
//     .readFile(caminhoDoArquivo, encoding)
//     .then ((texto) => console.log(chalk.green(texto)))
//     .catch ((erro) => trataErro(erro));
// }

// function pegaArquivo(caminhoDoArquivo){
//     const encoding = 'utf-8';
//     fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
//         if(erro){
//             trataErro(erro);
//         }
//         console.log(chalk.green(texto));
//     })
// }

//pegaArquivo('./arquivos/texto1.md');
