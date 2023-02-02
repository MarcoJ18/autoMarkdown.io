"use strict";
const readFile = document.getElementById('readFile');
const generate = document.getElementById('generate');

let createFile = ''; // Here add the all content of the file
let varLoop = []; // Count the content of the document
let idNum = []; // Count Number of elements
let lista = []; // Array of elements of the document content without #

let totalIMG = [];// Total number of images

//This function create a title

const crearTitulo = ()=>{
    let titulo = prompt('Titulo oficial');
    createFile += '# ' + titulo + '\n';
};


//Count total of img

const countIMG = ()=>{
    let img = prompt('¿Cuántas imagenes tienes?');
    for (let i = 0; i < Number(img); i++) {
        totalIMG.push(`![](img/${i+1}.png)` + '\n');
    }
};

//This function create a id for every link 

const id = text =>{
    for (let i of text) {
        let wihtOutSharp = i.replace(/#|_/g,'');
        let num = wihtOutSharp.slice(1,4);
        let withOutSpace = num.replace(' ','');
        idNum.push(Number(withOutSpace));
        
    }

}

// Loop of lista elements

const crearLista = text =>{
    for (let i of text) {
        lista.push(i);
    }
}

//This function create a list in markdown format

const addLista = () =>{
    
    for (let i = 0; i < idNum.length; i++) {
        let addHTML = '';
        if(lista[i].includes('##')){
            addHTML += `    - <a href='#id${idNum[i]}'>${lista[i].replace(/#|_/g,'')}</a>`;
        }else{
            addHTML += `- <a href='#id${idNum[i]}'>${lista[i].replace(/#|_/g,'')}</a>`;
        }  
        createFile += addHTML + '\n';
    }
    
}


const addIMG = (total) =>{
    let result = '';
    for (let i = 0; i < total; i++) {
        if (totalIMG.length == 0){
            break;
        }
        result += totalIMG.shift() + '\n';
    }
    return result;
    
}


//This function format the header of markdown files

const formatMD = () =>{
    countIMG();
    for (let i = 0; i < idNum.length; i++) {
        let addHTML = '';
        if(lista[i].includes('##')){

        }
        if (totalIMG.length > 0 ){
            let questionIMG = prompt(`¿Cuántas imagenes vas a añadir? en ${lista[i]} TOTAL de IMG: ${totalIMG.length}`);
            questionIMG = Number(questionIMG);  
            addHTML += `\n ${lista[i]}<a name='id${idNum[i]}'></a>` + '\n';
            addHTML += '\n' + addIMG(questionIMG);
        }else{
            addHTML += `\n ${lista[i]}<a name='id${idNum[i]}'></a>` + '\n';
        }
        createFile += addHTML + '\n';
    } 
    
}


// This function create a file named README.md whit all content


const downloadFile = () =>{
    generate.addEventListener('click',()=>{
        const link = document.createElement('a');
        const content = createFile;
        const file = new Blob([content], { type: 'text/plain' });
        link.href = URL.createObjectURL(file);
        link.download = "README.md";
        link.click();
        URL.revokeObjectURL(link.href);
    });
};

//This is called where initial all 

readFile.addEventListener('change',(e)=>{
    leerDocumento(readFile.files[0]);
    downloadFile();
})


const leerDocumento = ar =>{
    crearTitulo();
    const reader = new FileReader();
    reader.readAsText(ar);
    reader.addEventListener('load',(e)=>{
        let result = e.currentTarget.result;
        for (let i of result.split('\n')){
            if(i.startsWith('#') && !i.includes('#!/bin/sh') && !i.includes('#!/bin/bash')){
                varLoop.push(i);
                
            }
        }
        id(varLoop);
        crearLista(varLoop);
        addLista();
        formatMD();
        
    });
}


