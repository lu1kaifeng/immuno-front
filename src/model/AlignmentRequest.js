export default class AlignmentRequest {
    sequence="";
    openPenalty = 5;
    extensionPenalty = 2;
    lowestPercent = 0.8;
    constructor(sequence="",openPenalty = 5, extensionPenalty = 2, lowestPercent = 0.8) {
        this.sequence = sequence;
        this.extensionPenalty = extensionPenalty;
        this.openPenalty = openPenalty;
        this.lowestPercent = lowestPercent;
    }
}