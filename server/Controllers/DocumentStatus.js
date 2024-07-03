const DocumentStatus = require('../Models/DocumentStatus')

exports.list = async(req,res)=> {
    const query = {}
    const sort = { Id: 1} //1คือASC, -1คือDESC 
    const documentStatused = await DocumentStatus.find(query).sort(sort);
    res.send(documentStatused)
}

exports.create = async(req,res)=> {
    const newData = req.body
    const newDocumented = await DocumentStatus(newData).save()
    res.send(newDocumented)
}