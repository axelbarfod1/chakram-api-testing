var chakram = require('chakram');
     expect = chakram.expect;
config = require('../data/config.json');
schemaAttr = require('../schemas/attrJsonSchema.json')

var schemaTest = {

    "type": "array",
    "items": {
      "$id": "http://example.com/example.json/items",
      "type": "object",
      "properties": {
        "id": {
          "$id": "http://example.com/example.json/items/properties/id",
          "type": "string",
          "title": "The Id Schema ",
          "default": "",
          "examples": [
            "MLB-CONSOLE_ACCESORIES"
          ]
        },
        "name": {
          "$id": "http://example.com/example.json/items/properties/name",
          "type": "string",
          "title": "The Name Schema ",
          "default": "",
          "examples": [
            "Acessórios para consoles"
          ]
        },
        "multisite_catalog": {
          "$id": "http://example.com/example.json/items/properties/multisite_catalog",
          "type": "boolean",
          "title": "The Multisite_catalog Schema ",
          "default": false,
          "examples": [
            true
          ]
        },
        "is_generic": {
          "$id": "http://example.com/example.json/items/properties/is_generic",
          "type": "boolean",
          "title": "The Is_generic Schema ",
          "default": false,
          "examples": [
            false
          ]
        },
        "checked_categories": {
          "$id": "http://example.com/example.json/items/properties/checked_categories",
          "type": "boolean",
          "title": "The Checked_categories Schema ",
          "default": false,
          "examples": [
            false
          ]
        },
        "catalogable": {
          "$id": "http://example.com/example.json/items/properties/catalogable",
          "type": "string",
          "title": "The Catalogable Schema ",
          "default": "",
          "examples": [
            "NOT_DEFINED"
          ]
        },
        "date_created": {
          "$id": "http://example.com/example.json/items/properties/date_created",
          "type": "string",
          "title": "The Date_created Schema ",
          "default": "",
          "examples": [
            "2014-06-09T22:46:01Z"
          ]
        },
        "domain_structure_last_updated": {
          "$id": "http://example.com/example.json/items/properties/domain_structure_last_updated",
          "type": "string",
          "title": "The Domain_structure_last_updated Schema ",
          "default": "",
          "examples": [
            "2018-07-31T21:12:31Z"
          ]
        },
        "apd_last_updated": {
          "$id": "http://example.com/example.json/items/properties/apd_last_updated",
          "type": "string",
          "title": "The Apd_last_updated Schema ",
          "default": "",
          "examples": [
            "2018-07-12T21:10:30Z"
          ]
        },
        "products_last_updated": {
          "$id": "http://example.com/example.json/items/properties/products_last_updated",
          "type": "string",
          "title": "The Products_last_updated Schema ",
          "default": "",
          "examples": [
            "2018-07-29T17:15:19Z"
          ]
        },
        "last_updated": {
          "$id": "http://example.com/example.json/items/properties/last_updated",
          "type": "string",
          "title": "The Last_updated Schema ",
          "default": "",
          "examples": [
            "2018-07-31T21:12:31Z"
          ]
        },
        "pictures": {
          "$id": "http://example.com/example.json/items/properties/pictures",
          "type": "array"
        }
      }
    }
  }



describe("Que si llamamos a la api domain", function(){

    it("Devuelve 200", function(){
        
        return chakram.get(config.environment.url).then(function(response){
            //console.log(JSON.stringify(response,null,4));
            expect(response.response.statusCode).to.equal(200);
            expect(response).to.have.schema(schemaTest)
            return chakram.wait();

        })

    });

    it("Validar cada de los domains", function(){
        this.timeout(250000);
        return chakram.get(config.environment.url)
            .then(function(response){
                return response;
            })
            .then(function(values){
              values.body.map(function(value){
                //console.log(JSON.stringify(value,null,4));
                //console.log('value id ' + value.id)
                var resp = chakram.get(config.environment.url+"/"+value.id);
                expect(resp).to.have.status(200);
                expect(resp).to.have.schema(schemaAttr)
              });
              return chakram.wait();  
            });
    });
});