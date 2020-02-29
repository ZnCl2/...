@echo off
@color 06
cls
mode con: cols=49 lines=12
REG QUERY "HKU\S-1-5-19" >NUL 2>&1 && (
GOTO mainmenu
) || (
echo Right click Trilogy and run as administrator
echo.
pause
GOTO exit
)

:mainmenu
title Trilogy 4.2
mode con: cols=50 lines=11
CLS
echo.
echo.  
echo.              ---- Trilogy 4.2 ----
echo.    
echo.          A. IR5 (Windows 7 and Servers)
echo.          B. IORRT (Office 2010 VL)
echo.          C. ACS5.5T (Adobe CS5.5)
echo.          D. Details and Links
echo.          E. ISO Installation Basics
echo.          F. Exit Trilogy
echo.
  
:CHOOSEACTION
set /p userinp=    ^   Make your selection: 
set userinp=%userinp:~0,1%
if /i "%userinp%"=="A" goto IR5
if /i "%userinp%"=="B" goto IORRT
if /i "%userinp%"=="C" goto ACS5.5T
if /i "%userinp%"=="D" goto DetailsandLinks
if /i "%userinp%"=="E" goto ISO
if /i "%userinp%"=="F" goto Exit
echo.Try Again...
GOTO CHOOSEACTION

:IR5
REG QUERY "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion" /v CurrentVersion | FINDSTR 6.1 >NUL
IF ERRORLEVEL 1 cls & echo Supports only windows 7 and server 2008 R2 & ping -n 5 127.0.0.1 >nul & goto mainmenu 
for /f "tokens=2 delims==" %%A in ('"wmic volume where DriveLetter="%SystemDrive%" get SerialNumber /format:list"') do set sn=%%A
for /f "tokens=2 delims==" %%A in ('"wmic volume where SystemVolume="true" get DeviceId /format:list"') do set sd=%%A

:start
title IR5 3.9
mode con: cols=45 lines=12
cls
echo.
echo.
echo.             InfiniteRearm5 (IR5)
echo.                   
echo.                A. Install
echo.                B. Uninstall
echo.                C. Rearm
echo.                D. Status                
echo.                E. Instructions
echo.                F. Trilogy
echo.                G. Exit Trilogy
echo.

:CHOOSEACTION2
set /p userinp=    ^   Make your selection: 
set userinp=%userinp:~0,1%
if /i "%userinp%"=="A" goto InstallIR5
if /i "%userinp%"=="B" goto UninstallIR5
if /i "%userinp%"=="C" goto RearmIR5
if /i "%userinp%"=="D" goto StatusIR5
if /i "%userinp%"=="E" goto InstructionsIR5
if /i "%userinp%"=="F" goto MAINMENU
if /i "%userinp%"=="G" goto Exit
echo.Try Again...
GOTO CHOOSEACTION2

