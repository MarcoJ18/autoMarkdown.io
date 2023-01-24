"use strict";
const readFile = document.getElementById('readFile');
const generate = document.getElementById('generate');
const md = document.getElementById('md');
const textarea = document.getElementById('textarea');
const img = document.getElementById('img');

let createFile = ''; // Here add the all content of the file
let count = 0; // Count num of img 
let varLoop = []; // Count the content of the document
let idNum = []; // Count Number of elements
let lista = []; // Array of elements of the document content without #
let markdown = []; //Arrry of markdown elements with #

//This function create a title

const crearTitulo = ()=>{
    let titulo = prompt('Titulo oficial');
    createFile += '# ' + titulo + '\n';
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
        let wihtOutSharp = i.replace(/#|_/g,'');
        lista.push(wihtOutSharp);
    }
}

//This function create a list in markdown format

const addLista = () =>{
    for (let i = 0; i < idNum.length; i++) {
        let addHTML = `- <a href='id${idNum[i]}'>${lista[i]}</a>`;   
        createFile += addHTML + '\n';
    }
    
}

//Add hr




// Loop of markdown elements

const crearMDFormat = text =>{
    for (let i of text) {
        markdown.push(i);
    }
}


//Count total of img

const countIMG = ()=>{
    let img = prompt('¿Cuántas imagenes tienes?');
    for (let i = 0; i < Number(img); i++) {
        createFile += `![]/img${i}.png` + '\n';
    }
};



//This function format the header of markdown files

const formatMD = () =>{
    for (let i = 0; i < idNum.length; i++) {
        let addHTML = `${markdown[i]}<a href='id${idNum[i]}'></a>`;   
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
        crearMDFormat(varLoop);
        formatMD();
        countIMG();
    });
}


