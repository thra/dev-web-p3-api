module.exports = {
	dialect: "sqlite",
	storage: process.env.NODE_ENV !== 'prod' ? './database.sqlite' : '/home/ubuntu/dev-web-p3-api-prod/database.sqlite'
};
