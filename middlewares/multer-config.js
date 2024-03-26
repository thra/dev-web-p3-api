const multer = require('multer')

const MIME_TYPE = {
	'image/jpg': 'jpg',
	'image/jpeg': 'jpg',
	'image/png': 'png',
	'image/webp': 'webp',
}

const storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, process.env.NODE_ENV === 'dev' ? './images' : `${process.env.LOCAL_PATH}/images`)
	},
	filename: (req, file, callback) => {
		const filename = file.originalname.split(' ').join('_')
		const filenameArray = filename.split('.')
		filenameArray.pop()
		const filenameWithoutExtention = filenameArray.join('.')
		const extension = MIME_TYPE[file.mimetype]
		callback(null, filenameWithoutExtention + Date.now() + '.' + extension)
	}
})

module.exports = multer({ storage }).single('image')