:InstallIR5
CLS
schtasks /query | FINDSTR /I "IR5" >NUL 
IF ERRORLEVEL 1 (
echo.
) ELSE (
echo IR5 is already installed...
ping -n 5 127.0.0.1 >nul
GOTO start
)
REG ADD "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\SoftwareProtectionPlatform\Activation" /v NotificationDisabled /t REG_DWORD /d 1 /f >NUL
echo edition = CreateObject("WScript.Shell").RegRead("HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\EditionID") >key.vbs
echo Set keys = CreateObject ("Scripting.Dictionary") >>key.vbs
echo keys.Add "Enterprise",                     "H7X92-3VPBB-Q799D-Y6JJ3-86WC6" >>key.vbs
echo keys.Add "EnterpriseE",                    "H3V6Q-JKQJG-GKVK3-FDDRF-TCKVR" >>key.vbs
echo keys.Add "EnterpriseN",                    "BQ4TH-BWRRY-424Y9-7PQX2-B4WBD" >>key.vbs
echo keys.Add "HomeBasic",                      "YGFVB-QTFXQ-3H233-PTWTJ-YRYRV" >>key.vbs
echo keys.Add "HomeBasicE",                     "VTKM9-74GQY-K3W94-47DHV-FTXJY" >>key.vbs
echo keys.Add "HomeBasicN",                     "MD83G-H98CG-DXPYQ-Q8GCR-HM8X2" >>key.vbs
echo keys.Add "HomePremium",                    "RHPQ2-RMFJH-74XYM-BH4JX-XM76F" >>key.vbs
echo keys.Add "HomePremiumE",                   "76BRM-9Q4K3-QDJ48-FH4F3-9WT2R" >>key.vbs
echo keys.Add "HomePremiumN",                   "D3PVQ-V7M4J-9Q9K3-GG4K3-F99JM" >>key.vbs
echo keys.Add "Professional",                   "HYF8J-CVRMY-CM74G-RPHKF-PW487" >>key.vbs
echo keys.Add "ProfessionalE",                  "3YHKG-DVQ27-RYRBX-JMPVM-WG38T" >>key.vbs
echo keys.Add "ProfessionalN",                  "BKFRB-RTCT3-9HW44-FX3X8-M48M6" >>key.vbs
echo keys.Add "ServerDatacenter",               "7X29B-RDCR7-J6R29-K27FF-H9CR9" >>key.vbs
echo keys.Add "ServerDatacenterCore",           "7X29B-RDCR7-J6R29-K27FF-H9CR9" >>key.vbs
echo keys.Add "ServerEmbeddedSolution",         "M2KD2-F2333-Q3TJ8-BQMHX-9PWX6" >>key.vbs
echo keys.Add "ServerEmbeddedSolutionCore",     "M2KD2-F2333-Q3TJ8-BQMHX-9PWX6" >>key.vbs
echo keys.Add "ServerEnterprise",               "7P8GH-FV2FF-8FDCR-YK49D-D7P97" >>key.vbs
echo keys.Add "ServerEnterpriseCore",           "7P8GH-FV2FF-8FDCR-YK49D-D7P97" >>key.vbs
echo keys.Add "ServerEnterpriseIA64",           "7YKJ4-CX8QP-Q23QY-7BYQM-H2893" >>key.vbs
echo keys.Add "ServerEssentialAdditional",      "7PDBG-28HK4-276G6-XVJF4-KH9Y4" >>key.vbs
echo keys.Add "ServerEssentialAdditionalSvc",   "RCDPD-97Q7B-MRDC3-GTRYF-MCD6G" >>key.vbs
echo keys.Add "ServerEssentialManagement",      "4F37J-4YTKY-6DFDJ-FDRFY-2HT34" >>key.vbs
echo keys.Add "ServerEssentialManagementSvc",   "4HFV2-KB9P6-TQVJF-87D8X-2YYBF" >>key.vbs
echo keys.Add "ServerForSBSolutions",           "PHYFD-HQ4XW-78PR4-2CXKF-V67KJ" >>key.vbs
echo keys.Add "ServerForSBSolutionsEM",         "JR4Y2-WC84X-PBRDJ-QTBTB-TQGGH" >>key.vbs
echo keys.Add "ServerHomePremium",              "YQXDR-G2MBV-63VW2-JX8J2-FVTVG" >>key.vbs
echo keys.Add "ServerHomeStandard",             "BTMWJ-8KHD9-B9BX8-J7JQ9-7M6J2" >>key.vbs
echo keys.Add "ServerHPC",                      "Q7PRR-M2WBM-RJJ99-FG393-MGY3B" >>key.vbs
echo keys.Add "ServerHyperCore",                "Q8R8C-T2W6H-7MGPB-4CQ9R-KR36H" >>key.vbs
echo keys.Add "ServerMediumBusinessManagement", "FD499-FD79G-V9D2W-F9WQ6-MD2VC" >>key.vbs
echo keys.Add "ServerMediumBusinessMessaging",  "YVYC7-KVQ8G-XF6K4-9MG8M-QXFC2" >>key.vbs
echo keys.Add "ServerMediumBusinessSecurity",   "YQ3V7-79DM4-42PVW-BYRH8-69VXK" >>key.vbs
echo keys.Add "ServerSBSPremium",               "BXQQP-Q6Q6D-TR7TR-3YXQW-VFHKM" >>key.vbs
echo keys.Add "ServerSBSPremiumCore",           "BXQQP-Q6Q6D-TR7TR-3YXQW-VFHKM" >>key.vbs
echo keys.Add "ServerSBSStandard",              "YMFM8-J2RV2-66G78-XPQ7C-4RY3B" >>key.vbs
echo keys.Add "ServerSolution",                 "VVWPG-XFYWQ-4HBR7-DYGCW-TF7XW" >>key.vbs
echo keys.Add "ServerSolutionEM",               "WF9T8-VT7D2-GD629-WTKGH-3WBJT" >>key.vbs
echo keys.Add "ServerSolutionsPremium",         "4TMY4-8JG4B-VKY8X-6TVDH-J7XFV" >>key.vbs
echo keys.Add "ServerSolutionsPremiumCore",     "4TMY4-8JG4B-VKY8X-6TVDH-J7XFV" >>key.vbs
echo keys.Add "ServerStandard",                 "HMG6P-C7VGP-47GJ9-TWBD4-2YYCD" >>key.vbs
echo keys.Add "ServerStandardCore",             "HMG6P-C7VGP-47GJ9-TWBD4-2YYCD" >>key.vbs
echo keys.Add "ServerWeb",                      "YGTGP-9XH8D-8BVGY-BVK4V-3CPRF" >>key.vbs
echo keys.Add "ServerWebCore",                  "YGTGP-9XH8D-8BVGY-BVK4V-3CPRF" >>key.vbs
echo keys.Add "ServerWinFoundation",            "36RXV-4Y4PJ-B7DWH-XY4VW-KQXDQ" >>key.vbs
echo keys.Add "ServerWinSB",                    "JG43G-CMPHG-VPBC6-9TDQR-RRFJ4" >>key.vbs
echo keys.Add "ServerWinSBV",                   "WQG3Q-VWT72-VX39Q-VRTRD-2RF7K" >>key.vbs
echo keys.Add "Starter",                        "7Q28W-FT9PC-CMMYT-WHMY2-89M6G" >>key.vbs
echo keys.Add "StarterE",                       "BRQCV-K7HGQ-CKXP6-2XP7K-F233B" >>key.vbs
echo keys.Add "StarterN",                       "D4C3G-38HGY-HGQCV-QCWR8-97FFR" >>key.vbs
echo keys.Add "Ultimate",                       "D4F6K-QK3RD-TMVMJ-BBMRX-3MBMV" >>key.vbs
echo keys.Add "UltimateE",                      "TWMF7-M387V-XKW4Y-PVQQD-RK7C8" >>key.vbs
echo keys.Add "UltimateN",                      "HTJK6-DXX8T-TVCR6-KDG67-97J8Q" >>key.vbs
echo keys.Add "Embedded",                       "743Q4-G676P-84RX9-B8HRR-6V73F" >>key.vbs
echo if keys.Exists(edition) then >>key.vbs
echo WScript.Echo keys.Item(edition) >>key.vbs
echo End If >>key.vbs
FOR /F %%A in ('cscript /nologo key.vbs') do SET PIDKEY=%%A 
del key.vbs
SET file=%sd%\IR5.bat
echo @echo off>>%file% 
echo echo Set objWMIService = GetObject("winmgmts:\\.\root\CIMV2") ^>^>drive.vbs>>%file% 
echo echo Set colItems = objWMIService.ExecQuery( "SELECT * FROM Win32_Volume",,48) ^>^>drive.vbs>>%file% 
echo echo For Each objItem in colItems ^>^>drive.vbs>>%file% 
echo echo If Hex(%sn%) = Hex(objItem.SerialNumber) then ^>^>drive.vbs>>%file% 
echo echo Wscript.Echo objItem.DriveLetter ^>^>drive.vbs>>%file% 
echo echo End If ^>^>drive.vbs>>%file% 
echo echo Next ^>^>drive.vbs>>%file% 
echo for /f %%%%A IN ('"cscript /nologo drive.vbs"') do set dl=%%%%A>>%file% 
echo set dl=%%dl:~0,-1%%>>%file%
echo del drive.vbs>>%file% 
echo reg load HKLM\MY_SYSTEM "%%dl%%\Windows\System32\config\system" ^>NUL >>%file% 
echo reg delete HKLM\MY_SYSTEM\WPA /f ^>NUL >>%file% 
echo reg unload HKLM\MY_SYSTEM ^>NUL >>%file%
echo echo cscript /b slmgr.vbs /ipk %PIDKEY% ^>%%dl%%\installkey.bat >>%file%
echo echo slmgr.vbs /dlv ^>^>%%dl%%\installkey.bat >>%file%
echo echo del "C:\installkey.bat" ^>^>%%dl%%\installkey.bat >>%file%
echo echo CreateObject("WScript.Shell").Run """C:\installkey.bat""", 0, False ^>%%dl%%\key.vbs >>%file%
echo echo @echo off ^>%%dl%%\launch.bat >>%file%
echo echo wscript.exe "C:\key.vbs" ^>^>%%dl%%\launch.bat >>%file%
echo echo del "%sd%\IR5.bat" ^>^>%%dl%%\launch.bat >>%file%
echo echo del "C:\key.vbs" ^>^>%%dl%%\launch.bat >>%file%
echo echo del "C:\launch.bat" ^>^>%%dl%%\launch.bat >>%file%
echo reg load HKLM\MY_SOFTWARE "%%dl%%\Windows\System32\config\software" ^>NUL >>%file% 
echo reg add HKLM\MY_SOFTWARE\Microsoft\Windows\CurrentVersion\RunOnce /v InstallKey /t REG_SZ /d C:\launch.bat ^>NUL >>%file%
echo reg unload HKLM\MY_SOFTWARE >>%file%
echo wpeutil reboot >>%file%
reagentc /boottore >NUL
CLS
echo Windows is restarting now...
ping -n 6 127.0.0.1 >nul
schtasks /create /tn "IR5" /tr "'%SystemDrive%\Windows\system32\cmd.exe' /c cscript.exe /b %SystemDrive%\Windows\System32\slmgr.vbs /rearm && net stop sppsvc && net start sppsvc" /sc daily /mo 30 /ru "" /f >NUL
shutdown /r /t 0
GOTO Exit

