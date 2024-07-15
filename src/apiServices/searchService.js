import * as request from '../utils/request'

export const search = async (q, type = 'less') => {
    try{
        const res = await request.get(`users/search`,{
            params: {
                q: q,
                type: type
            }
        })
        return res.data
    }catch(error){
        throw new Error('Lỗi api search: '+ error)
    }
}