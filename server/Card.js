const CardExt = {
    spade: 0,
    club: 1,
    heart: 2,
    diamond: 3,
};

const CardNumber = {
    ace: 1,
    two: 2,
    three: 3, 
    four: 4,
    five: 5, 
    six: 6,
    seven: 7,
    eight: 8, 
    nine: 9,
    ten: 10,
    jack: 11,
    queen: 12,
    king: 13,
};

const CardValue = {
    0x20: 1,
    0x21: 2,
    0x22: 3,
    0x23: 4,

    0x30: 5,
    0x31: 6,
    0x32: 7,
    0x33: 8,

    0x40: 9,
    0x41: 10,
    0x42: 11,
    0x43: 12,

    0x50: 13,
    0x51: 14,
    0x52: 15,
    0x53: 16,

    0x60: 17,
    0x61: 18,
    0x62: 19,
    0x63: 20,

    0x70: 21,
    0x71: 22,
    0x72: 23,
    0x73: 24,

    0x80: 25,
    0x81: 26,
    0x82: 27,
    0x83: 28,

    0x90: 29,
    0x91: 30,
    0x92: 31,
    0x93: 32,

    0xA0: 33,
    0xA1: 34,
    0xA2: 35,
    0xA3: 36,

    0xB0: 37,
    0xB1: 38,
    0xB2: 39,
    0xB3: 40,

    0xC0: 41,
    0xC1: 42,
    0xC2: 43,
    0xC3: 44,

    0xD0: 45,
    0xD1: 46,
    0xD2: 47,
    0xD3: 48,

    0x10: 49,
    0x11: 50,
    0x12: 51,
    0x13: 52,
}

class Card {
   
    constructor(number, ext){
        this.number = number;
        this.ext = ext;
    }

    value() {
        let v = (this.number<<4) + this.ext;
        return CardValue[`${v}`];
    }

    toString(){
        let p = '';
        if (this.priority === 1) {
            p = 'spade';
        } else if (this.priority === 2){
            p = 'club';
        } else if (this.priority === 3){
            p = 'heart';
        } else if (this.priority === 4){
            p = 'diamond';
        }

        let n = '';
        if (this.number === 1) {
            p = 'ace';
        } else if (this.number === 2){
            n = 'two';
        } else if (this.number === 3){
            n = 'three';
        } else if (this.number === 4){
            n = 'four';
        } else if (this.number === 5){
            n = 'five';
        } else if (this.number === 6){
            n = 'six';
        } else if (this.number === 7){
            n = 'seven';
        } else if (this.number === 8){
            n = 'eight';
        } else if (this.number === 9){
            n = 'nine';
        } else if (this.number === 10){
            n = 'ten';
        } else if (this.number === 11){
            n = 'jack';
        } else if (this.number === 12){
            n = 'queen';
        } else if (this.number === 13){
            n = 'king';
        }

        return `${n} ${p}`
    }

}

export default Card;