var config = {};

config.twitter = {};
config.redis = {}; //  cashe server
config.port = {};
config.https = {}; // tls(ssl)
config.app = {}; 
config.gcm = {};  
config.db = {};
config.pool = {};
config.message = {};
config.hashkey = {};
config.rdsproperties = {};
config.mail = {};
config.etc = {};
config.web = {};

config.default_stuff =  ['red','green','blue','apple','yellow','orange','politics'];
config.twitter.user_name = process.env.TWITTER_USER || 'username';
config.twitter.password=  process.env.TWITTER_PASSWORD || 'password';

// redis 
config.redis.uri = process.env.DUOSTACK_DB_REDIS;
config.redis.host = 'localhost';
config.redis.port = 7779; // 6379 default
config.redis.password = '^&mroSOFT!@google.com'; 


// http(s) port 
config.port.http = 80;
config.port.https = 443; // 443

// ssl key, cert path 
// https://www.kicassl.com/mycert/mycertmain/formMyCertMain.sg
// freeSSL for 30 days
config.https.keypath = './ssl/key.pem'; // 개인키 
config.https.certpath = './ssl/cert.pem'; // 인증서 
config.https.cert_chain1 = './ssl/ChainCA1.crt'; 
config.https.cert_chain2 = './ssl/ChainCA2.crt'; 
config.https.cert_root = './ssl/RootCA.crt'; 
config.https.passphrase = '62197394';

//config.https.domain = 'http://175.198.115.135:1339';
//config.https.domain = 'http://localhost';
config.https.domain = '';


// app 
config.app.sessionsecret = '^&mroSOFT!@google.com';

// gcm
config.gcm.server_api_key = "";
config.gcm.priority = 'high';
config.gcm.delayWhileIdle = false;
config.gcm.timeToLive = 18000;   

// db 
config.db.host = "";
config.db.user = "";
config.db.port = '3306';
config.db.password = "";
config.db.defaultdatabase = "";

// db pool
config.pool.min = 5;
config.pool.max = 10000; // my.ini(my.cnf) max_connection 
config.pool.idleTimeoutMillis = 30000;

// hash key set
config.hashkey.msgunqid = ""; // 에약문자의 결과(다비이스 수신 결과) 
config.hashkey.msgunqid_gcm = "";// web전송 후, GCm 오류 결과 처리(WEB) 


// message
config.message.resultOK = "1";
config.message.resultFail = "-1";
config.message.reservedData = "2";
config.message.instancedData = "1";
config.message.title = "PUSHpots";


//mail
config.mail.findpass_mail_title = "Pushpots 비밀번호 변경 메일입니다.";
config.mail.newuser_auth_title = "Pushpots 가입인증 보안코드 메일입니다.";
config.mail.findpass_url = config.https.domain + "/changePass?code=";
config.mail.admin = "";
config.mail.adminpwd = "";
config.mail.host = "";
config.mail.port = 0;


// 기본 사용자 이미지 아이콘 
config.etc.iconUrl = config.https.domain + "/images/anonymous.png"
config.web.title = "Pushpots 클라우드 메세징 서비스";
config.web.cp = "mroSOFT";
config.web.version = "0.3.0";
config.web.bi = "Pushpots";


// rdsproperties
config.rdsproperties.key = "sysinfo";
config.rdsproperties.fld_gcm_api_key = "gcm_api_key";
config.rdsproperties.fld_db_usr_id = "db_usr_id";
config.rdsproperties.fld_db_usr_pwd = "db_usr_pwd";
config.rdsproperties.fld_db_name = "db_name";
config.rdsproperties.fld_db_port = "db_port";

module.exports = config;