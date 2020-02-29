#!/usr/bin/env python2
# coding: utf-8

import sys
import os

import argparse

import BaseHTTPServer
import webbrowser
import urllib
import io

import Tkinter as tk
import tkFileDialog

import re
import json
import random

import json
import hashlib
import codecs



def FolderNameIsUgly(chosen_folder_name, real_file_name):
    if len(chosen_folder_name) > 50:
        return True

    if chosen_folder_name.strip() == "" or chosen_folder_name.strip("_") == "":
        return True

    unsafe = [
        "/", "\\", "|", ":", ";", "'", '"', "`", "^", "?", "*", "<", ">",
        "+", "#", "%", "&", "$", ",",
    ]
    for unsafe_char in unsafe:
        if unsafe_char in chosen_folder_name:
            return True

    short_pattern = re.compile("(^[0-9]{1,4}$|^[a-z]{1,2}$)")
    if short_pattern.match(chosen_folder_name):
        return True

    lower_folder_name = chosen_folder_name.strip().lower()
    lower_file_name = real_file_name.strip().lower()

    if len(lower_file_name) > len(lower_folder_name):
        if "." in lower_file_name:
            if lower_folder_name == lower_file_name.split(".")[-1]:
                return True

    return False

def CorrectFolderName(folder_name, in_folder, real_file_name, retry=5):
    if retry <= 0:
        return "file_" + os.urandom(8).encode('hex')

    chosen_folder_name = ""

    if folder_name == None:
        folder_name = ""
    if folder_name.strip() != "":
        # folder_name is given: try fixing folder_name
        lower_name = folder_name.strip().lower()
        lower_name = lower_name.replace("_", " ") \
            .replace(". ", ".").replace(" .", ".") \
            .replace("- ", "-").replace(" -", "-") \
            .replace(")", "]").replace("(", "[") \
            .replace("] ", "]").replace(" [", "[").replace("[]", "")

        # valid: [a-z0-9-_!\[\]\.~]
        exp_valid = re.compile("[a-z0-9-_!\\[\\]\\.~]")

        for s in lower_name:
            if exp_valid.match(s):
                chosen_folder_name += s
            else:
                chosen_folder_name += "_"

        ugly_chars = ["-", "\\.", ",", "_"]
        repl = ugly_chars[-1]
        for char in ugly_chars:
            pattern = re.compile(char + "{2,}") # remove repeated ugly chars
            chosen_folder_name = re.sub(pattern, repl, chosen_folder_name)

        # shorten folder name
        chosen_folder_name = chosen_folder_name[0:50]

        # ^[-\.,_]+
        #  [-\.,_]+$
        exp_trim_left = re.compile("^[" + "".join(ugly_chars) + "]+")
        exp_trim_right = re.compile("[" + "".join(ugly_chars) + "]+$")
        # remove ugly chars at the beginning & end
        chosen_folder_name = re.sub(exp_trim_left, "", chosen_folder_name)
        chosen_folder_name = re.sub(exp_trim_right, "", chosen_folder_name)


    base_on = None

    if FolderNameIsUgly(chosen_folder_name, real_file_name):
        # try making a folder name by adding random numbers
        base_on = os.urandom(4).encode('hex') + "_" + real_file_name
    elif os.path.exists(in_folder + "/" + chosen_folder_name):
        # try making a folder name out of real file name
        base_on = os.urandom(4).encode('hex') + "_" + chosen_folder_name

    if base_on != None:
        # we need to choose another folder name, for some reason
        return CorrectFolderName(base_on, in_folder, real_file_name, retry - 1)
    else:
        return chosen_folder_name


def ChooseChunkSize(file_size):
    SMALL_SIZE, MED_SIZE, MAX_SIZE = 350*1024, 500*1024, 990*1024
    n_pieces = file_size / MED_SIZE - 1
    # file is small, break it up into smaller chunks
    if n_pieces <= 3:
        return SMALL_SIZE

    # try to save 1~3 chunks
    chunk_size = int(file_size / n_pieces + 10*1024 + random.SystemRandom().randint(0, 50*1024))

    if chunk_size < SMALL_SIZE or chunk_size > MAX_SIZE:
        return MED_SIZE
    else:
        return chunk_size

def SplitFile(filePath, savePath, relativePath, givenFileName, idealChunkSize=500*1024):
    fileSize = os.path.getsize(filePath)

    filePartList = []

    fileSha256 = hashlib.sha256()
    fileInfo = open(filePath, 'rb')


    chunkOrder = 0
    chunkBytes = fileInfo.read(idealChunkSize)
    actualChunkSize = len(chunkBytes)

    while actualChunkSize > 0:
        fileSha256.update(chunkBytes)

        chunkSha256 = hashlib.sha256(chunkBytes).hexdigest()

        chunkFileName = "%s.dat" % str(chunkOrder)
        chunkRelativePath = relativePath + "/" + chunkFileName

        info = {
            "path": chunkRelativePath,
            "order": chunkOrder,
            "size": actualChunkSize,
            "hashingAlgorithm": "sha256",
            "hash": chunkSha256
        }
        filePartList.append(info)

        chunkFilePath = savePath + "/" + chunkFileName
        chunkFileInfo = open(chunkFilePath, 'wb')
        chunkFileInfo.write(chunkBytes)
        chunkFileInfo.flush()
        chunkFileInfo.close()

        chunkOrder += 1
        chunkBytes = fileInfo.read(idealChunkSize)
        actualChunkSize = len(chunkBytes)


    wholeFileSha256 = fileSha256.hexdigest()

    bigFileDict = {
        "fileName": givenFileName,
        "size": fileSize,
        "hashingAlgorithm": "sha256",
        "hash": wholeFileSha256
    }

    jsonContent = {
        "bigFile": bigFileDict,
        "fileParts": filePartList
    }

    jsonFileInfo = codecs.open(savePath + "/file.json", 'w', 'utf-8')
    jsonFileInfo.write( unicode(json.dumps(jsonContent)) )
    jsonFileInfo.flush()
    jsonFileInfo.close()
