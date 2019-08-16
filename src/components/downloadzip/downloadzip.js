
/* Download File | https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.4/jszip.min.js 
*************************************************************************************/
function downloadZip() {

  const download = document.querySelector('[data-download]');

  download.addEventListener("click",function () {

    // Get Values
    var name            =   document.querySelector('#applicationBotNameId').value;
    var exchange        =   document.querySelector('#applicationTradingExchangeId').value;
    var market          =   document.querySelector('#pairsMarketId').value;

    name = name.replace(/\W+/g, '-').toLowerCase();
    exchange = exchange.replace(/\W+/g, '-').toLowerCase();

    // function toTitleCase(str) {
    //   return str.replace(/\w\S*/g, function(txt) { 
    //     return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    //   });
    // }

    // Get Files
    const settings        =   document.querySelector('#settingsSelectMenu').value;
    const application     =   document.querySelector('#applicationFile').textContent; 
    const pairs           =   document.querySelector('#pairsFile').textContent;
    const dca             =   document.querySelector('#dcaFile').textContent;
    const indicators      =   document.querySelector('#indicatorsFile').textContent;

    var zip = new JSZip();
    var folder = zip.folder("trading");
    
    zip.file("application.properties", application);
    folder.file("PAIRS.properties", pairs);
    folder.file("DCA.properties", dca);
    folder.file("INDICATORS.properties", indicators);
    

    
    if(name) {
      zip.generateAsync({type:"blob"})
        .then(function(zip) {
          saveAs(zip, `${name}__${exchange + market}.zip`);
      });
    }
    
    else {
      zip.generateAsync({type:"blob"})
        .then(function(zip) {
          saveAs(zip, `PTplus__${exchange + market}.zip`);
      });
    }


  });

}

downloadZip();