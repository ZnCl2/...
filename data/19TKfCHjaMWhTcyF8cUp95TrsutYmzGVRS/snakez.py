import io
from gestor import *
from shutil import *
import os


###### WELCOME THIS IS THE SOURCE CODE OF Snakez ########


print(   "\033[1;34m  _____             __"           )
print(  " / ___/____  ____ _/ /_____  ____")
print(  " \__ \/ __ \/ __ `/ //_/ _ \/_  / ")
print( " ___/ / / / / /_/ / ,< /  __/ / /_ ")
print("/____/_/ /_/\__,_/_/|_|\___/ /___/  FRAMEWORK CREATED BY : \033[1;37m\033[1;45msplinterk\033[1;m\r\n")
print("\033[1;34mMORE INFO AT : \033[1;37m\033[1;45mhttp://localhost:43110/1GaZYNPuLFN9KPz3nVAs2tojwiJjyGuA1Q\033[1;m\r\n")
print ("\r\n\033[1;34m[*] Welcome to Snakez, the web framework to create HTML,CSS,Javascript and PHP fast and easily\r\n\033[1;37m")

def menu():
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
menu()