:UninstallIR5
cls
REG ADD "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\SoftwareProtectionPlatform\Activation" /v NotificationDisabled /t REG_DWORD /d 0 /f >NUL
schtasks /delete /tn "IR5" /f >NUL 2>&1
IF %ERRORLEVEL%==0 ( echo IR5 has been successfully uninstalled...
) ELSE (
echo IR5 is already uninstalled...
)
ping -n 5 127.0.0.1 >nul
GOTO Start

:RearmIR5
mode con: cols=62 lines=7
CLS
cscript.exe /b %windir%\system32\slmgr.vbs /rearm
IF %ERRORLEVEL% NEQ 0 ( echo No rearms detected...
ping -n 5 127.0.0.1 >nul
GOTO Start
) ELSE (
echo Rearming...
net stop sppsvc >NUL
net start sppsvc >NUL
cscript.exe %windir%\system32\slmgr.vbs /dlv | FINDSTR /I "Status"
echo.
cscript.exe %windir%\system32\slmgr.vbs /dlv | FINDSTR /I "Remaining"
echo.
echo Rearm completed successfully...
ping -n 5 127.0.0.1 >nul
)
schtasks /query | FINDSTR /i "IR5" >nul
if %errorlevel%==0 (
schtasks /create /tn "IR5" /tr "'%SystemDrive%\Windows\system32\cmd.exe' /c cscript.exe /b %SystemDrive%\Windows\System32\slmgr.vbs /rearm && net stop sppsvc && net start sppsvc" /sc daily /mo 30 /ru "" /f >NUL
)
GOTO Start

