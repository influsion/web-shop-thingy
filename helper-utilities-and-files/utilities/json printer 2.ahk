IniRead, indx, lastindex.ini, index, lastIndex
;indxTracker := "Last id: " . indx

Gui, Add, Edit, x2 y3 w440 h30 vName , Name
Gui, Add, Edit, x2 y83 w440 h80 vDesc, Description
Gui, Add, Edit, x2 y173 w440 h30 vPrice , Price
Gui, Add, Edit, x2 y213 w440 h30 vCat , Category
Gui, Add, Edit, x2 y253 w440 h30 vSubcat , Subcategory
Gui, Add, Edit, x2 y43 w440 h30 vImg , Image
Gui, Add, Edit, x2 y333 w440 h30 vBrand , Brand
Gui, Add, Edit, x2 y293 w440 h30 vOrigin, Origin
Gui, Add, Button, x2 y373 w440 h50 gGetValues , JSONIFY!
Gui, Add, Text, x12 y433 w420 h30 vIdStatus , Current index: %indx%
; Generated using SmartGUI Creator for SciTE
Gui, Show, w453 h483, Json Printer v. 0.0.2 by Sage
return


GetValues:
gui, submit, NoHide
location := A_ScriptDir "\items.json"

json = {`n"id": "%indx%",`n"name": "%Name%",`n"image": "%Img%",`n"description": "%Desc%",`n"price": "%Price%",`n"category": "%Cat%",`n"subcategory": "%Subcat%",`n"brand": "%Brand%",`n"origin": "%Origin%"`n},`n
FileAppend, %json%, %location%
indx++

GuiControl, , IdStatus, Current index: %indx% 

IniWrite, %indx%, lastindex.ini, index, lastIndex
return



GuiClose:
ExitApp


