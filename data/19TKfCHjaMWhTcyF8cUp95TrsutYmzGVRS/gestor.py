import io
from shutil import *
from templates import *
import subprocess
import os

def menu(): #### MAIN MENU ####
    print ("\r\n\033[1;33m[*] Choose your template : \033[1;m\r\n")
    print ("    1) Basic Tag")
    print ("    2) Menu Bar")
    print ("    3) Responsive Grid Page")
    print ("    4) PHP Login/Register Form")
    print ("    5) Upgrade Snakez")
    print ("    6) Quit \r\n")

    try:
        a = int(input("  --> "))
        if (a==1):
            basicTag()
        elif (a==2):
            menuBar()
        elif (a==4):
            phpMenu()
        elif (a==3):
            gridRes()
        elif (a==6):
            print("\033[1;34m\r\n[*] Bye!\r\n")
        elif (a==5):
            update()
        else :
            print("\r\n\033[1;41m[!] Wrong number...\033[1;m\r\n")
            menu()

    except:
        print("\r\n\033[1;41m[!] Error, You must enter a number... \033[1;m\r\n")
        exit()

def phpMenu(): #### PHP MENU ####
    print ("\r\n\033[1;41m[!] This function is not ready yet, please download the newest version or go to the main menu and try another template: \033[1;m\r\n")
    print ("    1) Main Menu")
    print ("    2) Get The Newest Version")
    print ("    3) Quit\r\n")
    try:
        a = int(input("  --> "))
        if (a==1):
            menu()
        elif (a==2):
            update()
        elif (a==3):
            print("\033[1;34m\r\n[*] Bye!\r\n")
        else :
            print("\r\n\033[1;41m[!] Wrong number...\033[1;m\r\n")
            phpMenu()
    except :
        print("\r\n\033[1;41m[!] Error, You must enter a number... \033[1;m\r\n")
        exit()




def menuBar(): #### MENUBAR MENU ####
    print("\r\n\033[1;33m[*] Choose your menu bar type: \033[1;m\r\n")
    print("     1) Simple Menu Bar")
    print("     2) Dropdown Menu Bar")
    print("     3) Sticky Menu Bar")
    print("     4) Responsive Menu Bar")
    print("     5) Responsive Sticky Menu Bar")
    print("     6) Back")
    print("     7) Quit\r\n")
    try:
        a = int(input("  --> "))
        if (a==1):
            simpleBar()
        elif (a==2):
            dropBar()
        elif (a==3):
            stickyBar()
        elif (a==4):
            respBar()
        elif (a==5):
            respStick()
        elif (a==6):
            menu()
        elif (a==7):
            print("\033[1;34m\r\n[*] Bye!\r\n")
        else:
            print("\r\n\033[1;41m[!] Wrong number...\033[1;m\r\n")
            menuBar()
    except:
        print("\r\n\033[1;41m[!] Error, You must write a number... \033[1;m\r\n")
        exit()


def update(): ### UPDATE
    print("\r\n\r\n\033[1;34m[*] Now you are going to upgrade Snakez's version so make sure you have \033[1;45mZeroNet\033[1;m\033[1;34m running... You have two options : \033[1;m\r\n\r\n")
    print("       1)  Automatic update ( Only Mac OS and Linux ) ")
    print("       2)  Manual update ( Windows )")
    print("       3)  Abort\r\n")
    try:
        u= int(input("       --> "))
        if (u==1):
            try:
                print("\r\n\033[1;45m")
                bashCommand = "wget http://localhost:43110/1GaZYNPuLFN9KPz3nVAs2tojwiJjyGuA1Q/Snakez-Framework.zip"
                process = subprocess.Popen(bashCommand.split(), stdout=subprocess.PIPE)
                output, error = process.communicate()
                print("\033[1;m\r\n")
                print("\033[1;32m[*] File Snakez-Framework.zip ( upated version ) succesfully downloaded ; ) \033[1;m\r\n")
                print("\033[1;34m\r\n[*] Bye!\r\n")
            except:
                print("\r\n\033[1;41m[!] Fatal error, unable to update.\033[1;m\r\n")
        elif (u==2):
            print("\r\n\033[1;34m[*] Open your browser and visit this website : \r\n")
            print("\033[1;32mhttp://localhost:43110/1GaZYNPuLFN9KPz3nVAs2tojwiJjyGuA1Q\033[1;m\r\n\r\n\033[1;34m[*] Then you download the latest version and you're done! \033[1;m\r\n")
            print("\033[1;32m[*] Thank you ;)\033[1;m\r\n")
        elif (u==3):
            print("\r\n\033[1;34m[*] Quitting...\033[1;m\r\n")
            menu()
        else :
            print("\r\n\033[1;41m[!] Wrong number...\033[1;m\r\n")
            update()
    except :
        print("\r\n\033[1;41m[!] Error, You must enter a number... \033[1;m\r\n")
        exit()
