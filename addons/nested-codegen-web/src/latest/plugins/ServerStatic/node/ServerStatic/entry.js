const handler = require('serve-handler');
const { fn_create_api_spec_inst } = require('../common/spec');
const common_utils = require('../common/utils');
const http = require('http');
const { promisify } = require('util');
const { parse } = require('url');
const compression = require('compression');
const compressionHandler = promisify(compression());
const _ = require('lodash');
const https = require('https');
const { fs } = require('../common/utils');
const s_fs = require('fs');
common_utils.log.info(`Launching...`);

let {
	fn_save_status_file,
	config_file,
	config_file_json,
	status_file,
	status_file_json,
} = common_utils.init.getAllFileInfo();

function parseFn(str) {
	if (_.isNil(str) || str == '') {
		return [];
	} else {
		return _.map(
			_.filter(JSON.parse(str), (x, d, n) => {
				if (_.isString(x)) {
					x = _.trim(x);
					if (x == '' || x.startsWith('//') || x.startsWith('#')) {
						return false;
					} else {
						return true;
					}
				}
				return true;
			}),
			(x) => {
				if (_.isString(x)) {
					return _.trim(x);
				} else {
					return x;
				}
			}
		);
	}
}

let m_config = config_file_json;
let val_DIRECTORY_LISTINGS_ARRAY_STR = parseFn(
	m_config['DIRECTORY_LISTINGS_ARRAY_STR']
);
let config = {
	// public: '/Users/jerrylai/mincontent/PersonalProjects/denote-fe/public_repository/server/node/common',
	public: '/Users/jerrylai/mincontent/PersonalProjects/denote-fe/public_repository/DSL',
	cleanUrls: m_config['CLEAN_URLS_BOOL'], // if true, then will trace .html affix
	rewrites: m_config['REWRITE_BOOL']
		? []
		: parseFn(m_config['REWRITE_ARRAY_STR']),
	redirects: m_config['REDIRECT_BOOL']
		? []
		: parseFn(m_config['REDIRECT_ARRAY_STR']),
	headers: m_config['HEADERS_BOOL']
		? []
		: parseFn(m_config['HEADERS_ARRAY_STR']),
	directoryListing:
		m_config['USE_STATIC_MODE'] === true
			? !_.isEmpty(val_DIRECTORY_LISTINGS_ARRAY_STR)
				? val_DIRECTORY_LISTINGS_ARRAY_STR
				: true
			: false,
	unlisted: parseFn(m_config['UNLISTED_ARRAY_STR']),
	trailingSlash: m_config['TRAILING_SLASH'], // if folder is a folder, then will append / as its affix value
	renderSingle: m_config['RENDER_SIGNLE_FILE'], // if there's only one single file in the folder, then will return its value directly
	symlinks: m_config['USE_SYMLINKS'],
	compress: m_config['USE_COMPRESS_MODE'],
	etag: m_config['USE_ETAG'],
};

config.public = config_file_json['PUBLIC_DIR'] || '';

let compress = config.compress;
let serverHandler = async (request, response) => {
	if (compress) {
		await compressionHandler(request, response);
	}
	return handler(request, response, config);
};
let is_ssl_mode = m_config['USE_SSL_MODE'];
const server = is_ssl_mode
	? https.createServer(
			{
				key: m_config[`SSL_PUBLIC_VALUE`],
				cert: m_config['SSL_PRIVATE_VALUE'],
				passphrase: m_config[`SSL_PHRASE_VALUE`] || '',
			},
			serverHandler
	  )
	: http.createServer(serverHandler);

server.on('error', function (e) {
	// Handle your error here
	let m_arr = [
		`Cannot boot http(s) server, the message is`,
		e.name,
		e.message,
	];
	common_utils.log.error(...m_arr);
	console.log(e);
	status_file_json.isOk = false;
	status_file_json.isErr = true;
	status_file_json.error = _.join(m_arr, ' ');
	fn_save_status_file();
	process.exit(-1);
});

let port = config_file_json['LISTEN_PORT'];

server.listen(port, () => {
	common_utils.log.info(
		'Running at ' +
			(is_ssl_mode ? 'https' : 'http') +
			'://localhost:' +
			port
	);
	status_file_json.isOk = true;
	fn_save_status_file();
});

module.exports = fn_create_api_spec_inst({
	api: {},
});
