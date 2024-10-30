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

function mostrarProducte(producte) {
    console.log('Mostrar Producte)
}

function mostrarProductes(productes) {
    productes.forEach(producte => { 
        mostrarProducte(producte);
    });
}

function mostrarProducteID(productes, id) {
    const producte = productes.find(producte => producte.id === id);
}