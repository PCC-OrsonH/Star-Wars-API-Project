@rem This script pushes master branch to our website
@rem
@rem OrsonH
@rem __________________________________________________________________________

@echo off
if not "%Verbose%"=="" echo on
@setlocal

set gitdir=c:\tools\git
set path=%gitdir%\cmd;%path%
git push azure master

@endlocal
