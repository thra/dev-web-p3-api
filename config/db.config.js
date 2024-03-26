module.exports = {
	dialect: "sqlite",
	storage: process.env.NODE_ENV !== 'prod' ? './database.sqlite' : `${process.env.LOCAL_PATH}/database.sqlite`
};
