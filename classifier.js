var fs = require('fs'),
  lineReader = require('line-reader'),
	events = require('events').EventEmitter,
	array_count = [],
	array_line = [],
	path = 'files/models/';

fs.writeFile(path + 'model_training.txt', '');
var em = new events();
var words = ['la', 'el', 'los', 'las', 'de', 'que', 'a', 'y', 'e', 'del' , 'les' , 'ante' ,'entre','bajo', 'con', 'contra', 'desde', 'hacia', 'para', 'por', 'según','se', 'en', 'sobre'];
var array_type = [];
var array_subtype = [];
var array_classes = [];
var array_counter = [];
var counter_2 = 0;
var counter_3 = 0;
var highest_value = 0;

lineReader.eachLine(path + 'ALL_DATA3', function(line,last){
	console.log(counter_2++);
	line = get_the_phrase_and_class(line);
	if(line != null){
		array_line = line[3].split(';');
		for (var i = array_line.length - 1; i >= 0; i--) {
			character = array_line[i].substring(0,2)
			highest_value = highest_value < parseInt(character) ? character : highest_value;
		};

		line = word_filter_1(line[2]);
		array_line = line.split(' ');

		for (var i = array_line.length - 1; i >= 0; i--) {
			if(array_count.indexOf(array_line[i]) == -1){
				array_count.push(array_line[i]);
			}else{
				array_counter[array_count.indexOf(array_line[i])] = array_counter[array_count.indexOf(array_line[i])] == null ? 1 : array_counter[array_count.indexOf(array_line[i])] + 1;
			}
			if(last){
				em.emit('primer');
			}
		}	
	}
});

em.on('primer', function(){

	counter = 0;
	
	lineReader.eachLine(path + 'ALL_DATA3', function(line,last){	
		console.log(counter++);

		line = get_the_phrase_and_class(line);
		line[2] = word_filter_1(line[2]);
		line[1] = word_filter_1(line[1]);
		array_classes_2 = line[3].split(';');
		array_line = line[2].split(' ');

		for (var i = array_classes_2.length - 1; i >= 0; i--) {
			array_classes_2[i] = parseInt(array_classes_2[i].substring(0,2))
		};

		for (var i = highest_value - 1; i >= 0; i--) {
			if(array_classes_2.indexOf(highest_value) != -1){
				fs.appendFile(path + 'model_training.txt', "1,");
			}else{
				fs.appendFile(path + 'model_training.txt', "0,");
			}
		};

		array_classes_2 = null;

		for (var i = 0; i < array_count.length ; i++) {
			maxim = Math.max.apply(Math, array_counter);
			index_ = array_counter.indexOf(maxim);
			if(array_line.indexOf(array_count[index_]) >= 0){
				fs.appendFile(path + 'model_training.txt', "1,");
			}else{
				fs.appendFile(path + 'model_training.txt', "0,");
			}
			array_counter[index_] = 0
		}
		array_count = null;
		array_counter = null;
	});

	lineReader.eachLine(path + 'ALL_DATA3', function(line,last){
		console.log(counter_3++);
		line = get_the_phrase_and_class(line);
			if(line != null){
				array_line = word_filter_1(line[3]).split('-');
				if(array_type.indexOf(array_line[1]) == -1){
					array_type.push(array_line[1]);
				}
				if(array_subtype.indexOf(array_line[0]) == -1){
					array_subtype.push(array_line[0]);
				}
			}
			if(last){em.emit('create_model')}
		});
});


em.on('create_model', function(array_count){
	var text = "";
	counter = 0;
	
	lineReader.eachLine(path + 'ALL_DATA3', function(line,last){	
		console.log(counter++);
		for (var i = array_type.length - 1; i >= 0; i--) {
			array_line = word_filter_1(line[1]).split('-');
			var index_type = array_type.indexOf(array_line[1]);
			var index_subtype = array_subtype.indexOf(array_line[0]);
			for (var i = 0; i > index_type; i++) {
				fs.appendFile(path + 'model_training.txt', "0,");
			};
			fs.appendFile(path + 'model_training.txt', "1,");
			for (var i = index_subtype.length - 1; i >= 0; i--) {
				fs.appendFile(path + 'model_training.txt', "0,");
			};
			fs.appendFile(path + 'model_training.txt', array_subtype[index_subtype]);
		};
	});
});

//We only get the important words such as noums and verbs that gives us more information
function word_filter_1(text){
    var words = ['la', 'el', 'los', 'las', 'de', 'que', 'a', 'y', 'e', 'del' , 'les' , 'ante' ,'entre','bajo', 'con', 'contra', 'desde', 'hacia', 'para', 'por', 'según','se', 'en', 'sobre'];
    var re = new RegExp('\\b(' + words.join('| ') + ')\\b', 'g');
    text = text.replace(re, ' ').replace(/([\/0-9])/g, ' ').replace(/[ ]{2,}/g, ' ').replace(/[ ]{3,}/g, ' ');
    text= text.replace(new RegExp(/[àáâãäå]/g),"a");
    text= text.replace(new RegExp(/æ/g),"ae");
    text= text.replace(new RegExp(/ç/g),"c");
    text = text.replace(new RegExp(/[)(,-.]:/g), '');
    text= text.replace(new RegExp(/[èéêë]/g),"e");
    text= text.replace(new RegExp(/[ìíîï]/g),"i");
    text= text.replace(new RegExp(/ñ/g),"n");                
    text= text.replace(new RegExp(/[òóôõö]/g),"o");
    text= text.replace(new RegExp(/œ/g),"oe");
    text= text.replace(new RegExp(/[ùúûü]/g),"u");
    text= text.replace(new RegExp(/[ýÿ]/g),"y");
    return text;
}

function get_the_phrase_and_class(line){
	array_line = line.split('", "');
	if(typeof array_line[0] != 'undefined' && typeof array_line[1] != 'undefined' && typeof array_line[2] != 'undefined' && typeof array_line[3] != 'undefined'){
	    array_line[0] = array_line[0].replace('"', '');
	    array_line[1] = array_line[1].replace('"', '');
	    array_line[2] = array_line[2].replace('"', '');
	    array_line[3] = array_line[3].replace('"', '');
	    return [array_line[0], array_line[1], array_line[2], array_line[3]];
	}else{
		return null;
	}
}
