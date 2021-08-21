"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mRNACodonToAminoAcid = {
    'auu': 'I',
    'auc': 'I',
    'aua': 'I',
    'cuu': 'L',
    'cuc': 'L',
    'cua': 'L',
    'cug': 'L',
    'uua': 'L',
    'uug': 'L',
    'guu': 'V',
    'guc': 'V',
    'gua': 'V',
    'gug': 'V',
    'uuu': 'F',
    'uuc': 'F',
    'aug': 'M',
    'ugu': 'C',
    'ugc': 'C',
    'gcu': 'A',
    'gcc': 'A',
    'gca': 'A',
    'gcg': 'A',
    'ggu': 'G',
    'ggc': 'G',
    'gga': 'G',
    'ggg': 'G',
    'ccu': 'P',
    'ccc': 'P',
    'cca': 'P',
    'ccg': 'P',
    'acu': 'T',
    'acc': 'T',
    'aca': 'T',
    'acg': 'T',
    'ucu': 'S',
    'ucc': 'S',
    'uca': 'S',
    'ucg': 'S',
    'agu': 'S',
    'agc': 'S',
    'uau': 'Y',
    'uac': 'Y',
    'ugg': 'W',
    'caa': 'Q',
    'cag': 'Q',
    'aau': 'N',
    'aac': 'N',
    'cau': 'H',
    'cac': 'H',
    'gaa': 'E',
    'gag': 'E',
    'gau': 'D',
    'gac': 'D',
    'aaa': 'K',
    'aag': 'K',
    'cgu': 'R',
    'cgc': 'R',
    'cga': 'R',
    'cgg': 'R',
    'aga': 'R',
    'agg': 'R',
    'uaa': 'X',
    'uag': 'X',
    'uga': 'X'
};
class mRNAGeneTranscript {
    constructor(baseSequence) {
        this.valid = true;
        this.aminoAcidStrand = [];
        this.baseSequence = baseSequence.toLowerCase();
        this.checkValidity();
        if (this.valid)
            this.translate();
    }
    checkValidity() {
        // check if the number of nucleotides is divisible by three
        if (this.baseSequence.length % 3 != 0) {
            this.valid = false;
            return;
        }
        // check if each base is one of the 4 valid choices
        for (let i = 0; i < this.baseSequence.length; i++) {
            if (this.baseSequence[i] != 'a' && this.baseSequence[i] != 'u' && this.baseSequence[i] != 'c' && this.baseSequence[i] != 'g') {
                this.valid = false;
                break;
            }
        }
    }
    translate() {
        let baseSequence = this.baseSequence;
        while (baseSequence.length > 0) {
            let codon = baseSequence.substring(0, 3);
            baseSequence = baseSequence.substring(3);
            this.aminoAcidStrand.push(mRNACodonToAminoAcid[codon]);
        }
    }
}
exports.default = mRNAGeneTranscript;
