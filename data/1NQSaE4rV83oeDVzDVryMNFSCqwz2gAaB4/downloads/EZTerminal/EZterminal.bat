@echo off
set "curpath=%cd%"



:userprompt
cls
color 70
cd %curpath%

echo Please input a number to complete the action.
echo.
echo ---------------------------------------------
echo ---------------------------------------------
echo ---        1 - Create Site		  ---
echo ---        2 - Build/Modify Site	  ---
echo ---        3 - Publish Site	    	  ---
echo --- 	   4 - List Sites		  ---
echo --- 	   5 - List Sites (Long List)     ---
echo ---        6 - Exit		    	  ---
echo ---------------------------------------------
echo ---------------------------------------------
echo.

set /p input="Input: "
if "%input%"=="1" goto create
if "%input%"=="2" goto build
if "%input%"=="3" goto publish
if "%input%"=="4" goto listsites
if "%input%"=="5" goto longlist
if "%input%"=="6" goto exit
goto error


:create
cls
cd ZeroNet
"../Python/python.exe" zeronet.py siteCreate
echo.
echo.
pause
goto userprompt


:build
echo.
echo.
set /p addresskey="Site Address key: "
cd ZeroNet
"../Python/python.exe" zeronet.py siteSign %addresskey%
echo.
echo.
pause
goto userprompt


:publish
echo.
echo.
set /p addresskey="Site Address key: "
cd ZeroNet
"../Python/python.exe" zeronet.py sitePublish %addresskey%
echo.
echo.
pause
goto userprompt


:listsites
cls
cd ZeroNet/data
echo All sites listed in order of last modified.
echo.
echo.
dir /a:d /t:w /b
echo.
echo.
pause
goto userprompt


:longlist
cls
cd ZeroNet/data
echo All sites listed in order of last modified.
echo.
echo.
dir /a:d /t:w /n
echo.
echo.
pause
goto userprompt


:error
cls
color 74
echo An error occured: InputArgumentException
echo.
echo Please type in a proper command.
pause
goto userprompt


exit:
exit
