const client = require('./client')
const UnknownSupplierException = require('./Error')
const UnknownProductException = require('./Error')

const pName = "Produkt"
const sName = "SupplierA"

const noSupplier = new UnknownSupplierException(`Es wurde kein Supplier "${sName}" gefunden`)
const noProduct = new UnknownProductException(`Es wurde kein Produkt "${pName}" gefunden`)


client.setPreferredSupplierForProduct({pName, sName}, (error, response) => {

    if(!error)
       console.log(`Dem Produkt "${pName}" wurde erfolgreich der Preferred Supplier "${sName}" hinzugefügt`)
    else if (error.details.includes('Produkt')){
        
        console.error(error)
        console.error(noProduct)        
    }
    else if (error.details.includes('Supplier')){

        console.error(error)
        console.error(noSupplier)
    }
    
});
