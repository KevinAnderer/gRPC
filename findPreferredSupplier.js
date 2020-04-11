const client = require('./client')
var search = 'ProduktB'

client.findPreferredSupplier(search, (error, response) => {

    if(!error){
        if (response.name.length !== 0)
            console.log(`Preferred Supplier für ${search} gefunden: ${response.name}`);
        else console.log(`Für ${search} wurde keine Preferred Supplier gefunden`)
    }
    else{
        console.error(error);
    }
});

