const fs = require('fs');
const path = require('path');

module.exports = app => {
	/*
	vai ler todos os arquivos da pasta controller, menos o index.js
	isso reduz a necessidade de ficar carregando cada controller node
	index.js principal da aplicação
	*/
	fs
	.readdirSync(__dirname)
	.filter(file => ((file.indexOf('.') !== 0 && (file !== "index.js")))) 
	.forEach(file => require(path.resolve(__dirname, file))(app));	
};