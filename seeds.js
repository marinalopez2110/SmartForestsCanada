var mongoose = require("mongoose");
var ResearchSite = require("./models/researchSite");
var Comment     = require ("./models/comments");
var data = [
    {
        name: "Saint-Hippolyte", 
        image: "http://www.recherche.umontreal.ca/visuel/uniterech:14039.portrait.1.image",
        description: "Saint-Hippolyte hosts the Laurentian Biology Station of the Montreal University",
        location: "592 Chemin du Lac Croche"
    },
        {name: "Abitibi", 
        image: "https://farm1.staticflickr.com/13/89580454_d127317704.jpg",
        description: "The Duparquet Lake Teaching and Research Forest (FERLD) is located in the middle of the boreal forest of the Canadian Shield."
    },
        {name: "Outaouais", 
        image: "https://traitementagriledufrene.ca/wp-content/uploads/2014/12/Bio-controle-arboricole-foret-automne-2-LR.jpg",
        description: "This forest was declared an ecological reserve to preserve a great diversity of plant life representative of the Outaouais region. Covering 2,052 hectares (5,070 acres), it is among the most beautiful forest territories in Québec."
    },

    {name: "Black Lake Mine",
        image: "http://www.patrimoine-culturel.gouv.qc.ca/rpcq/document/rpcq_bien_201033_219771.JPG?id=219771",
        description: "L'ancienne mine Lac d'amiante est située dans la municipalité de Thetford Mines, plus précisément à Saint-Joseph-de-Coleraine. ermée depuis 2012, cette mine possède en 2014 presque tous les bâtiments ayant servi à l'exploitation. Tout d'abord, il y a le moulin auquel est annexé le séchoir.Aujourd'hui, une carrière de granit concassé pour la construction est en opération sur le site."
    },

    {name: "Environmental Modelling",
        image: "https://s3.amazonaws.com/thinkific-import/85575/faoXnJXRqSsfItG5oF0d_environmental_modeling-1525719283350%20%281%29.png",
        description: "The dynamics of ecological communities in forest landscapes.\n" +
            "How do inter- and intraspecific interactions between individuals, and their dispersal ability influence the dynamics of their population at different temporal and spatial scales?\n" +
            "The interplay between forest management and forest function.\n" +
            "How do interactions between ecological processes and management affect the dynamics and function of forest ecosystems?"
    }]
function seedDB(){
    //Remove all researchSites
    ResearchSite.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed researchSites!");
        //add a few researchSites
        data.forEach(function(seed){
            ResearchSite.create(seed, function(err, researchSite){
                if(err) {
                    console.log(err);
                }else{
                    console.log("added a researchSite");
                    //create a comment
                    Comment.create(
                        {text: "A new file and its visualisation has been added to this Site. Please go to the NextCloud or to the Data Visualisation page to look at it. If you require to do some changes you can go to the Jupyter Notebooks site. If you have any question, do not hesitate to ask me by email at mlopez_c@teluq.ca or by the GitHub tickets site. Thanks!",
                        author: "Marina"
                        }, function(err, comment){
                            if(err){
                                console.log(err)
                            }else{
                                researchSite.comments.push(comment);
                                researchSite.save();
                                console.log("Comment added");
                            }
                        });
                }
            });
        });
    });
    
    
}

module.exports = seedDB;