:StatusIR5
mode con: cols=64 lines=8
echo Retrieving status...
echo.
echo.
echo.
echo.
echo.
cscript.exe %windir%\system32\slmgr.vbs /dlv | FINDSTR /I "Status"
echo.
cscript.exe %windir%\system32\slmgr.vbs /dlv | FINDSTR /I "Remaining"
echo.
schtasks /query /tn "IR5" 2>NUL | FINDSTR "IR5"
IF ERRORLEVEL 1 echo IR5 is not installed...
ping -n 5 127.0.0.1 >nul
GOTO Start

:InstructionsIR5
mode con: cols=110 lines=21
echo  1. Select Install then your computer will automatically restart into Recovery Environment (RE)
echo.
echo  2. Enter your keyboard language and login information
echo.
echo  3. Click command prompt and type "C:IR5" (without quotes) then press enter
echo.
echo  4. Ignore any non-genuine messages while windows is restarting
echo.
echo  5. Desktop watermark will disappear momentarily
echo.
echo  * Select rearm option if license status says "notification"
echo.
echo  * Reinstall IR5 when you have 0 rearms and 1 days left
echo.
echo  * If rearms do not reset try D:IR5, E:IR5, F:IR5, G:IR5, H:IR5 or I:IR5 at step 3
echo.
echo  * If IR5 doesn't boot into (RE) restart your computer and press the F8 function key when BIOS screen flashes
echo.
echo  * Then choose the option to repair computer and start over at step 2
echo.
pause
goto start

:IORRT
setlocal enabledelayedexpansion
title IORRT 4.0
if not exist "%Windir%\system32\schtasks.exe" ( cls
echo You don't have schtasks.exe installed
echo.
echo IORRT is not compatable with XP Home Edition
echo Install XP Professional or schtasks.exe
ping -n 10 127.0.0.1 >NUL
goto MAINMENU
)
set OfficeArchType=
if '%processor_architecture%'=='x86' Set OfficeArchType=32 && Goto:EndArchCheck
goto:WOWCheck
:WOWCheck
2>nul REG QUERY HKLM\SOFTWARE\Microsoft\Office\14.0\Common | find /i "InstallRoot" 1>nul
IF ERRORLEVEL 1 Set OfficeArchType=WOW && Goto:EndArchCheck
Set OfficeArchType=64
:EndArchCheck
if %OfficeArchType%==WOW (
FOR /F "tokens=2* delims=	 " %%A IN ('"REG QUERY "HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Microsoft\Office\14.0\Common\InstallRoot" /v Path 2>NUL"') DO SET InstallRoot=%%B
if not defined InstallRoot ( cls & echo Office 2010 VL is not installed... & ping -n 5 127.0.0.1 >nul & goto mainmenu )
Goto:FoundPath
)
FOR /F "tokens=2* delims=	 " %%A IN ('"REG QUERY "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Office\14.0\Common\InstallRoot" /v Path 2>NUL"') DO SET InstallRoot=%%B
if not defined InstallRoot ( cls & echo Office 2010 VL is not installed... & ping -n 5 127.0.0.1 >nul & goto mainmenu )
:FoundPath
1>nul 2>nul net start osppsvc
cscript "%InstallRoot%"ospp.vbs /dstatus |FINDSTR /i "KMS_Client" >NUL
if %errorlevel% EQU 1 ( cls & echo No office 2010 VL detected... & ping -n 5 127.0.0.1 >nul & goto mainmenu )

:IORRT1
mode con: cols=45 lines=11
CLS
echo.
echo.  
echo.    InfiniteOfficeRestoreRearmTask (IORRT) 
echo.    
echo.               A. Install
echo.               B. Uninstall
echo.               C. Restore/Rearm
echo.               D. Status
echo.               E. Trilogy
echo.               F. Exit Trilogy
echo.
  
:CHOOSEACTION1
set /p userinp=    ^   Make your selection: 
set userinp=%userinp:~0,1%
if /i "%userinp%"=="A" goto InstallIORRT
if /i "%userinp%"=="B" goto UninstallIORRT
if /i "%userinp%"=="C" goto Rearm
if /i "%userinp%"=="D" goto StatusIORRT
if /i "%userinp%"=="E" goto MAINMENU
if /i "%userinp%"=="F" goto Exit
echo.Try Again...
GOTO CHOOSEACTION1

