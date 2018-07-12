function main() {
  
  var height = prompt("Almost done, just tell me the height of this artwork to be\n(0 will be converted to 506)");

  if ((!(typeof height == "number")) && (!(height % 1 == 0))) {
    alert("I wanted a real number...");
    return;
  }
  
  if (height == 0) {
    height = 506;
  }
  
  app.documents.add(616, height, 72, "ProArtwork", NewDocumentMode.RGB, DocumentFill.TRANSPARENT);
  
  
}

main();