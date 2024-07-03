const mongoose = require('mongoose')

const PromotionMasterSchema = mongoose.Schema({
    ShopId: {
        type: String
    },
    PromoId: {
        type: String
    },
    PromoName: {
        type: String
    },
    BonusByType: {
        type: String
    },
    ConditionType: {
        type: String
    },
    StartDate: {
        type: Date
    },
    EndDate: {
        type: Date
    },
    IsActive: {
        type: Number
    },
    Sync: {
        type: Date
    },
    Seq: {
        type: Number
    },
}
)
module.exports = mongoose.model('PromotionMasters', PromotionMasterSchema)