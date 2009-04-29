#!/usr/bin/python
import os
from zipfile import ZipFile, BadZipfile

class Builder:
    
    javascript_files = []
    extra_zip_files = []

    def __init__(self, minify_postfix='min', extension='js'):
        self.minify_posfix = minify_postfix
        self.extension = '.' + extension
                
    def add_files(self, list_name, files, root='', path='', extension=''):
        if type(files) == dict:
            for key in files.keys():
                self.add_files(list_name, files[key], root, path=path + key + '/', extension=extension)
        elif type(files) == list or type(files) == tuple:
            for _file in files:
                getattr(self, list_name).append((_file, root + path + _file + extension))
        elif type(files) == str:
            getattr(self, list_name).append((files, root + path + files + extension))
            
    def read_file(self, _file):
        f = open(_file,'r')
        ret = []
        try:
            ret = f.readlines()
        finally:
            f.close()
        ret.append('\r\r')
        return ret

    def create_built_file(self):
        file_name = self.file_name + self.extension
        built_file = open(file_name, 'w')
        try:
            for name ,absolute_name in self.javascript_files:
                built_file.writelines( self.read_file(absolute_name) )
        finally:
            built_file.close()
        print '** Succesfully created "' + file_name + '" file. **'
    
    def create_minified_file(self):
        os.system('java -jar assets/yui-compressor/yui.jar --warn --charset utf8 ' + self.file_name + self.extension + ' > ' + self.file_name + '.' + self.minify_posfix + self.extension)
        print '** Succesfully created minified file. **'
        
    def create_zip_file(self):
        zip_file = ZipFile(self.file_name+'.zip','w')
        
        file_name = self.file_name + self.extension
        zip_file.write(file_name, self.file_name + '/' + file_name)
        
        compressed_file_name = self.file_name + '.' + self.minify_posfix + self.extension
        zip_file.write(compressed_file_name, self.file_name + '/' + compressed_file_name)
        
        for name, absolute_name in self.extra_zip_files:
            zip_file.write(absolute_name, self.file_name + '/' + name)
        
        zip_file.close()
        
        #tests the zipfile
        zip_file = ZipFile(self.file_name + '.zip', 'r')
        if zip_file.testzip() is not None:
            raise BadZipfile()
        else:
            print '** Succesfully created zipped file. **'
        zip_file.close()
        
    def build(self, file_name, files, extra_zip_files={}, root='Source/'):
        self.file_name = file_name
        self.add_files('javascript_files', files, root=root, extension=self.extension)
        self.add_files('extra_zip_files', extra_zip_files)
        
        print 'Starting to build ' + file_name + ' files...'
        self.create_built_file()
        self.create_minified_file()
        self.create_zip_file()
        print ''
        
        self.javascript_files = []
        self.extra_zip_files = []
    
if __name__ == '__main__':
    builder = Builder()
    builder.build('jquery.meio.mask', ('jquery.meio.mask',) )
    