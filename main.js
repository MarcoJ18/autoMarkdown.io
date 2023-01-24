"use strict";
//const readFile = document.getElementById('readFile');
const generate = document.getElementById('generate');
const md = document.getElementById('md');
const textarea = document.getElementById('textarea');

let createFile = ''; // Here add the all content of the file
let count = 0; // Count num of img 
let varLoop = []; // Count the content of the document
let idNum = [];

//This function create a title

const crearTitulo = ()=>{
    let titulo = prompt('Titulo oficial');
    createFile += '# ' + titulo + '\n';
};

//This function create a id for every link 

const numId = text =>{
    for (let i of text) {
        let wihtOutSharp = i.replace(/#|_/g,'');
        let num = wihtOutSharp.slice(1,4);
        let withOutSpace = num.replace(' ','');
        idNum.push(Number(withOutSpace));
        
    }

}


//This function create a list in markdown format

const crearLista = text =>{
   //let addHTML = `- <a href='id${withOutSpace}'>${replace}</a>`;
   //createFile += addHTML + '\n';
}

//This function format the header of markdown files

const formatMD = text =>{
    //console.log(`${text} <a name="id"></a>`);
    //createFile += `${text} <a name="id"></a>` + '\n';  
    
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

readFile.addEventListener('change',()=>{
    //crearTitulo();
    const reader = new FileReader();
    reader.addEventListener('load',(e)=>{
        let result = e.target.result;
        for (let i of result.split('\n')){
            if(i.startsWith('#') && !i.includes('#!/bin/sh') && !i.includes('#!/bin/bash')){
                varLoop.push(i);
                
            }
        }
        numId(varLoop);
        crearLista(varLoop);
        formatMD(varLoop);
    })
    reader.readAsText(readFile.files[0]);
    downloadFile();
})


