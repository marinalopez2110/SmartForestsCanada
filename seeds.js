var mongoose = require("mongoose");
var ResearchSite = require("./models/researchSite");
var Comment     = require ("./models/comments");
var data = [
    {
        name: "Saint-Hippolyte", 
        image: "http://www.recherche.umontreal.ca/visuel/uniterech:14039.portrait.1.image",
        description: "Saint-Hippolyte hosts the Laurentian Biology Station of the Montreal University",
        location: "592 Chemin du Lac Croche",
        titlep1: "Soil warming",
        researcherp1: "Alexandre Colin, Nicolas Belanger",
        descriptionp1: "Description in process",
        datap1: "Link to metadata",
        statusp1: "In progress",
        refdatavisp1: "https://plot.ly/~marinalopez2110/18/?share_key=nuTZJgZIXAWQeRiHDtmIhB",
        datavisp1: "https://plot.ly/~marinalopez2110/18.png?share_key=nuTZJgZIXAWQeRiHDtmIhB",
        scriptp1: "https://plot.ly/embed.js",
        onerrorp1: "https://plot.ly/404.png",
        titlep2: "Red Oak",
        researcherp2: "Simon Lebel, Nicolas Belanger",
        descriptionp2: "Description in process",
        datap2: "Link to metadata",
        statusp2: "In progress"
    },
        {name: "Abitibi", 
        image: "https://farm1.staticflickr.com/13/89580454_d127317704.jpg",
        description: "The Duparquet Lake Teaching and Research Forest (FERLD) is located in the middle of the boreal forest of the Canadian Shield.",
        titlep1: "Mélèze",
        researcherp1: "Carla Ramos, Nicolas Belanger",
        descriptionp1: "Description in process",
        datavisp1: "https://www.tourisme-abitibi-temiscamingue.org/images/membres/gatr/460/2a8401980eb85ad135a09301c9642a81_960.jpg",
        datap1: "Link to metadata",
        statusp1: "In progress"
    },
        {name: "Outaouais", 
        image: "https://traitementagriledufrene.ca/wp-content/uploads/2014/12/Bio-controle-arboricole-foret-automne-2-LR.jpg",
        description: "This forest was declared an ecological reserve to preserve a great diversity of plant life representative of the Outaouais region. Covering 2,052 hectares (5,070 acres), it is among the most beautiful forest territories in Québec.",
        titlep1: "Projets in planning phase",
        researcherp1: "Nicolas Belanger",
        descriptionp1: "Description in process",
        datap1: "No data available yet",
        statusp1: "Planning"
    },

        {name: "Black Lake Mine",
        image: "http://www.patrimoine-culturel.gouv.qc.ca/rpcq/document/rpcq_bien_201033_219771.JPG?id=219771",
        description: "L'ancienne mine Lac d'amiante est située dans la municipalité de Thetford Mines, plus précisément à Saint-Joseph-de-Coleraine. ermée depuis 2012, cette mine possède en 2014 presque tous les bâtiments ayant servi à l'exploitation. Tout d'abord, il y a le moulin auquel est annexé le séchoir.Aujourd'hui, une carrière de granit concassé pour la construction est en opération sur le site.",
        titlep1: "Afforestation of the mine",
        researcherp1: "Rim Khlifa, Nicolas Belanger",
        descriptionp1: "description",
        datap1: "Link to metadata",
        statusp1: "In progress"
    },

        {name: "Environmental Modelling",
        image: "https://s3.amazonaws.com/thinkific-import/85575/faoXnJXRqSsfItG5oF0d_environmental_modeling-1525719283350%20%281%29.png",
        description: "The dynamics of ecological communities in forest landscapes.\n" +
            "How do inter- and intraspecific interactions between individuals, and their dispersal ability influence the dynamics of their population at different temporal and spatial scales?\n" +
            "The interplay between forest management and forest function.\n" +
            "How do interactions between ecological processes and management affect the dynamics and function of forest ecosystems?",
        titlep1: "Comparing the effects of even aged and uneven-aged forest management at large spatial and temporal scales",
        researcherp1: "Clément Hardy, Élise Filotas",
        descriptionp1: "Even-aged forest management (e.g. clearcuts) is still the most widely used type of forest management throughout the world. However, many studies suggested that it has important negative impacts on forest ecosystems, and that uneven-aged management (e.g. selection cuts) might be better overall.\n" +
            "However, because field studies comparing even and uneven-aged management are limited in their temporal and spatial scale, and because forest ecosystems operate on large temporal and spatial scales, we will try a simulation approach to compare their effect on forest ecosystems at larger scales.\n" +
            "For this, we will use a spatially explicit forest landscape model, called LANDIS-II. We will participate to its development by adding an important element when comparing even and uneven-aged management – forest roads -, and will then simulate different scenarios of forest management to observe how the forest landscape is transformed on several centuries by these different strategies.",
        statusp1: "In progress",
        datap1: "Link to metadata"

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
                        {text: "In progress",
                        author: "Status"
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