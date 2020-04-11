const client = require('./client')

client.findAllPreferredSuppliers({}, (error, response) => {

    if(!error){
        console.log('Alle PreferredSupplier: ');
        console.log(response.supplier);
        response.supplier.forEach( element => { console.log(`Prefferd Supplier ist: ${element.name} mit ID ${element.id}`)})
    }
    else{
        console.error(error);
    }
});

