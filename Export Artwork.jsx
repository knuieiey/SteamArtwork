function main() {
  
  if (app.documents.length < 1) {
    alert("No projects open...");
    return;
  }
  
  var mainDoc = app.activeDocument;
  var docHeight = mainDoc.height.as('px');
  var docWidth = mainDoc.width.as('px');
  
  if (docWidth != 616) {
    alert("Wrong template; has to be 616px wide.\n(506 center artwork + 10 white space + 100 right artwork)");
    return;
  }
  
  selArtworkMid = [[0,0], [0,506], [docHeight,506], [docHeight,0]];
  selArtworkRight= [[docWidth-100,0], [docWidth,0], [docWidth,docHeight], [docWidth-100,docHeight]];
  
  var fileForName = File("Artwork.png");
  var pathFile = fileForName.saveDlg("Save Steam Artwork", "Steam Artwork:*.png");
  
  mainDoc.selection.deselect();
  mainDoc.selection.select(selArtworkMid);
  mainDoc.selection.copy(true);
  stepHistoryBack();
  var artworkMidDoc = app.documents.add(
                        506,
                        docHeight,
                        72,
                        "ArtworkMiddle",
                        NewDocumentMode.RGB);
  app.activeDocument = artworkMidDoc;
  artworkMidDoc.paste(false);
  
  app.activeDocument = mainDoc;
  
  mainDoc.selection.select(selArtworkRight);
  mainDoc.selection.copy(true);
  stepHistoryBack();
  var artworkRightDoc = app.documents.add(
                          100,
                          docHeight,
                          72,
                          "ArtworkRight",
                          NewDocumentMode.RGB);
  app.activeDocument = artworkRightDoc;
  artworkRightDoc.paste(false);
  
  app.activeDocument = artworkMidDoc;
  saveDocument(artworkMidDoc, pathFile, 1);
  artworkMidDoc.close(SaveOptions.DONOTSAVECHANGES);
  
  app.activeDocument = artworkRightDoc;
  saveDocument(artworkRightDoc, pathFile, 2);
  artworkRightDoc.close(SaveOptions.DONOTSAVECHANGES);
  
  app.activeDocument = mainDoc;
  
  
  function saveDocument(document, pathFile, suffix) {
    var fileName = pathFile.fullName.substring(0, pathFile.fullName.lastIndexOf(".")) + suffix + ".png";
    var artworkFile = File(fileName);
    pngSaveOptions = new PNGSaveOptions();
    document.saveAs(artworkFile, pngSaveOptions, true, Extension.LOWERCASE);
  }
  
  function stepHistoryBack() {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putEnumerated(charIDToTypeID("HstS"), charIDToTypeID("Ordn"), charIDToTypeID("Prvs"));
    desc.putReference(charIDToTypeID("null"), ref);
    executeAction(charIDToTypeID("slct"), desc, DialogModes.NO);
  } 
}

main();