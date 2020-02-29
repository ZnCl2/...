{-# LANGUAGE OverloadedStrings #-}

module Main where

import System.Directory
import System.FilePath
import Data.String
import Data.Text hiding (filter)
import Data.Text.IO
import Data.List (sort)
import Prelude hiding (readFile, writeFile, putStrLn, intercalate, concat)

formatListFrom dname = do
  fs <- fmap fromString <$> listDirectory dname
  let fs' = sort (filter (isSuffixOf ".ogg") fs)
  pure (concat (fmap (\f ->
      "<div class=\"track\"><div class=\"track-name\">" <> f <>
      "</div><audio src=\"vorbis/" <> f <> "\" controls></audio></div>\n") fs'))

warn = "<p>This is static version of the page; it loads vorbis (lossy) version, and you have to switch tracks manually.. not intended for long-term</p>\n"

doTheJob dname = do
  let fname = dname </> "index.html"
  hasIndex <- doesFileExist fname
  if hasIndex then do
    tmplt <- readFile fname
    staticList <- formatListFrom (dname </> "vorbis")
    let
      tmpl' = replace "<div class=\"load\">" (warn <> staticList <> "<!--") tmplt
      tmp'' = replace "<div id=\"tracks\">" "-->" tmpl'
    writeFile (dname </> "static.html") tmp''
    pure ()
  else
    pure ()

main = do
  fs <- listDirectory "."
  mapM_ doTheJob fs
