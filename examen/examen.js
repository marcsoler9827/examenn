const fs = require('fs');

const products = JSON.parse(fs.readFileSync('productes.json', 'utf8'));

function llegirProductes() {
    try {
        const data = fs.readFileSync('productes.json', 'utf8');
        return JSON.parse(data); 
    } catch (error) {
        console.error('Error llegint productes.json:', error.message);
        return [];
    }
        
    }

function mostrarProducte(producte)

function mostrarProductes(productes)

function mostrarProducteID(producte, id)