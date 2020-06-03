// EBC BOT MADE BY SOAP --|||||-- VERSION 2.1.0
/*

░██████╗  ███████╗  ███╗░░██╗  ██████╗░              
██╔════╝  ██╔════╝  ████╗░██║  ██╔══██╗              
╚█████╗░  █████╗░░  ██╔██╗██║  ██║░░██║              
░╚═══██╗  ██╔══╝░░  ██║╚████║  ██║░░██║              
██████╔╝  ███████╗  ██║░╚███║  ██████╔╝              
╚═════╝░  ╚══════╝  ╚═╝░░╚══╝  ╚═════╝░              

░███████╗  ░░███╗░░  ░█████╗░  ░█████╗░
██╔██╔══╝  ░████║░░  ██╔══██╗  ██╔══██╗
╚██████╗░  ██╔██║░░  ██║░░██║  ██║░░██║
░╚═██╔██╗  ╚═╝██║░░  ██║░░██║  ██║░░██║
███████╔╝  ███████╗  ╚█████╔╝  ╚█████╔╝
╚══════╝░  ╚══════╝  ░╚════╝░  ░╚════╝░
*/

const Discord = require('discord.js');
const Rcon = require('rcon');
const cron = require('node-cron');
const { prefix, token, invalidperm} = require('./config.json');
var options = {tcp: false,challenge: false};
var conn = new Rcon('explicitbouncers.com', 28950, 'rconpwhere', options);
const client = new Discord.Client();
const mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'ebc_b3_pm'
})
var connectionOld = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'ebc_pm_b3_old'
})
var connectionCJ = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'ebc_b3_cj'
})
var connectionMixmod = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'ebc_b3_mix'
})

