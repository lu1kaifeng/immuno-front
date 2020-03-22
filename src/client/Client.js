import Axios from "axios";
export default class Client {
    static plot(event,geneId){
        return Axios.get('/plot/'+event+'/'+geneId, {
            responseType: 'arraybuffer'
        })
    }
    static search(gene){
        return Axios.get('/illumina/'+gene,{ transformResponse: [data  => data] })
    }
}