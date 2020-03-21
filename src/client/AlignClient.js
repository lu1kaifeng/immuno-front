import Axios from "axios";

export default class AlignClient {
    static align(request){
        return Axios.post('/align',request,{
            headers: { 'Content-Type': 'application/json' }
        })
    }
}