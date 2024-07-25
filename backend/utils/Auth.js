const Bcrypt = require('bcrypt')

const AuthUtils = {}
	AuthUtils.comparePassword = async(
		candidatePassword,
		userPassword
	)=>{
		return new Promise((resolve, reject) => {
			Bcrypt.compare(candidatePassword, userPassword, (err, isSame) => {
				if (err) {
					reject(err);
				} else if (!isSame) {
					resolve(false);
				} else {
					resolve(true);
				}
			});
		});
	}

	AuthUtils.encryptPassword=async(password)=> {
		return new Promise((resolve, reject) => {
			Bcrypt.hash(password, 10, (err, hash) => {
				if (err) {
					reject(err);
				} else {
					resolve(hash);
				}
			});
		});
	}

module.exports = AuthUtils
