const PromotionMaster = require('../Models/PromotionMaster')

exports.listPromotionMaster = async(req, res) => {
    const query = {}
    const sort = { PromoId: 1} //1คือASC, -1คือDESC 
    const listed = await PromotionMaster.find(query).sort(sort);
    res.send(listed)
}

exports.createPromotionMaster = async(req, res) => {
    const newPromotionMaster = req.body
    const saved = await PromotionMaster(newPromotionMaster).save()
    res.send(saved)
}