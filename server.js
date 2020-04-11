const grpc = require('grpc');
const todoproto = grpc.load('todo.proto')
const server = new grpc.Server()


const supplierDB = './supplier_db.json'
const productDB = './product_db.json'
var fs = require('fs');
const UnknownSupplierException = require('./Error')

let productList = [];

fs.readFile(productDB, 
function(err, data) {

    if(err) throw err;

    productList = JSON.parse(data);
    
});

fs.readFile(supplierDB, 
function(err, data) {

    if(err) throw err;

    supplierList = JSON.parse(data);
    
});


server.addService(todoproto.TodoService.service, {

    findAllPreferredSuppliers : (_, callback) => { 

        let Supplier = [];
        productList.forEach( element => {

         if (!element.preferred.name == "")
            Supplier.push(element.preferred)
       })
        callback(null,  Supplier)
    },
    findPreferredSupplier : (call, callback) => { 

        let supplier = "";

        productList.forEach( element => {

            if (element.name === call.request.name){
                supplier = element.preferred.name
            }   
        })
        callback(null, supplier)
    },
    setPreferredSupplierForProduct : (call, callback) => {

        let supplier = supplierList.find((s) => s.name === call.request.sName);

        if (supplier === undefined){

            console.log('Fehlerhafter Supplier: Datensatz wurde nicht verändert!');
            callback ({
                code : grpc.status.NOT_FOUND,
                details : "Kein Supplier gefunden",
            })
            return;
        }

        let product = productList.find((p) => p.name === call.request.pName);

        if(product !== undefined) {

            productList.forEach( element => {

                if (element.name === call.request.pName){
                        
                    element.preferred.name = call.request.sName
                    element.preferred.id = supplier.id
                }   
            })

        fs.writeFile(productDB, JSON.stringify(productList, '', 1), function (err) {

            if (err) throw err;

            console.log('Datensatz wurde verändert!');
                
        });
  
            callback(null, {})
        }
        else {

            console.log('Fehlerhaftes Produkt: Datensatz wurde nicht verändert!');
            callback({
                code : grpc.status.NOT_FOUND,
                details : "Kein Produkt gefunden",
            })        
        }
    }
})


server.bind('127.0.0.1:50051',
grpc.ServerCredentials.createInsecure())
console.log('Server läuft unter http://127.0.0.1:50051')
server.start()