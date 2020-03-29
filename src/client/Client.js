import Axios from "axios";
export default class Client {
    static plot(event,geneId,tnm,gender,race){
        return Axios.get('/plot/'+event+'/'+geneId, {
            responseType: 'arraybuffer',
            headers:this.plotHeader(tnm,race,gender)
        })
    }
    static search(gene){
        return Axios.get('/illumina/'+gene,{ transformResponse: [data  => data] })
    }
    static plotHeader(tnm,race,gender){
        let header = {};
        if(tnm !== undefined){
            header['x-sample-tnm'] = tnm
        }
        if(race !==undefined){
            header['x-sample-race'] = race
        }
        if(gender !== undefined){
            header['x-sample-gender'] = gender
        }
        return header;
    }
}