:InstallIORRT
CLS
title IORRT 4.0
mode con: cols=45 lines=11
schtasks /query | FINDSTR /I "IORRT" >NUL 
IF %ERRORLEVEL% NEQ 0 (
echo.
) ELSE (
echo IORRT is already installed...
ping -n 5 127.0.0.1 >nul
GOTO IORRT1
)
mode con: cols=62 lines=5
title IORRT 4.0
echo Installing IORRT...
echo.
set onstart=onstart
set daily=daily
VER | FINDSTR /IL "5.1." > NUL
if %ERRORLEVEL% EQU 0 ( for /f "tokens=2,*" %%A in ('"reg query "HKLM\system\controlset001\control\nls\language" /v InstallLanguage"') do set Language=%%B
if '!Language!' EQU '0407' ( set daily=täglich & set onstart=beimstart )
if '!Language!' EQU '0416' ( set daily=diariamente )
if '!Language!' EQU '0415' ( set daily=codziennie & set onstart=przy_uruchomieniu )
if '!Language!' EQU '041f' ( set daily=günlük )
)
schtasks /create /tn "IORRT" /tr "%SystemDrive%\IORRT\IORRT.bat" /sc %daily% /mo 1 /ru "" >NUL 2>&1
if %ERRORLEVEL% NEQ 0 ( cls
echo IORRT task could not be installed
echo.
echo Your language version is not yet compatable with IORRT
echo Seek assistance in Trilogy development thread
ping -n 10 127.0.0.1 >NUL
goto IORRT1
) else ( schtasks /delete /tn "IORRT" /f >NUL )
schtasks /create /tn "Hybrid" /tr "%SystemDrive%\IORRT\IORRT.bat" /sc %onstart% /ru "" >NUL 2>&1
if %ERRORLEVEL% NEQ 0 ( cls
echo Hybrid task could not be installed
echo.
echo Your language version is not yet compatable with IORRT
echo Seek assistance in Trilogy development thread
ping -n 10 127.0.0.1 >NUL
goto IORRT1
) else ( schtasks /delete /tn "Hybrid" /f >NUL )
mkdir "%SystemDrive%\Check"
net stop osppsvc >NUL
xcopy /cheriky "%ALLUSERSPROFILE%\Microsoft\OfficeSoftwareProtectionPlatform" "%SystemDrive%\Check\Backup\Files\Tokens" >NUL
mkdir "%SystemDrive%\Check\Backup\Registry" >NUL
reg save "HKLM\SOFTWARE\Microsoft\OfficeSoftwareProtectionPlatform" %SystemDrive%\Check\Backup\Registry\OfficeSPPInfo.hiv >NUL
net start osppsvc >NUL
IF Exist "%CommonProgramFiles%\microsoft shared\OfficeSoftwareProtectionPlatform\OSPPREARM.exe" (
"%CommonProgramFiles%\microsoft shared\OfficeSoftwareProtectionPlatform\OSPPREARM.exe" >NUL
) ELSE ( "%commonprogramfiles(x86)%\microsoft shared\OfficeSoftwareProtectionPlatform\OSPPREARM.exe" >NUL
)
if errorlevel==0 goto Pass
net stop osppsvc >NUL
xcopy /cheriky "%SystemDrive%\Check\Backup\Files\Tokens" "%ALLUSERSPROFILE%\Microsoft\OfficeSoftwareProtectionPlatform" >NUL
REG DELETE HKLM\SOFTWARE\Microsoft\OfficeSoftwareProtectionPlatform /f >NUL
REG ADD HKLM\SOFTWARE\Microsoft\OfficeSoftwareProtectionPlatform /f >NUL
reg restore "HKLM\SOFTWARE\Microsoft\OfficeSoftwareProtectionPlatform" %SystemDrive%\Check\Backup\Registry\OfficeSPPInfo.hiv >NUL
net start osppsvc >NUL
DEL "%ALLUSERSPROFILE%\Microsoft\OfficeSoftwareProtectionPlatform\Backup.hiv" 2> nul
SET file=%SystemDrive%\Check
IF EXIST %file% attrib -h %file%
RD /S /Q  %file%
cd /d "%InstallRoot%"
echo.
cscript OSPP.VBS /dstatus | FINDSTR /i "Status"
cscript OSPP.VBS /dstatus | FINDSTR /i "Remaining"
echo.
echo No Rearms Detected...
set msg=No rearms detected
call :speak "No rearms detected"
goto :END
:speak
echo On Error Resume Next: CreateObject("SAPI.SpVoice").Speak %1 >"%~dp0vc.vbs"
"%~dp0vc.vbs" & del "%~dp0vc.vbs"
ping -n 5 127.0.0.1 >nul
GOTO IORRT1
:Pass
net stop osppsvc >NUL
xcopy /cheriky "%SystemDrive%\Check\Backup\Files\Tokens" "%ALLUSERSPROFILE%\Microsoft\OfficeSoftwareProtectionPlatform" >NUL
REG DELETE HKLM\SOFTWARE\Microsoft\OfficeSoftwareProtectionPlatform /f >NUL
REG ADD HKLM\SOFTWARE\Microsoft\OfficeSoftwareProtectionPlatform /f >NUL
reg restore "HKLM\SOFTWARE\Microsoft\OfficeSoftwareProtectionPlatform" %SystemDrive%\Check\Backup\Registry\OfficeSPPInfo.hiv >NUL
net start osppsvc >NUL
DEL "%ALLUSERSPROFILE%\Microsoft\OfficeSoftwareProtectionPlatform\Backup.hiv" 2> nul
SET file=%SystemDrive%\Check
IF EXIST %file% attrib -h %file%
RD /S /Q  %file%
mkdir "%SystemDrive%\IORRT"
net stop osppsvc >NUL
xcopy /cheriky "%ALLUSERSPROFILE%\Microsoft\OfficeSoftwareProtectionPlatform" "%SystemDrive%\IORRT\Backup\Files\Tokens" >NUL
mkdir "%SystemDrive%\IORRT\Backup\Registry"
reg save "HKLM\SOFTWARE\Microsoft\OfficeSoftwareProtectionPlatform" %SystemDrive%\IORRT\Backup\Registry\OfficeSPPInfo.hiv >NUL
net start osppsvc >NUL
SET file=%SystemDrive%\IORRT\IORRT.bat
IF EXIST %file% attrib -h %file% 
echo @echo off >%file%
echo net stop osppsvc >>%file%
echo xcopy /cheriky "%SystemDrive%\IORRT\Backup\Files\Tokens" "%ALLUSERSPROFILE%\Microsoft\OfficeSoftwareProtectionPlatform" >>%file%
echo REG DELETE HKLM\SOFTWARE\Microsoft\OfficeSoftwareProtectionPlatform /f >>%file%
echo REG ADD HKLM\SOFTWARE\Microsoft\OfficeSoftwareProtectionPlatform /f >>%file%
echo reg restore "HKLM\SOFTWARE\Microsoft\OfficeSoftwareProtectionPlatform" %SystemDrive%\IORRT\Backup\Registry\OfficeSPPInfo.hiv >>%file%
echo net start osppsvc >>%file%
echo IF Exist "%COMMONPROGRAMFILES%\microsoft shared\OfficeSoftwareProtectionPlatform\OSPPREARM.exe" ( >>%file%
echo "%COMMONPROGRAMFILES%\microsoft shared\OfficeSoftwareProtectionPlatform\OSPPREARM.exe" >>%file%
echo ) ELSE ( "%COMMONPROGRAMFILES(X86)%\microsoft shared\OfficeSoftwareProtectionPlatform\OSPPREARM.exe" >>%file%
echo ) >>%file%
echo schtasks /delete /tn "IORRT" /f >>%file%
echo schtasks /create /tn "IORRT" /tr "%SystemDrive%\IORRT\IORRT.bat" /sc %daily% /mo 1 /ru "" >>%file%
IF Exist "%CommonProgramFiles%\microsoft shared\OfficeSoftwareProtectionPlatform\OSPPREARM.exe" (
"%CommonProgramFiles%\microsoft shared\OfficeSoftwareProtectionPlatform\OSPPREARM.exe" >NUL
) ELSE ( "%commonprogramfiles(x86)%\microsoft shared\OfficeSoftwareProtectionPlatform\OSPPREARM.exe" >NUL
)
attrib +h "%SystemDrive%\IORRT"
schtasks /create /tn "Hybrid" /tr "%SystemDrive%\IORRT\IORRT.bat" /sc %onstart% /ru "" >NUL
schtasks /create /tn "IORRT" /tr "%SystemDrive%\IORRT\IORRT.bat" /sc %daily% /mo 1 /ru "" >NUL
echo.
title IORRT 4.0
cd /d "%InstallRoot%"
echo.
echo.
cscript OSPP.VBS /dstatus | FINDSTR /i "Status"
cscript OSPP.VBS /dstatus | FINDSTR /i "Remaining"
echo.
echo Installation Successful...
set msg=Installation Successful
call :speak "Installation Successful"
goto :END
:speak
echo On Error Resume Next: CreateObject("SAPI.SpVoice").Speak %1 >"%~dp0vc.vbs"
"%~dp0vc.vbs" & del "%~dp0vc.vbs"
ping -n 5 127.0.0.1 >nul
GOTO IORRT1

