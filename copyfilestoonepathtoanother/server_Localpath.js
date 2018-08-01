var XLSX = require('xlsx')
const fs = require('fs');
const path = require('path');

var workbook = XLSX.readFile('product.xls');
var sheet_name_list = workbook.SheetNames;
var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

xlData.forEach(function(data){
	console.log(data.ISBN);
	let datapath = data.ISBN;
	let filesname = [
	{path: datapath + "\.pdf"},
	{path: datapath + "\.jpg"},
	{path: datapath + "\.epub"}
	]
filesname.forEach(function(item){
	console.log(item.path);
	let filename = item.path;
	let src = path.join(__dirname, filename);
	let destDir = path.join(__dirname, 'test');
fs.access(destDir, (err) => {
  if(err)
    fs.mkdirSync(destDir);

  copyFile(src, path.join(destDir, filename));
});


function copyFile(src, dest) {

  let readStream = fs.createReadStream(src);

  readStream.once('error', (err) => {
    console.log(err);
  });

  readStream.once('end', () => {
    console.log('done copying');
  });

  readStream.pipe(fs.createWriteStream(dest));
}
});
})	
	






