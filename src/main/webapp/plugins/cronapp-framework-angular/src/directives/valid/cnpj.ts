export class CNPJ {

  constructor() {}

  private BLACKLIST = [
    '00000000000000',
    '11111111111111',
    '22222222222222',
    '33333333333333',
    '44444444444444',
    '55555555555555',
    '66666666666666',
    '77777777777777',
    '88888888888888',
    '99999999999999'
  ];

  STRICT_STRIP_REGEX = /[-\/.]/g;
  LOOSE_STRIP_REGEX = /[^\d]/g;

  private verifierDigit = function(numbers) {
    let index = 2;
    const REVERSE = numbers.split('').reduce(function(buffer, number) {
      return [parseInt(number, 10)].concat(buffer);
    }, []);

    const sum = REVERSE.reduce(function(buffer, number) {
      buffer += number * index;
      index = (index === 9 ? 2 : index + 1);
      return buffer;
    }, 0);

    const mod = sum % 11;
    return (mod < 2 ? 0 : 11 - mod);
  };

  private format = function(number) {
    return this.strip(number).replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
  };

  private strip = function(number, strict) {
    const regex = strict ? this.STRICT_STRIP_REGEX : this.LOOSE_STRIP_REGEX;
    return (number || '').toString().replace(regex, '');
  };

  private generate = function(formatted) {
    let numbers = '';

    for (let i = 0; i < 12; i++) {
      numbers += Math.floor(Math.random() * 9);
    }

    numbers += this.verifierDigit(numbers);
    numbers += this.verifierDigit(numbers);

    return (formatted ? this.format(numbers) : numbers);
  };

  isValid = function(number) {
    const stripped = this.strip(number);

    // CNPJ must be defined
    if (!stripped) {
      return false;
    }

    // CNPJ must have 14 chars
    if (stripped.length !== 14) {
      return false;
    }

    // CNPJ can't be blacklisted
    if (this.BLACKLIST.indexOf(stripped) >= 0) {
      return false;
    }

    let numbers = stripped.substr(0, 12);
    numbers += this.verifierDigit(numbers);
    numbers += this.verifierDigit(numbers);

    return numbers.substr(-2) === stripped.substr(-2);
  };

  validCNPJ(number: String) {
    if (this.isValid(number)) {
      return null;
    } else {
      return {
        valid : true
      };
    }
  }
}
