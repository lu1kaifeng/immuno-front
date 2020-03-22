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
        if(tnm !== null){
            header['x-sample-tnm'] = tnm
        }
        if(race !== null){
            header['x-sample-race'] = race
        }
        if(gender !== null){
            header['x-sample-gender'] = gender
        }
        return header;
    }
}