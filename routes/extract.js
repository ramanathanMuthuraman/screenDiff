var express = require('express');
var fs = require('fs');
var unzip = require('unzip');
var path = require('path');
var recursive = require('recursive-readdir');
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
        fs.createReadStream(outputPath + zipFolder).pipe(unzip.Extract({
            path: outputPath + unzippedFolder
        }).on('close', function() {
            recursive(outputPath + unzippedFolder, function(err, files) {
                if (err) throw err;
                var folder = unzippedFolder;
                var fileName = [];
                var totalNumberOfImages=files.length;
                for (file in files) {
                    
                    fast_image_size(files[file], function(ret_obj) {
                        fileName.push(path.basename(ret_obj.image));
                        console.log('Testing: ' + ret_obj.image);
                        console.log('Type: ' + ret_obj.type);
                        console.log('Image width: ' + ret_obj.width);
                        console.log('Image height: ' + ret_obj.height);
                        
                        console.log(file,totalNumberOfImages-1)
                    if(file === totalNumberOfImages-1){
                           console.log(file,totalNumberOfImages-1)
                      
                        res.send({
                            path: ""
                        });

                    }
                        
                    });
                   
                }

               
            });
            



        }));

    });

});

module.exports = router;