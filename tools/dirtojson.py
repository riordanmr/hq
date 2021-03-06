#!/usr/bin/python
# dirtojson.py
# Do a directory listing and generate a JSON output file
# from the results.  This is for the House Quiz web app.
# /mrr 2013-01-31
import os
import datetime

class dirtojson:
   def __init__(self):
      self.nHousesGenerated = 0
   
   def getDataForHouse(self,basedir, dir):
      if self.nHousesGenerated > 0:
         print ' },'
      self.nHousesGenerated = self.nHousesGenerated + 1
      print " {"
      print "  " + '"address": "' + dir + '",'
      out = '  "images": ['
      bFirstImage = True
      houseDir = os.path.join(basedir, dir)
      for fname in os.listdir(houseDir):
         if not os.path.isdir(os.path.join(houseDir, fname)):
            if fname.endswith(".jpg"):
               if bFirstImage:
                  bFirstImage = False
               else:
                  out = out + ','
               if len(out) + len(fname) > 72:
                  print out
                  out = '   '
               out = out + '"' + fname + '"'
      out = out + ']'
      print out

   def Generate(self):
      now = datetime.datetime.now()
      print '// Generated by dirtojson.py  ' + now.strftime("%Y-%m-%d %H:%M")
      print 'var jsonInput ='
      print '{"houses": ['
      
      basedir = '/Library/WebServer/Documents/hq/images'
      for fname in os.listdir(basedir):
         if os.path.isdir(os.path.join(basedir,fname)):
            self.getDataForHouse(basedir,fname)
      print ' }'
      print ']'
      print '};'

def main():
   objDirToJson = dirtojson()
   objDirToJson.Generate()

main()
