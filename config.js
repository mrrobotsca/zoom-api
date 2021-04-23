const env = process.env.NODE_ENV || 'production'

//insert your API Key & Secret for each environment, keep this file local and never push it to a public repo for security purposes.
const config = {
	development :{
		APIKey : 'O637iwu8R4m4YU0OHo6g8A',
		APISecret : 'SEarvFR7vxHXGlRkC5XsPPaoE13CR0x7eFVs'
	},
	production:{	
		APIKey : 'O637iwu8R4m4YU0OHo6g8A',
		APISecret : 'SEarvFR7vxHXGlRkC5XsPPaoE13CR0x7eFVs'
	}
};

module.exports = config[env]
