import fetch from "node-fetch";
//const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

function manejaErros(erro){
    throw new Error(erro.message);
}

async function checaStatus(arrayDeURLs) {
    try {
        const arrayDeStatus = await Promise
            .all(arrayDeURLs
                .map(async url => {
                    const res = await fetch(url);
                    return `${res.status} - ${res.statusText}`;
        }));
        return arrayDeStatus;
    } catch(erro) {
        manejaErros(erro);
    }
}

function geraArrayDeLinks(arrayDeLinks) {
    return arrayDeLinks
        .map(objetoLink => Object
            .values(objetoLink).join())
}

export default async function validaURLs(arrayDeLinks){
    const links = geraArrayDeLinks(arrayDeLinks);
    const statusLinks = await checaStatus(links);
    
    const resultados = arrayDeLinks.map((objeto, indice) => ({ ...objeto, status: statusLinks[indice] }) )

    return resultados;
}