:UninstallIORRT
schtasks /query | FINDSTR /I "IORRT" >NUL
IF '%ERRORLEVEL%' EQU '0' (
echo.
) ELSE (
mode con: cols=45 lines=10
title IORRT 4.0
echo IORRT is already uninstalled...
ping -n 5 127.0.0.1 >nul
GOTO IORRT1
)
mode con: cols=62 lines=5
title IORRT 4.0
echo Uninstalling IORRT...
echo.
net stop osppsvc >NUL
xcopy /cheriky "%SystemDrive%\IORRT\Backup\Files\Tokens" "%ALLUSERSPROFILE%\Microsoft\OfficeSoftwareProtectionPlatform" >NUL
REG DELETE HKLM\SOFTWARE\Microsoft\OfficeSoftwareProtectionPlatform /f >NUL
REG ADD HKLM\SOFTWARE\Microsoft\OfficeSoftwareProtectionPlatform /f >NUL
reg restore "HKLM\SOFTWARE\Microsoft\OfficeSoftwareProtectionPlatform" %SystemDrive%\IORRT\Backup\Registry\OfficeSPPInfo.hiv >NUL
net start osppsvc >NUL
DEL "%ALLUSERSPROFILE%\Microsoft\OfficeSoftwareProtectionPlatform\Backup.hiv" 2> nul
SET file=%SystemDrive%\IORRT
IF EXIST %file% attrib -h %file%
rd /S /Q  %file%
schtasks /delete /tn "Hybrid" /f >NUL
schtasks /delete /tn "IORRT" /f >NUL
cd /d "%InstallRoot%"
echo.
echo.
cscript OSPP.VBS /dstatus | FINDSTR /i "Status" 
cscript OSPP.VBS /dstatus | FINDSTR /i "Remaining"
echo.
echo Successfully Uninstalled...
set msg=Successfully Uninstalled
call :speak "Successfully Uninstalled"
goto :END
:speak
echo On Error Resume Next: CreateObject("SAPI.SpVoice").Speak %1 >"%~dp0vc.vbs"
"%~dp0vc.vbs" & del "%~dp0vc.vbs"
ping -n 5 127.0.0.1 >nul
GOTO IORRT1

