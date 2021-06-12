// Same as in the previous function, here I rely on an object containing the translations from numbers to strings.
// This was more difficult to solve. What I have done is first translate the string to an array containing the numbers in units, decens and centens, and then reducing those numbers to the final single number
// Same as previous function, I did not have time to make it work in NL :( It is not difficult to make it support this structure, but I did not have time.
// I also did not have time to add the dot to separate numbers after thousand

const stringToNumberMap = {
	'EN': {
		'one':1,
		'two':2,
		'three':3,
		'four':4,
		'five':5,
		'six':6,
		'seven':7,
		'eight':8,
		'nine':9,
		'ten':10,
		'eleven':11,
		'twelve':12,
		'thirteen':13,
		'fourteen':14,
		'fifteen':15,
		'sixteen':16,
		'seventeen':17,
		'eightteen':18,
		'nineteen':19,
		'twenty':20,
		'thirty':30,
		'forty':40,
		'fifty':50,
		'sixty':60,
		'seventy':70,
		'eighty':80,
		'ninety':90,
		'hundred':100,
		'thousand':1000,
	},
	'NL': {
		'een':1,
		'twee':2,
		'drie':3,
		'vier':4,
		'vift':5,
		'zes':6,
		'zeven':7,
		'acht':8,
		'negen':9,
		'tien':10,
		'elf':11,
		'twalf':12,
		'derteen':13,
		'vierteen':14,
		'vifteen':15,
		'zesteen':16,
		'seventeen':17,
		'achtteen':18,
		'negenteen':19,
		'twintig':20,
		'dertig':30,
		'viertig':40,
		'vijfig':50,
		'zestig':60,
		'zeventig':70,
		'tachting':80,
		'negentig':90,
		'honderd':100,
		'duizend':1000,
	}
};

const convert = (numberAsString, lang) => {

	if (!Object.keys(stringToNumberMap).includes(lang)) {
		return 'This language or the format is not supported, needs to be either "EN" or "NL"';
	}

  const numbersArray = splitInNumbers(numberAsString, lang);

	if (numbersArray.includes(1000)) { // this is not scalable for bigger numbers, but will think about that later.
		const firstPart = numbersArray.splice(0, numbersArray.indexOf(1000)) || 1;
		const secondPart = numbersArray.splice(numbersArray.indexOf(1000) + 1);
		return firstPart.reduce(reducer) * 1000 + secondPart.reduce(reducer);
	}

	return numbersArray.reduce(reducer);
}

function reducer(a,b) {
	if ([10,100,1000].includes(b)) { // todo: there must be an easier way using regex.
		return a * b;
	}

	return a + b;
};


// -inputs:
// -- numberAsString: string
// eg "thirty three thousand two hundred thirty five" in EN
// eg "Honderddrieënveertigduizend tweehonderdvijfendertig" in NL 143.235
// -- lang: string, either "NL" or "EN"
// - output: [33,1000,200,30,5] in EN
// output: [100,40,3,1000,200,30,5] in NL (not done)
function splitInNumbers(numberAsString, lang) {
	let numbersArray = [];
	const numbersAsStringsArray = Object.keys(stringToNumberMap[lang]);

	// todo: check that numberAsString is a string and that is found inside stringToNumberMap, else throw error
	function extractFirstNumber(string) {
		numbersAsStringsArray.some((stringNumber) => {
			if (string.indexOf(stringNumber) === 0) { // get first number in the string
				const stringAsNumber = stringToNumberMap[lang][stringNumber];
				numbersArray.push(stringAsNumber);
				const restOfString = string.split('').splice(stringNumber.length + 1).join('');
				extractFirstNumber(restOfString);

				return true;
			}
		});
	}

	extractFirstNumber(numberAsString);

	return numbersArray;
}

exports.convert = convert;