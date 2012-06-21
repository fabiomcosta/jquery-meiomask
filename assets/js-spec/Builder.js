/*
Script: Builder.js
    Automatically includes MooTools files right from the project folder.

License:
    MIT-style license.

Note:
    If you use this script in your own page, you must be out of your mind.
*/

var Builder = {

    includeFiles: function(files){
        for (var i=0; i< files.length; i++){
            this.includeJs(files[i]);
        }
    },
    
    includeJs: function(filePath){
        document.writeln('<script type="text/javascript" src="' + filePath + '.js?' + new Date().getTime() + '"></script>');
    },
    
    build: function(files){
        this.includeFiles(files);
    }

};
