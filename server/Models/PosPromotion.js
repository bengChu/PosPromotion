const mongoose = require('mongoose')

const PosPromotionSchema = mongoose.Schema({
    Id: {
        type: String
    },
    Revision: {
        type: Number
    },
    PromoName: {
        type: String
    },
    IsActive: {
        type: Number
    },
    ValidFrom: {
        type: Date
    },
    ValidTo: {
        type: Date
    },
    Status: {
        type: Number
    },
    PromoSiteGroupId: {
        type: Number
    },
    CreateDate: {
        type: Date
    },
    UpdateDate: {
        type: Date
    },
    Sync: {
        type: Date
    },
    PromotionMasterId: {
        type: String
    },
    CountSync: {
        type: Number
    },
    canUseCoupon: {
        type: Number
    },
    canUseVoucher: {
        type: Number
    },
}
)
module.exports = mongoose.model('PosPromotions', PosPromotionSchema)