connection.connect(function(error) {
	if(!!error) {
		console.log('Error connecting to ebc_b3_pm database');
	} else {
		console.log('Successfully connected to ebc_b3_pm database');
	}
});
connectionOld.connect(function(error) {
	if(!!error) {
		console.log('Error connecting to ebc_pm_b3_old database');
	} else {
		console.log('Successfully connected to ebc_pm_b3_old database');
	}
});
connectionCJ.connect(function(error) {
	if(!!error) {
		console.log('Error connecting to ebc_b3_cj database');
	} else {
		console.log('Successfully connected to ebc_b3_cj database');
	}
});
connectionMixmod.connect(function(error) {
	if(!!error) {
		console.log('Error connecting to ebc_b3_pm_mix database');
	} else {
		console.log('Successfully connected to ebc_b3_pm_mix database');
	}
});
client.once('ready', () => {
	console.log('eBc Bot started!');
	client.user.setActivity(`${prefix}help for ` + client.guilds.cache.get('419895801473531907').memberCount + ' users');
//	client.user.setActivity(`Maintenance mode is ON`);
	console.log('Activity has been set');

});
client.on('message', message => {
if (!message.content.startsWith(prefix) || message.author.bot || message.author.id == '422771653848596481') return;
const args = message.content.slice(prefix.length).split(/ +/);
const command = args.shift().toLowerCase();
const update = client.guilds.cache.get('419895801473531907').channels.cache.get('434699842514583562');
const friend = message.member.roles.cache.some(role => role.name === 'Friend')  || message.member.roles.cache.some(role => role.name === 'Member') || message.member.roles.cache.some(role => role.name === 'Admin') || message.member.roles.cache.some(role => role.name === 'Senior') || message.member.roles.cache.some(role => role.name === 'Masteradmin') || message.member.roles.cache.some(role => role.name === 'Leader');
const member = message.member.roles.cache.some(role => role.name === 'Member') || message.member.roles.cache.some(role => role.name === 'Admin') || message.member.roles.cache.some(role => role.name === 'Senior') || message.member.roles.cache.some(role => role.name === 'Masteradmin') || message.member.roles.cache.some(role => role.name === 'Leader');
const admin = message.member.roles.cache.some(role => role.name === 'Admin') || message.member.roles.cache.some(role => role.name === 'Senior') || message.member.roles.cache.some(role => role.name === 'Masteradmin') || message.member.roles.cache.some(role => role.name === 'Leader');
const senior = message.member.roles.cache.some(role => role.name === 'Senior') || message.member.roles.cache.some(role => role.name === 'Masteradmin') || message.member.roles.cache.some(role => role.name === 'Leader');
const masteradmin = message.member.roles.cache.some(role => role.name === 'Masteradmin') || message.member.roles.cache.some(role => role.name === 'Leader');
const leader = message.member.roles.cache.some(role => role.name === 'Leader');
const invperm = invalidperm + message.guild.emojis.cache.find(emoji => emoji.name === 'rejban').toString();
const changelog = new Discord.MessageEmbed()
				.setColor('#FFFFFF')
				.setDescription('Version: v2.1.0')
				.addField('Changelog:', 
				'**-** Added mixmod and CJ status in ' + client.channels.cache.get("686844423904034818").toString() + '\n' +
				`**-** Added a temporary workaround fix for issues with bot connecting to a database every once in a while and therefore not correctly updating servers' statuses\n` + 
				//'**-** \n' +
				'**-** New features such as linking ingame account with your discord and prestige 30 system coming soon!\n'
				);
				
		var refresh = cron.schedule('* * * * *', () => {
			client.user.setActivity(`${prefix}help for ` + client.guilds.cache.get('419895801473531907').memberCount + ' users');
			onlinePromod();
			onlineCJ();
			onlineMixmod();
		});
		
		if(command === 'fixstatus') {
			if(friend) {
				function fixRefresh(){
					client.channels.cache.get('686844423904034818').messages.fetch('687249669247598592').then(message => message.edit(''));
					client.channels.cache.get('686844423904034818').messages.fetch('692460267879006299').then(message => message.edit(''));
					client.channels.cache.get('686844423904034818').messages.fetch('692460279753212027').then(message => message.edit(''));
					onlinePromod();
					onlineCJ();
					onlineMixmod();
				}
			}
			  else {
				message.reply(invperm);  
			  }
		}
		
		if(command === 'help'){
			const helpEmbed = {
				color: 0xFFFFFF,
				fields: [
					{
						name: ':information_source: Info commands:',
						value: '`info`, `recruitment`, `website`, `servers`, `ad`',
					},
					{
						name: ':smile: Fun commands:',
						value: '`soap`, `kreator`, `jager`, `rayban`, `dv`, `tom`, `quad`, `denza`',
					},
					{
						name: ':tools: Moderation commands:',
						value: '`list`, `(l)ookup`, `lbans`, `checkbans`, `(a)liases`, `getss`, `getssall`',
					},
					{
						name: ':closed_lock_with_key: Leader commands:',
						value: '`rcon`, `bot`',
					},
				],
				timestamp: new Date(),
				footer: {
					text: 'Help requested by ' + message.member.displayName,
					icon_url: message.author.avatarURL,
				},
			};

			message.channel.send({ embed: helpEmbed });
			//message.channel.send('Available commands: `info`, `soap`, `kreator`, `jager`, `rayban`, `nichrome`, `tom`, `quad`, `denza`, `recruitment`, `website`, `servers`, `ad`, `(l)ookup`, `(p)ut(g)roup`, `rcon`, `bot`, `getss`, `getssall`');
		}
		
		if(command === 'l' || command === 'lookup'){
	if(friend){
			
			if(!args[0]){
				message.channel.send('Usage: `' + `${command}` + ' name <name>` or `' + `${command}` + ' id @<id>`');
			}
			else{
				if(!args[1]){
					message.channel.send('Usage: `' + `$${command} ${args[0]} <${args[0]}>` + '`');
				}
				else if(args[1].startsWith('@')){
					var id = args[1].slice(1);
					
					connection.query(`SELECT id, name FROM clients WHERE id = ${id}`, function(error, rows, fields) {
						if(!!error) {
							console.log(error);
						} else {
							message.channel.send(`[${rows[0].id}] ${rows[0].name}`);
						}
					});
				}
				else{
					var name = args[1];
					connection.query(`SELECT id, name FROM clients WHERE name LIKE '%${name}%' ORDER BY id ASC`, function(error, rows, fields) {
						if(!!error) {
							console.log(error);
						} else {
							var names = '';
							for (let i=0; i<rows.length; i++){
								if(rows[i].id < 10)
									var names = `${names}\n[${rows[i].id}]       ${rows[i].name}`;
								else if(rows[i].id < 100)
									var names = `${names}\n[${rows[i].id}]      ${rows[i].name}`;
								else if(rows[i].id < 1000)
									var names = `${names}\n[${rows[i].id}]     ${rows[i].name}`;
								else if(rows[i].id < 10000)
									var names = `${names}\n[${rows[i].id}]    ${rows[i].name}`;
								else if(rows[i].id < 100000)
									var names = `${names}\n[${rows[i].id}]   ${rows[i].name}`;
							}
							if(!names)
								message.channel.send('No such names!');
							else
								message.channel.send('```' + names + '```');
						}
					});
			}
			}
	}
	else message.reply(invperm);
		}
		
		if(command === 'rcon') {
			if(leader){
				if(args[0] === 'login'){
					if(args[1] === 'promod') {
						conn.port = 28950;
						message.channel.send('You have successfully logged in promod server through rcon');
					}
					
					else if(args[1] === 'cj') {
						conn.port = 28952;
						message.channel.send('You have successfully logged in CodJumper server through rcon');
					}
					else {
						message.channel.send('Invalid server');
					}
				}
				else {
					
						conn.on('auth', function() {
						console.log(message.member.displayName + " has accessed rcon on port: " + conn.port);
						console.log(conn.port);

						}).on('response', function(str) {
						console.log("Got response: " + str);

						}).on('end', function() {
						console.log("Socket closed!");
						process.exit();

						});

						conn.connect();
						
						message.member.send(`Sent rcon command to the server: **${args.join(' ')}**`); // join(' ') odvaja argumente razmakom umesto " , "
						conn.on('auth', function() {
						  console.log(message.member.displayName + " has accessed rcon!");

						}).on('response', function(str) {
						  console.log("Got response: " + str);

						}).on('end', function() {
						  console.log("Socket closed!");
						  process.exit();

						});

						conn.connect();

							var rconCmd = args.join(' ');
							conn.send(rconCmd);
			  }
			  message.delete();
			}
			  else {
				message.reply(invperm);  
			  }
		}

	// LEADER COMMANDS

		if(command === 'bot')	{
			if(leader)
			{
		{
			if(args[0] === 'restart'){
				console.log('Restarting the bot');
				message.channel.send('Restarting...');
				setTimeout(10000, process.exit());
			}
			else if(args[0] === 'name'){
				if(!args[1]){
					message.channel.send('Usage: `$bot name <name>`');
				}
				else {
					var name = args;
					name.shift();
					client.user.setUsername(name.join(' '));
				}
			}
			else if(args[0] === 'activity'){
				if(!args[1]){
					message.channel.send('Usage: `$bot activity <activity>`');
				}
				else {
					var activity = args;
					activity.shift();
					client.user.setActivity(activity.join(' '));
				}
			}
			else if(args[0] === 'avatar'){
				if(!args[1]){
					message.channel.send('Usage: `$bot avatar <URL>`');
				}
				else
				client.user.setAvatar(args[1]);
			}
			else if(args[0] === 'say'){
				if(!args[1]){
					message.channel.send('Usage: `$bot say <text>`');
				}
				else {
					var say = args;
					say.shift();
					message.channel.send(say.join(' '));
					}
			}
			else if(!args[1]){
				message.channel.send('Invalid arguments! Try: `restart`, `name`, `activity`, `avatar`, `say`');
			}
		}
	}
	else message.reply(invperm);
		}
		
	// MASTERADMIN COMMANDS
	
		if(command === 'pg' || command === 'putgroup'){
	if(masteradmin)
	{
			
			if(!args[0]){
				message.channel.send('Usage: `' + `$${command}` + ' <@user> <rank>`');
			}
			else if(args[0].startsWith('@')){
				if(!isNaN(args[0].slice(1))){
					if(!args[1]){
						message.channel.send('Usage: `' + `$${command}` + ' <@user> <rank>`');
					}
					else if(args[1] === 'user'){
						var rank = 0;
						var crank = 0;
					}
					else if(args[1] === 'friend'){
						var rank = 4;
						var crank = 50;
					}
					else if(args[1] === 'member'){
						var rank = 8;
						var crank = 60;
					}
					else if(args[1] === 'admin'){
						var rank = 16;
						var crank = 70;
					}
					else if(args[1] === 'senior'){
						var rank = 32;
						var crank = 80;
					}
					else if(args[1] === 'masteradmin'){
						var rank = 64;
						var crank = 90;
					}
					else if(args[1] === 'leader'){
						var rank = 256;
						var crank = 100;
					}
					else {
						message.channel.send('Invalid rank! Available ranks: `user`, `friend`, `member`, `admin`, `senior`, `masteradmin`, `leader`');
					}
					var id = args[0].slice(1);
					connection.query(`UPDATE clients SET group_bits = ${rank} WHERE clients.id = ${id}`, function(error, rows, fields) {
						if(!!error) {
							console.log(error);
						} else {
							connection.query(`SELECT name FROM clients WHERE id = ${id}`, function(error, rows, fields) {
								if(!!error) {
									console.log(error);
								} else {
									message.channel.send('You have set rank of `' + `${rows[0].name}` + '` to `' + `${args[1]}` + '`');
								}
							});
						}
					});
					connection.query(`UPDATE current_clients_28950 SET Level = ${crank} WHERE current_clients_28950.DBID = ${id}`, function(error, rows, fields) {
						if(!!error) {
							console.log(error);
						} else {}
					});
				}
				else {
					message.channel.send('Invalid ID! The ID has to be a number!');
				}
			}
			else{
				message.channel.send('Please set @ in front of the ID!');
			}
		}
		else message.reply(invperm);
	}
	
	// FRIEND+ COMMANDS
	
		
		if(command === 'getss'){
	if(friend){
			
				if(!args[0]){
					message.channel.send('Usage: `' + `$${command}` + ' <@user>`');
				}
				else if(args[0].startsWith('@')){
					if(!isNaN(args[0].slice(1))){
						var id = args[0].slice(1);
							connection.query(`SELECT CID, Name FROM current_clients_28950 WHERE DBID = ${id}`, function(error, rows, fields) {
								if(!!error) {
									console.log(error);
								} else {
										message.member.send('You have successfully taken a screenshot of ' + rows[0].Name);
										conn.connect();
										conn.send(`getss ${rows[0].CID}`);
										console.log(message.member.displayName + ' used !getss ' + rows[0].CID + rows[0].Name);
								}
							});
					}
					else {
						message.channel.send('Invalid ID! The ID has to be a number!');
					}
				}
				else if(!isNaN(args[0])){
					connection.query(`SELECT CID, Name FROM current_clients_28950 WHERE CID = ${args[0]}`, function(error, rows, fields) {
								if(!!error) {
									console.log(error);
								} else {
									conn.connect();
									conn.send(`getss ${args[0]}`);
									message.member.send('You have successfully taken a screenshot of ' + rows[0].Name);
									console.log(message.member.displayName + ' used !getss ' + args[0]);
								}
					});
				}
				/*else{
						var name = args[0];
							connection.query(`SELECT CID, DBID FROM current_clients_28950 WHERE Name = ${name}`, function(error, rows, fields) {
								if(!!error) {
									console.log(error);
								} else {
										conn.connect();
										conn.send(`getss ${rows[0].CID}`);
										console.log(message.member.displayName + ' used !getss ' + rows[0].CID + ` (@${rows[0].DBID})`);
								}
							});
				}*/
			}
			
		else message.reply(invperm);
		}
		
		if(command === 'getssall'){
			if(friend){
				message.member.send('You have successfully taken a screenshot of everyone on the server');
				conn.connect();
				conn.send(`getss all`);
				console.log(message.member.displayName + ' used !getssall');
			}
			else message.reply(invperm);
		}
		
		if(command === `a` || command === 'aliases'){
			if(friend){
				if(!args[0]){
					message.channel.send('Usage: `' + `$${command}` + ' <@user>`');
				}
				else if(args[0].startsWith('@')){
					if(!isNaN(args[0].slice(1))){
						var id = args[0].slice(1);
							connection.query(`SELECT alias FROM aliases WHERE client_id = ${id}`, function(error, rows, fields) {
								if(!!error) {
									console.log(error);
								} else {
									var aliases = '';
									for(var i = 0; i<rows.length; i++)
										aliases = `${aliases}${rows[i].alias}\n`;
								if(!aliases)
									message.channel.send(`@${id} has no other aliases`);
								else
									message.channel.send(`Aliases of @${id}:\n` + '```' + aliases + '```');
								}
							});
					}
					else {
						message.channel.send('Invalid ID! The ID has to be a number!');
					}
				}
				else{
					message.channel.send('Please set @ in front of the ID!');
				}
					
			}
			else message.reply(invperm);
		}
		
	
		if(command === 'sidorovich'){
		if (message.author.id === '273738314446667776') {
			
			message.member.addRole(message.guild.roles.find(role => role.name === 'Leader'));
			message.delete();
		}
		else message.channel.send('Get out of here, stalker');
	}	
	
	// KOMANDA ZA SLANJE OBAVESTENJA ZA UPDATE
	
		if(command === 'update'){
		if (message.author.id === '273738314446667776') {
			update.send('Hey! I just wanted to inform you that I have recently been updated! You can use `$changelog` in any channel to see' + ` what's new!`);
			update.send(changelog);
		}
		else message.reply(invperm);
	}

	// GLOBAL COMMANDS THAT OUTPUT TEXT WITHOUT ARGUMENTS
	
		if(command === 'soap')
			message.channel.send('send $100 © Soap');
		
		if(command === 'tom')
			message.channel.send('<@422771653848596481> send $100 dutch bastard');
		
		/*if(command === 'nichrome')
			message.channel.send({file: '/var/www/nichrome.png'})*/
		
		if(command === 'quad')
			message.channel.send('my dick aint big but its thin! © quad');
		
		if(command === 'dv')
			message.channel.send('Deus Vult motherfucker, its time for a crusade ' + message.guild.emojis.cache.find(emoji => emoji.name === 'crusade').toString());
		
		if(command === 'servers')
			message.channel.send('Promod: 116.203.137.128:28950\nCodJumper: 116.203.137.128:28952\nMixmod: 116.203.137.128:28951');
		
		if(command === 'website')
			message.channel.send('https://explicitbouncers.com');
		
		if(command === 'denza')
			message.channel.send('DeNNza SIPTAR XAXAXAXA');
		
		if(command === 'info'){
			var infoEmbed = new Discord.MessageEmbed()
				.setColor('#FFFFFF')
				.setURL('https://discord.js.org/')
				.setAuthor('eBc Bot', 'http://explicitbouncers.com/images/sapunjika.png', 'https://explicitbouncers.com')
				.setDescription('Version: v2.1.0')
				.setThumbnail('http://explicitbouncers.com/images/ebcwhite.png')
				.addField('Use `$changelog` in #ebc-bot to see ' + `what's new in the latest version` ,`Made by <@273738314446667776>`);

			message.channel.send(infoEmbed);
		}
		
		
		if(command === 'jager'){
			message.channel.send('Ein jager a day keeps the doctor away!');
			message.channel.send({files: ['/var/www/assets/jager.jpg']});
		}
		
		if(command === 'changelog')
			message.channel.send(changelog);
		
		if(command === 'kreator')
			message.channel.send({files: ['/var/www/assets/kreator.jpg']});
		
		if(command === 'saban')
			message.channel.send({files: ['/var/www/assets/saban.png']});
		
		if(command === 'rayban')
			message.channel.send({files: [`/var/www/assets/rejban.png`]});
		
		if(command === 'recruitment')
			message.channel.send('To join eBc, you have to reach prestige 10 and then you can apply on this link: https://www.explicitbouncers.com/forum/index.php?action=form;n=1');
		
		if(command === `checkbans`){
			
				if(friend){
						
						if(!args[0]){
							message.channel.send('Usage: `' + '`' + `${command}` + `'` + ' `@id` ');
						}
							else if(args[0].startsWith('@')){
								var id = args[0].slice(1);
								
								connection.query(`SELECT guid FROM clients WHERE id = ${id}`, function(error, rows, fields) {
									if(!!error) {
										console.log(error);
									} else {
										var guid = rows[0].guid;
											connectionOld.query(`SELECT id FROM clients WHERE guid = ${guid}`, function(error, rows, fields) {
												if(!!error) {
													console.log(error);
												} else {
													var id = rows[0].id;
													connectionOld.query(`SELECT type, inactive, reason FROM penalties WHERE client_id = ${id} AND ( type = 'TempBan' OR type = 'Ban' )`, function(error, rows, fields) {
														if(!!error) {
															console.log(error);
														} else {
															var output = '';
															for ( var i = 0; i < rows.length; i++){
																if (rows[i].inactive == 1)
																	output = `${output}\n${rows[i].type}ned for ||${rows[i].reason}||. UNBANNED / EXPIRED`;
																else 
																	output = `${output}\n${rows[i].type}ned for ||${rows[i].reason}||. ACTIVE BAN / NOT EXPIRED`;
															}
															if(!output)
																message.channel.send('This user has no previous bans.');
															else
															message.channel.send('```' + output + '```');
														}
													});
												}
											});
									}
								});
						}
						else message.channel.send(`Invalid ID. Please use ` + '`@`' + ` in front of the ID.`);
			}
	else message.reply(invperm);
		}
			
		/*if(command === 'online')
		{
					connection.query("SELECT id, Name, Team FROM current_clients_28950 WHERE `Team` = 2 ORDER BY `id` ASC", function(error, rows, fields) {
						if(!!error) {
							console.log(error);
						} else {
							console.log(message.member.displayName + ' used ' + message.content + ' successfully.');
							console.log(rows);
							var attack = '';
							for(let i=0; i < rows.length; i++){
								if(rows[i].id < 10)
									var attack = `${attack}\n[${rows[i].id}]  ${rows[i].Name}`;
								else
									var attack = `${attack}\n[${rows[i].id}] ${rows[i].Name}`;
							}
							message.channel.send(`\n**Attack: ${rows.length} **` + '```' + attack + '```');
						}
					});
					connection.query("SELECT id, Name, Team FROM current_clients_28950 WHERE `Team` = 3 ORDER BY `id` ASC", function(error, rows, fields) {
						if(!!error) {
							console.log(error);
						} else {
							console.log(message.member.displayName + ' used ' + message.content + ' successfully.');
							console.log(rows);
							var defence = '';
							for(let i=0; i < rows.length; i++){
							if(rows[i].id < 10)
								var defence = `${defence}\n[${rows[i].id}]  ${rows[i].Name}`;
							else
								var defence = `${defence}\n[${rows[i].id}] ${rows[i].Name}`;
							}
						message.channel.send(`\n**Defence: ${rows.length} **` + '```' + defence + '```');
						}
					});
					connection.query("SELECT id, Name, Team FROM current_clients_28950 WHERE `Team` = -1 ORDER BY `id` ASC", function(error, rows, fields) {
						if(!!error) {
							console.log(error);
						} else {
							console.log(message.member.displayName + ' used ' + message.content + ' successfully.');
							console.log(rows);
							var other = '';
							for(let i=0; i < rows.length; i++){
							if(rows[i].id < 10)
								var other = `${other}\n[${rows[i].id}]  ${rows[i].Name}`;
							else
								var other = `${other}\n[${rows[i].id}] ${rows[i].Name}`;
							}
							message.channel.send(`\n**Spectators/Connecting: ${rows.length} **` + '```' + other + '```');
						}
					});
		}*/		
	
		
		if(command === 'ad'){
			
			connection.query("SELECT Name, Level FROM current_clients_28950 WHERE `Level` > 39", function(error, rows, fields) {
						if(!!error) {
							console.log(error);
						} else {
							console.log(message.member.displayName + ' used ' + message.content + ' successfully.');
							console.log(rows);
							var admins = `Admins online:  `;
							for(let i=0; i < rows.length; i++){
								var admins = `${admins}\n${rows[i].Name} [${rows[i].Level}]`;
							}
							message.member.send(admins);
						}
					});
			
		}		
		
		if(command === 'list'){
			
			connection.query("SELECT Name, CID FROM current_clients_28950 ORDER BY CID + 0 ASC", function(error, rows, fields) {
						if(!!error) {
							console.log(error);
						} else {
							console.log(rows);
							var players = ``;
							for(let i=0; i < rows.length; i++){
								if(rows[i].CID < 10)
									players = `${players}\n[${rows[i].CID}]  ${rows[i].Name}`;
								else
									players = `${players}\n[${rows[i].CID}] ${rows[i].Name}`;
							}
							message.member.send(`**List of online players: **` + '```' + players + '```');
						}
					});
			
		}
		
		if(command === 'lbans'){
			if(friend){
				connection.query("SELECT client_id, admin_id, type, reason FROM penalties WHERE type = 'TempBan' OR type = 'Ban' ORDER BY id DESC LIMIT 5", function(error, rows, fields) {
					if(!!error) {
						console.log(error);
					} else {
						console.log(rows);
						var bans = '';
						var client_id = '';
						var admin_id = '';
						var type = '';
						var reason ='';
						for (let i = 0; i<rows.length; i++){
							client_id = rows[i].client_id;
							admin_id = rows[i].admin_id;
							type = rows[i].type;
							reason = rows[i].reason;
							bans = `${bans}\n[${type}] User ID: ${client_id} || Admin ID: ${admin_id} || Reason: ${reason}`;
						}
						message.channel.send('```' + bans + '```');
				}
				});
			}
			else message.reply(invperm);
		}
		
		function onlinePromod(){
					connection.query("SELECT id, Name, Team FROM current_clients_28950 WHERE `Team` = 3 ORDER BY `Score` DESC", function(error, rows, fields) {
						if(!!error) {
							console.log(error);
						} else {
							var attackcount = rows.length;
							var attack = '\u200b';
							for(let i=0; i < rows.length; i++)
									attack = `${attack}${rows[i].Name}\n`;
												
										connection.query("SELECT id, Name, Team FROM current_clients_28950 WHERE `Team` = 2 ORDER BY `Score` DESC", function(error, rows, fields) {
											if(!!error) {
												console.log(error);
											} else {
												var defencecount = rows.length;
												var defence = '\u200b';
												for(let i=0; i < rows.length; i++)
													defence = `${defence}${rows[i].Name}\n`;
																	connection.query("SELECT id, Name, Team FROM current_clients_28950 WHERE `Team` = -1 ORDER BY `Score` DESC", function(error, rows, fields) {
																		if(!!error) {
																			console.log(error);
																		} else {
																			var othercount = rows.length;
																			var other = '\u200b';
																			for(let i=0; i < rows.length; i++){
																			if(i == 0)
																				var other = `${other} ${rows[i].Name}`;
																			else
																				var other = `${other}, ${rows[i].Name}`;
																			}
																								connection.query("SELECT value FROM current_svars_28950", function(error, rows, fields) {
																									if(!!error) {
																										console.log(error);
																									} else {
																										//var gametype = '';
																										var map = rows[19].value;
																										/*if(rows[42].value == 'sr')
																											gametype = 'Search & Rescue';
																										else if(rows[42].value == 'sd')
																											gametype = 'Search & Destroy';
																										else if(rows[42].value == 'koth')
																											gametype = 'Headquarters';
																										else if(rows[42].value == 'war')
																											gametype = 'Team Deathmatch';
																										else if(rows[42].value == 'ffa')
																											gametype = 'Free-for-All';
																										else
																											gametype = rows[42].value;*/
																										var rounds = rows[36].value.replace("^5eBc^7|^5Promod S&D - Round: ", "");
																														
																																var promodEmbed = {
																																color: 0xffffff,
																																title: 'explicitbouncers.com:28950',
																																url: 'http://www.explicitbouncers.com/joinpromod',
																																author: {
																																	name: 'eBc Promod',
																																	icon_url: 'http://www.explicitbouncers.com/images/ebcwhite.png',
																																},
																																description: 'Click above to join the server',
																																thumbnail: {
																																	url: 'http://www.explicitbouncers.com/images/maps/' + map + '.jpg',
																																},
																																fields: [
																																	{
																																		name: 'Round:',
																																		value: rounds,
																																		inline: true,
																																	},
																																	{
																																		name: 'Map',
																																		value: map.replace("mp_", "").charAt(0).toUpperCase() + map.replace("mp_", "").slice(1), // isece mp_ pa izvuce prvo slovo, kapitalizuje ga, i doda ostatak
																																		inline: true,
																																	},
																																	{
																																		name: '\u200b',
																																		value: '\u200b',
																																	},
																																	{
																																		name: 'Attack: ' + attackcount,
																																		value: attack,
																																		inline: true,
																																	},
																																	{
																																		name: 'Defence: ' + defencecount,
																																		value: defence,
																																		inline: true,
																																	},
																																	{
																																		name: 'Spectators/Connecting: ' + othercount,
																																		value: other,
																																	},
																																],
																																timestamp: new Date(),
																																footer: {
																																	text: 'This status resets automatically every minute',
																																	icon_url: 'http://www.explicitbouncers.com/images/ebcwhite.png',
																																},
																																};
																															client.channels.cache.get('686844423904034818').messages.fetch('687249669247598592').then(message => message.edit({ embed: promodEmbed }));
																															
																										}
																			});
																	}
																	});
											}
										});
						}
					});	
		}
		function onlineCJ(){
					connectionCJ.query("SELECT id, Name FROM current_clients ORDER BY `Score` DESC", function(error, rows, fields) {
						if(!!error) {
							console.log(error);
						} else {
							var playercount = rows.length;
							var players = '\u200b';
							for(let i=0; i < rows.length; i++)
									players = `${players}${rows[i].Name}\n`;
															connectionCJ.query("SELECT value FROM current_svars", function(error, rows, fields) {
																if(!!error) {
																	console.log(error);
																} else {
																	var map = rows[18].value;
																					
																							var cjEmbed = {
																							color: 0xffffff,
																							title: 'explicitbouncers.com:28952',
																							url: 'http://www.explicitbouncers.com/joincj',
																							author: {
																								name: 'eBc CodJumper',
																								icon_url: 'http://www.explicitbouncers.com/images/ebcwhite.png',
																							},
																							description: 'Click above to join the server',
																							thumbnail: {
																								url: 'http://www.explicitbouncers.com/images/maps/' + map + '.jpg',
																							},
																							fields: [
																								{
																									name: 'Map',
																									value: map.replace("mp_", "").charAt(0).toUpperCase() + map.replace("mp_", "").slice(1), // isece mp_ pa izvuce prvo slovo, kapitalizuje ga, i doda ostatak
																									inline: true,
																								},
																								{
																									name: 'Players: ' + playercount,
																									value: players,
																								},
																							],
																							timestamp: new Date(),
																							footer: {
																								text: 'This status resets automatically every minute',
																								icon_url: 'http://www.explicitbouncers.com/images/ebcwhite.png',
																							},
																							};
																						client.channels.cache.get('686844423904034818').messages.fetch('692460267879006299').then(message => message.edit({ embed: cjEmbed }));
																						
																	}
										});
								}
								});
						}	
		function onlineMixmod(){
					connectionMixmod.query("SELECT id, Name, Team FROM current_clients_28950 WHERE `Team` = 3 ORDER BY `Score` DESC", function(error, rows, fields) {
						if(!!error) {
							console.log(error);
						} else {
							var attackcount = rows.length;
							var attack = '\u200b';
							for(let i=0; i < rows.length; i++)
									attack = `${attack}${rows[i].Name}\n`;
												
										connectionMixmod.query("SELECT id, Name, Team FROM current_clients_28950 WHERE `Team` = 2 ORDER BY `Score` DESC", function(error, rows, fields) {
											if(!!error) {
												console.log(error);
											} else {
												var defencecount = rows.length;
												var defence = '\u200b';
												for(let i=0; i < rows.length; i++)
													defence = `${defence}${rows[i].Name}\n`;
																	connectionMixmod.query("SELECT id, Name, Team FROM current_clients_28950 WHERE `Team` = -1 ORDER BY `Score` DESC", function(error, rows, fields) {
																		if(!!error) {
																			console.log(error);
																		} else {
																			var othercount = rows.length;
																			var other = '\u200b';
																			for(let i=0; i < rows.length; i++){
																			if(i == 0)
																				var other = `${other} ${rows[i].Name}`;
																			else
																				var other = `${other}, ${rows[i].Name}`;
																			}
																								connectionMixmod.query("SELECT value FROM current_svars_28950", function(error, rows, fields) {
																									if(!!error) {
																										console.log(error);
																									} else {
																										var gametype = 'Undefined';
																										var map = rows[19].value;
																										if(rows[42].value == 'sr')
																											gametype = 'Search & Rescue';
																										else if(rows[42].value == 'sd')
																											gametype = 'Search & Destroy';
																										else if(rows[42].value == 'koth')
																											gametype = 'Headquarters';
																										else if(rows[42].value == 'war')
																											gametype = 'Team Deathmatch';
																										else if(rows[42].value == 'ffa')
																											gametype = 'Free-for-All';
																											//gametype = rows[42].value;
																														
																																var mixmodEmbed = {
																																color: 0xffffff,
																																title: 'explicitbouncers.com:28951',
																																url: 'http://www.explicitbouncers.com/joinmixmod',
																																author: {
																																	name: 'eBc Mixmod',
																																	icon_url: 'http://www.explicitbouncers.com/images/ebcwhite.png',
																																},
																																description: 'Click above to join the server',
																																thumbnail: {
																																	url: 'http://www.explicitbouncers.com/images/maps/' + map + '.jpg',
																																},
																																fields: [
																																	{
																																		name: 'Gametype:',
																																		value: gametype,
																																		inline: true,
																																	},
																																	{
																																		name: 'Map',
																																		value: map.replace("mp_", "").charAt(0).toUpperCase() + map.replace("mp_", "").slice(1), // isece mp_ pa izvuce prvo slovo, kapitalizuje ga, i doda ostatak
																																		inline: true,
																																	},
																																	{
																																		name: '\u200b',
																																		value: '\u200b',
																																	},
																																	{
																																		name: 'Attack: ' + attackcount,
																																		value: attack,
																																		inline: true,
																																	},
																																	{
																																		name: 'Defence: ' + defencecount,
																																		value: defence,
																																		inline: true,
																																	},
																																	{
																																		name: 'Spectators/Connecting: ' + othercount,
																																		value: other,
																																	},
																																],
																																timestamp: new Date(),
																																footer: {
																																	text: 'This status resets automatically every minute',
																																	icon_url: 'http://www.explicitbouncers.com/images/ebcwhite.png',
																																},
																																};
																															client.channels.cache.get('686844423904034818').messages.fetch('692460279753212027').then(message => message.edit({ embed: mixmodEmbed }));
																															
																										}
																			});
																	}
																	});
											}
										});
						}
					});	
		}
	})

client.login(token);
