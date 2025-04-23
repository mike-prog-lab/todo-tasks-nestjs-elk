export default () => ({
	port: parseInt(process.env.PORT ?? '3000', 10),
	logger: process.env.LOGGER || 'console',
	database: {
		mongodb: {
			uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/todo',
		},
		elasticsearch: {
			node: process.env.ELASTICSEARCH_NODE || 'http://localhost:9200',
		},
	},
	jwt: {
		secret: process.env.JWT_SECRET || 'your-secret-key',
		expiresIn: process.env.JWT_EXPIRES_IN || '1d',
	},
	logstash: {
		host: process.env.LOGSTASH_HOST || 'localhost',
		port: parseInt(process.env.LOGSTASH_PORT ?? '5005', 10) || 5000,
	},
});