:Rearm
mode con: cols=45 lines=11
title IORRT 4.0
schtasks /query | FINDSTR /I "IORRT" >NUL 
IF %ERRORLEVEL% EQU 0 ( echo.
) ELSE (
echo IORRT is not installed...
ping -n 5 127.0.0.1 >nul
GOTO IORRT1
)
mode con: cols=64 lines=6
echo Restoring and rearming...
echo.
set daily=daily
VER | FINDSTR /IL "5.1." > NUL
if %ERRORLEVEL% EQU 0 ( for /f "tokens=2,*" %%A in ('"reg query "HKLM\system\controlset001\control\nls\language" /v InstallLanguage"') do set Language=%%B
if '!Language!' EQU '0407' ( set daily=täglich )
if '!Language!' EQU '0416' ( set daily=diariamente )
if '!Language!' EQU '0415' ( set daily=codziennie )
if '!Language!' EQU '041f' ( set daily=günlük )
)
net stop osppsvc >NUL
xcopy /cheriky "C:\IORRT\Backup\Files\Tokens" "%SystemDrive%\ProgramData\Microsoft\OfficeSoftwareProtectionPlatform" >NUL
REG DELETE HKLM\SOFTWARE\Microsoft\OfficeSoftwareProtectionPlatform /f >NUL
REG ADD HKLM\SOFTWARE\Microsoft\OfficeSoftwareProtectionPlatform /f >NUL
reg restore "HKLM\SOFTWARE\Microsoft\OfficeSoftwareProtectionPlatform" %SystemDrive%\IORRT\Backup\Registry\OfficeSPPInfo.hiv >NUL
net start osppsvc >NUL
IF Exist "%CommonProgramFiles%\microsoft shared\OfficeSoftwareProtectionPlatform\OSPPREARM.exe" (
"%CommonProgramFiles%\microsoft shared\OfficeSoftwareProtectionPlatform\OSPPREARM.exe" >NUL
) ELSE ( "%commonprogramfiles(x86)%\microsoft shared\OfficeSoftwareProtectionPlatform\OSPPREARM.exe" >NUL
)
schtasks /delete /tn "IORRT" /f >NUL
schtasks /create /tn "IORRT" /tr "%SystemDrive%\IORRT\IORRT.bat" /sc %daily% /mo 1 /ru "" >NUL
cd /d "%InstallRoot%"
cscript OSPP.VBS /dstatus | FINDSTR /i "Status"
cscript OSPP.VBS /dstatus | FINDSTR /i "Remaining"
echo.
schtasks /query | FINDSTR /I "IORRT"
IF ERRORLEVEL 1 echo IORRT is not installed...
ping -n 5 127.0.0.1 >nul
GOTO IORRT1

:StatusIORRT
mode con: cols=64 lines=6
title IORRT 4.0
cd /d "%InstallRoot%"
cscript OSPP.VBS /dstatus | FINDSTR /i "Status"
cscript OSPP.VBS /dstatus | FINDSTR /i "Remaining"
echo.
schtasks /query | FINDSTR /I "IORRT"
IF ERRORLEVEL 1 echo IORRT is not installed...
ping -n 5 127.0.0.1 >nul
GOTO IORRT1
endlocal

:ACS5.5T
title ACS5.5T 4.5
mode con: cols=45 lines=12
CLS
echo.
echo.  
echo.     AdobeCreativeSuite5.5Tool (ACS5.5T)
echo.    
echo.               A. Install
echo.               B. Uninstall
echo.               C. Keys
echo.               D. Status
echo.               E. Instructions
echo.               F. Trilogy
echo.               G. Exit Trilogy
echo.
  
:CHOOSEACTION3
set /p userinp=    ^   Make your selection: 
set userinp=%userinp:~0,1%
if /i "%userinp%"=="A" goto InstallACS5.5T
if /i "%userinp%"=="B" goto UninstallACS5.5T
if /i "%userinp%"=="C" goto KeysACS5.5T
if /i "%userinp%"=="D" goto StatusACS5.5T
if /i "%userinp%"=="E" goto InstructionsACS5.5T
if /i "%userinp%"=="F" goto MAINMENU
if /i "%userinp%"=="G" goto Exit
echo.Try Again...
GOTO CHOOSEACTION3

:InstallACS5.5T
CLS
SET hosts=%windir%\system32\drivers\etc\hosts
findstr /i "3dns-2.adobe.com" %hosts% >nul
IF %ERRORLEVEL% EQU 0 (
echo ACS5.5T is already installed...
ping -n 5 127.0.0.1 >nul
goto ACS5.5T
)
attrib -r %hosts%
echo. >>%hosts%
FOR %%A IN (
3dns-2.adobe.com
3dns-3.adobe.com
activate.adobe.com
activate.wip3.adobe.com
activate-sea.adobe.com
activate-sjc0.adobe.com
adobe-dns.adobe.com
adobe-dns-2.adobe.com
adobe-dns-3.adobe.com
adobeereg.com
ereg.adobe.com
ereg.wip3.adobe.com
hl2rcv.adobe.com
practivate.adobe.com
wip3.adobe.com
wwis-dubc1-vip60.adobe.com
www.adobeereg.com
) DO (
 echo 127.0.0.1 %%A >>%hosts%
)
attrib +r %hosts%
echo ACS5.5T has been successfully installed...
ping -n 5 127.0.0.1 >nul
GOTO ACS5.5T

