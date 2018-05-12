const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
	const authHeader = req.headers.authorization;
	
	if(!authHeader)
		return res.status(401).send({ error: 'No token provided' });
	
	//verificar se o token tem as duas partes
	//1.parte Bearer
	//2.parte Hash
	const parts = authHeader.split(' ');
	
	if(!parts.length === 2)
		return res.status(401).send({ error: 'Token error'});
	
	//desestruturação de um array, sendo que o array contem 2 partes
	const [ scheme, token ] = parts;
	
	/*regex para verificar a palavra Bearer, palavra padrao quando se utiliza em jwt
    ^ inicio da verificação 
	$ final da verificação
    i case insensitive	
    */
	if(!/^Bearer$/i.test(scheme))
		return res.status(401).send({ error: 'Token malformatted'});
	
	//faz verificacao do token
	jwt.verify(token, authConfig.secret, (err, decoded) => {
		if(err)
			return res.status(401).send({ error: 'Token invalid' });
		
		//token valido registra o usar id que foi gerado na autenticacao do token
		req.userId = decoded.id;
		
		//passa para o proxima continuacao de requisicao
		return next();
	});
};
	