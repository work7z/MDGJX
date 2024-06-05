!include WinVer.nsh
Caption "${PRODUCT_NAME} ${VERSION}"


!macro customUnInstall
    ${IfNot} ${isUpdated}
        MessageBox MB_YESNO "是否需要彻底删除全局配置（$PROFILE\.mdgjx\）？$\n$\n\
            Do you want to delete the global configuration ($PROFILE\.mdgjx\)?$\n" \
            /SD IDYES IDYES AcceptedRMConf IDNO SkippedRMConf
            AcceptedRMConf:
                RMDir /r "$PROFILE\.mdgjx\"
            SkippedRMConf:
    ${EndIf}

    ${IfNot} ${isUpdated}
        MessageBox MB_YESNO "是否需要彻底删除默认工作空间（$PROFILE\MDGJX\）？$\n$\n\
            Do you want to completely delete the default workspace ($PROFILE\MDGJX\)?$\n" \
            /SD IDNO IDYES AcceptedRMWorkspace IDNO SkippedRMWrokspace
            AcceptedRMWorkspace:
                RMDir /r "$PROFILE\MDGJX\"
            SkippedRMWrokspace:
    ${EndIf}
!macroend

# https://nsis.sourceforge.io/FindIt:_Simple_search_for_file_/_directory
!macro un.FindIt In For Result
Push "${In}"
Push "${For}"
 Call un.FindIt
Pop "${Result}"
!macroend
!define un.FindIt "!insertmacro un.FindIt"

Function un.FindIt
Exch $R0
Exch
Exch $R1
Push $R2
Push $R3
Push $R4
Push $R5
Push $R6

 StrCpy $R6 -1
 StrCpy $R3 1

 Push $R1

 nextDir:
  Pop $R1
  IntOp $R3 $R3 - 1
  ClearErrors
   FindFirst $R5 $R2 "$R1\*.*"

 nextFile:
  StrCmp $R2 "." gotoNextFile
  StrCmp $R2 ".." gotoNextFile

  StrCmp $R2 $R0 0 isDir
   StrCpy $R6 "$R1\$R2"
   loop:
    StrCmp $R3 0 done
     Pop $R1
     IntOp $R3 $R3 - 1
     Goto loop

 isDir:

  IfFileExists "$R1\$R2\*.*" 0 gotoNextFile
  IntOp $R3 $R3 + 1
  Push "$R1\$R2"

 gotoNextFile:
  FindNext $R5 $R2
  IfErrors 0 nextFile

 done:
  FindClose $R5
  StrCmp $R3 0 0 nextDir
  StrCpy $R0 $R6

Pop $R6
Pop $R5
Pop $R4
Pop $R3
Pop $R2
Pop $R1
Exch $R0
FunctionEnd