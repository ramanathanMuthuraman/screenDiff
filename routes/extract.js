var express = require('express');
var cookieParser = require('cookie-parser');
var fs = require('fs');
var unzip = require('unzip');
var walk = require('walk');
var router = express.Router();
var sizeOf = require('image-size');

/* GET users listing. */

router.post('/', function(req, res) {
    var sessionKey = req.secret;
    var outputPath = __base + "public/result/";
    var fileOptions = req.files.decompress;
    var extension = fileOptions.extension;
    var path = fileOptions.path;
    zipFolder = fileOptions.name;
    
    
    var deleteFolderRecursive = function(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      } 
    });
   // fs.rmdirSync(path);
  }
        
         extractFiles();
};
    var extractFiles = function(){


     fs.renameSync(outputPath + zipFolder, outputPath + sessionKey + "/" + zipFolder, function(err) {
        if (err) {
            return err;
        }


    });
    if (extension === 'zip') {
        //unzip the folder
        fs.createReadStream(outputPath + sessionKey + "/" + zipFolder).pipe(unzip.Extract({
            path: outputPath + sessionKey
        }).on('close', extractFilestoFolder));
    } else {
        extractFilestoFolder();
    }



    };
    //write files in the destined folder
    var extractFilestoFolder = function() {
        //when unzip is complete send the image info to the user
        var path = {};
        //get the folder name 
        path.root = sessionKey;
        var images = [];

        walker = walk.walk(outputPath + sessionKey);
        //traverse the files
        walker.on("file", function(root, fileStats, next) {
            var image = {};
            if(fileStats.name.indexOf(".zip")===-1){
           
                image.name = fileStats.name;
                var dimensions = sizeOf(root + '/' + fileStats.name);
                image.width = dimensions.width;
                image.height = dimensions.height;
                images.push(image);
            }
                next();
          

        });

        walker.on('end', function() {
            path.images = images;
            //after the file traversal is over send the info to UI
            res.send({
                "path": path
            });
        });


    }
    
    

    //check whether the directory already exists else create new directory 
    if (fs.existsSync(outputPath + sessionKey) === false) {

        fs.mkdirSync(outputPath + sessionKey);
        extractFiles()
    }
    else{
        
        deleteFolderRecursive(outputPath + sessionKey);
    
        
    }
   

    //moves the files to the new directory




});

module.exports = router;