:UninstallACS5.5T
CLS
SET hosts=%windir%\system32\drivers\etc\hosts
findstr /i "3dns-2.adobe.com" %hosts% >nul
IF %ERRORLEVEL% NEQ 0 (
echo ACS5.5T is already uninstalled...
ping -n 5 127.0.0.1 >nul
goto ACS5.5T
)
attrib -r %hosts%
FOR %%A IN (
3dns-2.adobe.com
3dns-3.adobe.com
activate.adobe.com
activate.wip3.adobe.com
activate-sea.adobe.com
activate-sjc0.adobe.com
adobe-dns.adobe.com
adobe-dns-2.adobe.com
adobe-dns-3.adobe.com
adobeereg.com
ereg.adobe.com
ereg.wip3.adobe.com
hl2rcv.adobe.com
practivate.adobe.com
wip3.adobe.com
wwis-dubc1-vip60.adobe.com
www.adobeereg.com
) DO (
 MOVE %hosts% hosts.bak >NUL
 FINDSTR /V /C:"%%A" hosts.bak > %hosts%
 DEL /F /Q hosts.bak
) 
attrib +r %hosts%
echo ACS5.5T has been successfully uninstalled...
ping -n 5 127.0.0.1 >nul
GOTO ACS5.5T

:KeysACS5.5T
mode con: cols=33 lines=16
echo   CS5.5 keys
echo.
echo   XXXX-XXXX-XXXX-XXXX-XXXX-XXXX
echo   XXXX-XXXX-XXXX-XXXX-XXXX-XXXX
echo   XXXX-XXXX-XXXX-XXXX-XXXX-XXXX
echo   XXXX-XXXX-XXXX-XXXX-XXXX-XXXX
echo   XXXX-XXXX-XXXX-XXXX-XXXX-XXXX
echo   XXXX-XXXX-XXXX-XXXX-XXXX-XXXX
echo   XXXX-XXXX-XXXX-XXXX-XXXX-XXXX
echo   XXXX-XXXX-XXXX-XXXX-XXXX-XXXX
echo   XXXX-XXXX-XXXX-XXXX-XXXX-XXXX
echo   XXXX-XXXX-XXXX-XXXX-XXXX-XXXX
echo   XXXX-XXXX-XXXX-XXXX-XXXX-XXXX
echo   XXXX-XXXX-XXXX-XXXX-XXXX-XXXX
echo.
pause
GOTO ACS5.5T

:StatusACS5.5T
mode con: cols=38 lines=19
START "" "CMD /C color 06 & type %systemroot%\system32\drivers\etc\hosts & >NUL ping -n 5 127.0.0.1"
GOTO ACS5.5T

:InstructionsACS5.5T
mode con: cols=85 lines=15
echo  1. Select the install option
echo.
echo  2. Sign up at http://www.adobe.com/products/creativesuite/mastercollection.html
echo.
echo  3. Remember your ID and password then download the free trial for Master Collection
echo.
echo  4. Run the set-up file
echo.
echo  5. Select keys option
echo.
echo  6. Enter your ID and password then install
echo.
echo  * ASC5.5T does not support CS live online services
echo.
pause
GOTO ACS5.5T

:DetailsandLinks
title Details and Links
mode con: cols=107 lines=27
echo  Trilogy 4.2
echo.
echo  IR5 - The Official Windows 7 Rearm Solution
echo.
echo  * IR5 allows you to use windows 7 and servers without patches, cracks, loaders, activators or leaked keys
echo  * IR5 task runs silently once every 30 days
echo  * IR5 keeps you in trial and in trial you are always genuine 
echo  * IR5 works with all updates and service packs
echo  * IR5 supports all Windows 7/R2, languages, versions, editions, 32/64bit
echo  * IR5 does not modify any system files and never causes restart problems
echo.
echo  IORRT - The Official Office 2010 VL Rearm Solution
echo.
echo  * IORRT allows you to use office 2010 VL without patches, cracks, activators or leaked keys
echo  * IORRT works with all updates and service packs
echo  * IORRT gives A.I. voice confirmation
echo  * IORRT and Hybrid tasks both run silently
echo.
echo  ACS5.5T - The Official Adobe CS5.5 MC Solution
echo.
echo  * Adds hosts file entries
echo.
echo  Trilogy 4.2 Development thread
echo.
echo  * http://forums.mydigitallife.info/threads/24744-Trilogy-4.2
echo.
pause
GOTO MAINMENU

:ISO
title ISO Installation Basics
mode con: cols=112 lines=29
echo  Windows 7 ISO...
echo.
echo  You must burn a windows 7 ISO to a USB (4GB) or DVD-R with UltraISO
echo.
echo  For USB (4GB)
echo.
echo  Double click on the windows 7 ISO then click the bootable tab then write disk image then write
echo.
echo  For DVD-R
echo.
echo  1. Right-click the ISO image then click UltraISO then Burn to Disc
echo  2. Select a minimum Write Speed (4x recommended)
echo  3. Click on the Burn button
echo.
echo  Then you can upgrade or clean install from inside windows or clean install from boot
echo.
echo  4. You can upgrade from Vista, but if you have XP a clean install will be necessary
echo.
echo  5. When installing windows 7 just bypass entering any key then un-check the activate online box and click next
echo.
echo  6. Install with updates and internet on
echo.
echo  Office 2010 VL ISO...
echo.
echo  1. Right click the office ISO then choose UltraISO and mount the Office ISO image
echo.
echo  2. Then in computer open the drive office is mounted on and install
echo.
pause
GOTO MAINMENU

:Exit
exit