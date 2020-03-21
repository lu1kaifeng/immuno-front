export default class AlignmentEntry {
    percentageOfIdentity;
    geneID;
    alignedSequenceList=[];
    constructor(source) {
        this.alignedSequenceList = source.alignedSequenceList;
        this.geneID = source.geneID;
        this.percentageOfIdentity = source.percentageOfIdentity;
    }
}