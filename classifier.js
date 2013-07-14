var fs = require('fs'),
  lineReader = require('line-reader'),
	events = require('events').EventEmitter,
	array_count = [],
	array_line = [],
	path = './files/';

fs.writeFile(path+ 'model.txt', '');
var em = new events();
var words = ['la', 'el', 'los', 'las', 'de', 'que', 'a', 'y', 'e', 'del' , 'les' , 'ante' ,'entre','bajo', 'con', 'contra', 'desde', 'hacia', 'para', 'por', 'según','se', 'en', 'sobre'];

lineReader.eachLine(path + '20.txt', function(line,last){
	line = get_the_phrase_and_class(line);
	line = word_filter_1(line[1]);
	array_line = line.split(' ');
	for (var i = array_line.length - 1; i >= 0; i--) {
		if(!(exists_in_array(array_line[i]))){
			array_count.push({word:array_line[i], count:1});

		}
	};	
	console.log(last);
	if(last) em.emit('sort');
});


em.on('sort', function(){
	array_count.sort(function(a,b){
		return(b.count - a.count);
	});
	fs.writeFile(path + 'array.txt', JSON.stringify(array_count));
	array_count = array_count.filter(function(a){
		return a.count > 100;
	});
	em.emit('create_model', array_count);
});

em.on('create_model', function(array_count){
	var text = "";
	lineReader.eachLine(path + '20.txt', function(line,last){

		line = get_the_phrase_and_class(line);
		line[1] = word_filter_1(line[1]);
		array_line = line[1].split(' ');

		for (var i = 0; i < array_count.length ; i++) {
			console.log(i);
			if(i == 0){ 
				if(line[0] == 0){
					text = "0,";
				}else{
					text = line[0] + ",";
				}
			}
			if(array_line.indexOf(array_count[i].word) >= 0){
				text= text + "1,";
			}else{
				text = text + "0,";
			}
			if(i + 1 == array_count.length) text = text + line[2];
		}

		fs.appendFile(path + 'model.txt', text + "\n");
		text = "";

	});
});

//We only get the important words such as noums and verbs that gives us more information
function word_filter_1(text){
    var re = new RegExp('\\b(' + words.join('| ') + ')\\b', 'g');
    text = text.replace(re, ' ').replace(/([\/0-9])/g, ' ').replace(/[ ]{2,}/g, ' ').replace(/[ ]{3,}/g, ' ');
    return text;
}

function get_the_phrase_and_class(line){
	array_line = line.split('", "');
    array_line[0] = array_line[0].replace('"', '');
    array_line[1] = array_line[1].replace('"', '');
    array_line[2] = array_line[2].replace('"', '');
    return [array_line[0], array_line[1], array_line[2]];
}


//We search the word
function exists_in_array(word_to_find){
	i = array_count.length;
	while(i--){
		if (array_count[i].word == word_to_find){ array_count[i].count++; return true; }
	}
	return false;
}
