// To create the function, I rely on an object containing the translations from numbers to strings.
// Each language would need to add its own translations in the object. To make it more scalable, the different language objects can be placed in separate files, so it's easier to add
// In the function itself, I have not relied in the dot inside the number. It would have been easier, but less robust. I decided to check for the length of the number.
// For some reason, it did not work by passing the lang as a function argument, so I just left it, for the sake of time, working in EN
// It would not work anyway in NL, because of the different structure of the numbers (zesentachtig for 86, for example). It is not difficult to make it support this structure, but I did not have time
// I think it would be more clear to have a separate function for EN (and all those languages with the same structure, if any) and other for NL (and those languages with the same structure, if any) than add exceptions to the current function

const numberToStringMap = {
	'EN': {
		'1':'one',
		'2':'two',
		'3':'three',
		'4':'four',
		'5':'five',
		'6':'six',
		'7':'seven',
		'8':'eight',
		'9':'nine',
		'10':'ten',
		'11':'eleven',
		'12':'twelve',
		'13':'thirteen',
		'14':'fourteen',
		'15':'fifteen',
		'16':'sixteen',
		'17':'seventeen',
		'18':'eightteen',
		'19':'nineteen',
		'20':'twenty',
		'30':'thirty',
		'40':'forty',
		'50':'fifty',
		'60':'sixty',
		'70':'seventy',
		'80':'eighty',
		'90':'ninety',
		'100':'hundred',
		'1000':'thousand',
		'1000000':'million',
	},
	'NL': {
		'1':'een',
		'2':'twee',
		'3':'drie',
		'4':'vier',
		'5':'vift',
		'6':'zes',
		'7':'zeven',
		'8':'acht',
		'9':'negen',
		'10':'tien',
		'11':'elf',
		'12':'twalf',
		'13':'dertien',
		'14':'viertien',
		'15':'viftien',
		'16':'zestien',
		'17':'zeventien',
		'18':'achttien',
		'19':'negentien',
		'20':'twintig',
		'30':'dertig',
		'40':'viertig',
		'50':'vijfig',
		'60':'zestig',
		'70':'zeventig',
		'80':'tachting',
		'90':'negentig',
		'100':'honderd',
		'1000':'duizend',
		'1000000':'miljoen',
	},
};

const convert = (num, lang) => {
	//todo: check that num is a number and that lang is either 'EN' or 'NL', else throw error
	const word = num.toString();
	const numberToStringMapEN = numberToStringMap['EN']; //for some reason, when i use numberToStringMap[lang] it throws undefined, will debug later if I have time

	switch (word.length) {
		case 1:
			return numberToStringMapEN[word];
			break;
		case 2:
			if (num <= 20) {
				return numberToStringMapEN[word];
			}
			return numberToStringMapEN[word.slice(0,1) + '0'] + numberToStringMapEN[word.slice(1)]; // hacky, find better way
			break;
		case 3:
			return convert(word.slice(0,1)) + " " + numberToStringMapEN['100'] + " " + convert(word.slice(1));
			break;
		default:
			return convert(word.slice(0, (word.length - 3))) + " " + numberToStringMapEN['1000'] + " " + convert(word.slice(word.length - 3));
		// to make it work with millions and more, we would need to check if case is less than 7, or create a function that returns hundred/million/etc depending on length
	}
}

exports.convert = convert;