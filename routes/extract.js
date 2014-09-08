var express = require('express');
var fs = require('fs');
var unzip = require('unzip');
var walk = require('walk');
var fast_image_size = require('fast-image-size');
var router = express.Router();

/* GET users listing. */

router.post('/', function(req, res) {

    var outputPath = __base + "public/result/";
    var zipFolder = req.files.decompress.name;
    var unzippedFolder = req.files.decompress.originalname.replace(".zip", "");
    fs.rename(req.files.decompress.path, outputPath + zipFolder, function(err) {
        if (err)
            return;
        //unzip the folder
        fs.createReadStream(outputPath + zipFolder).pipe(unzip.Extract({
            path: outputPath + unzippedFolder
        }).on('close', function() {
            //when unzip is complete send the image info to the user
            var path ={};
            //get the folder name 
            path.root = unzippedFolder;
            var images = [];

            walker = walk.walk(outputPath + unzippedFolder);
           //traverse the files
            walker.on("file", function(root, fileStats, next) {
                 var image = {};
               
                fast_image_size(root + '/' + fileStats.name, function(ret_obj) {
                   //get the image name, width and height 
                    image.name = fileStats.name;
                    image.width = ret_obj.width;
                    image.height = ret_obj.height;
                    images.push(image);
                    next();
                });

            });

            walker.on('end', function() {
                path.images = images;
                //after the file traversal is over send the info to UI
                res.send({
                    "path": path
                });
            });


        }));

    });

});

module.exports = router;