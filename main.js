"use strict";
//const readFile = document.getElementById('readFile');
const generate = document.getElementById('generate');
const md = document.getElementById('md');
const textarea = document.getElementById('textarea');

let createFile = '';

const crearTitulo = ()=>{
    let titulo = prompt('Titulo oficial');
    createFile += '# ' + titulo + '\n';
};

const numId = text =>{
    let replace = text.replace(/#|_/g,'');
    let num = replace.slice(1,4);
    let withOutSpace = num.replace(' ','');
}


const crearLista = text =>{
   let addHTML = `- <a href='id${withOutSpace}'>${replace}</a>`;
   createFile += addHTML + '\n';
}

const formatMD = text =>{
    createFile += `${text} <a name="id"></a>` + '\n';
}



let count = 0;


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

readFile.addEventListener('change',()=>{
    crearTitulo();
    const reader = new FileReader();
    reader.addEventListener('load',(e)=>{
        let result = e.target.result;
        for (let i of result.split('\n')){
            if(i.startsWith('#') && !i.includes('#!/bin/sh') && !i.includes('#!/bin/bash')){
                formatMD(i);
                
            }
        }
    })
    reader.readAsText(readFile.files[0]);
    downloadFile();
})
