const PosPromotion = require('../Models/PosPromotion')
const fs = require('fs')
const PromotionMaster = require('../Models/PromotionMaster')
const DocumentStatus = require('../Models/DocumentStatus')

exports.read = async (req, res) => {
    try {
        // code
        const Id = req.params.Id
        console.log('Id = ' + Id)
        const PosPromotioned = await PosPromotion.findOne({ Id: Id }).exec();
        res.send(PosPromotioned)
        // if(PosPromotioned) {
        //     res.send(PosPromotioned)   
        // } else {
        //     console.log('no PosPromotion Id = ' + Id)
        //     res.status(200).send('Not Found Promotion ' + Id)
        // }
        
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.list = async (req, res) => {

    //bengtest ลองเติมcomment

    var s = "bengtest";

    //ลองเติมcommentครั้งที่2...
    var s2= "bengtest02";

    //ลองเติมcommentครั้งที่3...
    s2= "bengtest03";

    //ลองเติมcommentครั้งที่4...
    s2= "bengtest04";

     //ลองเติมcommentครั้งที่5...
     s2= "bengtest05";

    try {
    const query = {}
    const sort = { Id: -1} //1คือASC, -1คือDESC
    const PosPromotioned = await PosPromotion.find(query).sort(sort);
    
    for (let i = 0; i < PosPromotioned.length; i++) {
        //console.log('i = ' + i +', PosPromotioned[i].PromotionMasterId = ' + PosPromotioned[i].PromotionMasterId)
        //const promotionMastered = await PromotionMaster.findOne({ Id: '665e093ca3137b2f9e4ef8e0' }).exec()
        const promotionMastered = await PromotionMaster.findOne({ PromoId: PosPromotioned[i].PromotionMasterId }).exec()
        //console.log('promotionMastered = ' + promotionMastered)
        if (promotionMastered) {
            PosPromotioned[i].PromotionMasterId = PosPromotioned[i].PromotionMasterId  + ' : ' + promotionMastered.PromoName
            PosPromotioned[i].IsActive = (PosPromotioned[i].IsActive='1') ? 'Y' : 'N'
        }
        
        //console.log('PosPromotioned[i].Status = ' +  PosPromotioned[i].Status)
        const documentStatused = await DocumentStatus.findOne({ Id: PosPromotioned[i].Status }).exec()
        //console.log('documentStatused' + documentStatused)
        if(documentStatused) {
            PosPromotioned[i].Status = documentStatused.Name
            // console.log('documentStatused.Name = ' + documentStatused.Name)
            // console.log('PosPromotioned[i].Status = ' + PosPromotioned[i].Status)
        }

        //console.log('newPromotionMastered = ' + PosPromotioned[i].PromotionMasterId)
        // for (let j = 0; j < promotionMastered.length; j++) {
        //     PosPromotioned[i].PromotionMasterId = PosPromotioned[i].PromotionMasterId  + ' : ' + promotionMastered[j].PromoName
        //     console.log('newPromotionMastered = ' + PosPromotioned[i].PromotionMasterId)
        // }
        //console.log(PosPromotioned[i].PromoName)
    }
    //console.log(PosPromotioned)

//     let i = 0;
// do {
//   // Code to be repeated
//   i++;
//   console.log(i)
// } while (i < 5)

    res.send(PosPromotioned)

    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.search = async (req, res) => {
    try 
    {

        const jsonString = req.body.body;
        const parsedData = JSON.parse(jsonString);
        console.log('Received JSON data:', parsedData)
        // console.log(parsedData.indexOf('"IdFrom":"'))
        // console.log(parsedData.indexOf('"IdTo":"'))
        // console.log(parsedData.indexOf('"ValidFrom"'))
        // console.log(parsedData.indexOf('"ValidTo"'))
        // console.log(parsedData.indexOf('"Name"'))
        // console.log(parsedData.indexOf('"Status"'))
        // console.log(parsedData.indexOf('"Active"'))
        // console.log(parsedData.indexOf('"Item"'))
        // console.log(parsedData.indexOf('"PromoType"'))
        // console.log('"IdFrom":"'.length+1)
        // console.log(parsedData.indexOf('"IdTo":"'))
        // console.log(parsedData.substring(11,18))
        const IdFromP = parsedData.substring('"IdFrom":"'.length+1,parsedData.indexOf('"IdTo":"')-2)
        const IdToP = parsedData.substring(parsedData.indexOf('"IdTo"')+'"IdTo":"'.length,parsedData.indexOf('"ValidFrom"')-2)
        const ValidFromP = parsedData.substring(parsedData.indexOf('"ValidFrom"')+'"ValidFrom":"'.length,parsedData.indexOf('"ValidTo"')-2)
        //console.log('ValidFrom = ' + ValidFrom)
        const ValidToP = parsedData.substring(parsedData.indexOf('"ValidTo"')+'"ValidTo":"'.length,parsedData.indexOf('"Name"')-2)
        const NameP = parsedData.substring(parsedData.indexOf('"Name"')+'"Name":"'.length,parsedData.indexOf('"Status"')-2)
        const StatusP = parsedData.substring(parsedData.indexOf('"Status"')+'"Status":"'.length,parsedData.indexOf('"Active"')-2)
        const ActiveP = parsedData.substring(parsedData.indexOf('"Active"')+'"Active":"'.length,parsedData.indexOf('"Item"')-2)
        const ItemP = parsedData.substring(parsedData.indexOf('"Item"')+'"Item":"'.length,parsedData.indexOf('"PromoType"')-2)
        const PromoTypeP = parsedData.substring(parsedData.indexOf('"PromoType"')+'"PromoType":"'.length,parsedData.length-2)
        //console.log(parsedData.substring(83+'"Active":"'.length,98-2))
        //console.log('IdTo = ' + parsedData.substring('"IdFrom":"'.length+1,parsedData.indexOf('"IdTo":"')-2))
        //console.log('IdFrom = ' + parsedData.substring('"IdFrom":"'.length+1,parsedData.indexOf('"IdTo":"'))
        
    
        let query1 = {}
        if(IdFromP != '') query1 ={Id:{$gte:IdFromP}}
        let query2 = {}
        if(IdToP != '') query2 ={Id:{$lte:IdToP}}
        let query31 = {$and:[
            {ValidFrom:{$lte:new Date(ValidFromP)}} //ValidFromP>=ValidFrom
            ,{ValidTo:{$gte:new Date(ValidFromP)}}  //ValidFromP<=ValidTo
        ]}
        let query32 = {$and:[
            {ValidFrom:{$lte:new Date(ValidToP)}} //ValidToP>=ValidFrom
            ,{ValidTo:{$gte:new Date(ValidToP)}}  //ValidToP<=ValidTo
        ]}
        //ValidFrom between ValidFromP and ValidToP
        let query33 = {$and:[
            {ValidFrom:{$gte:ValidFromP}}
            ,{ValidFrom:{$lte:ValidToP}}
        ]}
        //ValidTo between ValidFromP and ValidToP
        let query34 = {$and:[
            {ValidTo:{$gte:ValidFromP}}
            ,{ValidTo:{$lte:ValidToP}}
        ]}
        let query3 = {$or:[query31,query32,query33,query34]}
        let query4 = {}
        if (NameP!='') query4 = {PromoName:new RegExp('.*' + NameP + '.*')} //PromoName like %NameP%
        let query5 = {}
        if (StatusP!='') query5={Status:StatusP}
        let query6 = {}
        if (ActiveP!='') query6={IsActive:ActiveP}
        let query7 = {}
        //TODO:if (ItemP!='') query7= {:new RegExp('.*' + NameP + '.*')} //PromoName like %NameP%
        let query8 = {}
        if (PromoTypeP!='') query8={PromotionMasterId:PromoTypeP}
        
        //const query = {$and:[{Id:{$gte:IdFromP}}]}
        //const query = {Status:1}
        //const query = {$and:[query5]}
        const query = {$and:[query1,query2,query3,query4,query5,query6,query7,query8]}
        // const query = {};
        
        // if(IdFrom != '' && IdTo != '') query.Id = { $gte: IdFrom, $lte: IdTo }
        // if(IdFrom != '' && IdTo == '') query.Id = { $gte: IdFrom }
        // if(IdFrom == '' && IdTo != '') query.Id = { $lte: IdTo }

        // //ในmongocompass ใช้แบบนี้ได้ {ValidFrom:{$gte:ISODate('2024-05-01T00:00:00.000Z')}}
        // if(ValidFrom != '') query.ValidFrom = {$gte: ValidFrom}
        // console.log('ValidFrom = ' + ValidFrom)

        // and   ( ('2024-06-01 00:00'     between ValidFrom  and ValidTo) or  ( '2024-06-30 23:59'   between ValidFrom and ValidTo )  or (ValidFrom   between '2024-06-01 00:00'   and '2024-06-30 23:59' ) or  (ValidTo   between '2024-06-01 00:00'   and '2024-06-30 23:59' )) order by p.id desc
        
        // const queryX = {$or:[{ValidFrom:{$gte:ISODate(ValidFrom)}},{ValidTo:{$le:ISODate(ValidTo)}}]} //ใช้ไม่ได้
        // const queryX = {ValidFrom:{$gte:ISODate('2024-05-01T00:00:00.000Z')}} //ใช้ไม่ได้
        //const queryX = {ValidFrom:{$gte:new Date('2024-05-01T00:00:00.000Z')}} //ใช้ได้
        // const queryX = {ValidFrom:{$gte:new Date(ValidFrom)}}//ใช้ได้ เย้ๆๆ
        // const queryY = {ValidTo:{$gte:new Date(ValidTo)}}//ใช้ได้ เย้ๆๆ
        // const queryZ = {$or:[{queryX},{queryY},{}]}//ใช้ได้ เย้ๆๆ
        const PosPromotioned = await PosPromotion.find(query);
        //const PosPromotioned = await PosPromotion.find(queryZ); //ใช้ได้ เย้ๆๆ
        // const PosPromotioned = await PosPromotion.find(query);
        console.log('PosPromotioned = ' + PosPromotioned)

        for (let i = 0; i < PosPromotioned.length; i++) {
            const promotionMastered = await PromotionMaster.findOne({ PromoId: PosPromotioned[i].PromotionMasterId }).exec()
            if (promotionMastered) {
                PosPromotioned[i].PromotionMasterId = PosPromotioned[i].PromotionMasterId  + ' : ' + promotionMastered.PromoName
            }
             console.log('PosPromotioned[i].Status = ' + PosPromotioned[i].Status)
            // const documentStatused = await DocumentStatus.findOne({ Id: PosPromotioned[i].Status }).exec()
            // console.log('documentStatused = ' + documentStatused)
            // if(documentStatused) {
            //     PosPromotioned[i].Status = documentStatused.Name
            // }
        }

        res.status(200).send(PosPromotioned)
        //res.status(200).send(parsedData)
        
        //console.log('parsedData.IdFrom = ', parsedData.IdFrom)
       // const { IdFrom, IdTo, ValidFrom,ValidTo,Name,Status,Active,Item,PromoType } = parsedData
        //console.log(IdFrom)
        // if (typeof jsonString === 'string') {
        //     try {
        //       const parsedData = JSON.parse(jsonString);
        //       console.log('Received JSON data:', parsedData);
              
        //       // Check if the parsed data is an object or an array
        //       if (Array.isArray(parsedData)) {
        //         console.log('Iterating over an array:');
        //         for (let i = 0; i < parsedData.length; i++) {
        //           console.log(`Element ${i}:`, parsedData[i]);
        //         }
        //       } else if (typeof parsedData === 'object' && parsedData !== null) {
        //         console.log('Iterating over an object:');
        //         for (const key in parsedData) {
        //           if (parsedData.hasOwnProperty(key)) {
        //             console.log(`${key}:`, parsedData[key]);
        //           }
        //         }
        //       } else {
        //         console.error('Parsed data is neither an array nor an object.');
        //         res.status(400).json({ error: 'Parsed data is neither an array nor an object.' });
        //         return;
        //       }
        
        //       res.status(200).json(parsedData);
        //     } catch (error) {
        //       console.error('Invalid JSON string:', jsonString);
        //       res.status(400).json({ error: 'Invalid JSON string' });
        //     }
        //   } else {
        //     console.error('Request body does not contain a JSON string:', jsonString);
        //     res.status(400).json({ error: 'Request body must contain a JSON string' });
        //   }
        
        //const IdFrom = parsedData.IdFrom
        //console.log('IdFrom = ' + IdFrom)
        // for(const key in parsedData) {
        //     console.log('key = ' + key + ', parsedData[key] = ' + parsedData[key])
        // }
        

        // const jsonString = req.body
        // //const parsedData = JSON.parse(jsonString)
        // //console.log('Received JSON data:', parsedData)


        // console.log('in search')
        // console.log(req.body)
        // console.log('req.body = ' + req.body)
        // console.log('req.data = ' + req.data)
        // console.log('req.params.Id = ' + req.params.Id)
        // var data = req.body.body
        // console.log('data = ' + JSON.parse(data))
        // for(const key in data) {
        //     console.log('key = ' + key + ', data[key] = ' + data[key])
        // }

        // res.send(data)
    }
    catch(err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.create = async (req, res) => {
    try {
        // code
        var data = req.body
        const PosPromotioned = await PosPromotion.findOne({ Id: data.Id }).exec();
        if (PosPromotioned) {
            res.send('promotion already exists!!!').status(400)
        } else {
            console.log('data = ' + data)
            const PosPromotionSaved = await PosPromotion(data).save()
            res.send(PosPromotionSaved)
        }
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.update = async (req, res) => {
    try {
        // code
        const Id = req.params.Id
        var newData = req.body
        console.log(newData)
        // if(typeof req.file !== 'undefined') {
        //     newData.file = req.file.filename
        //     await fs.unlink('./uploadFiles/' + newData.fileold, (err)=> {
        //         if(err) {
        //             console.log(err)
        //         } else {
        //             console.log('Edit success')
        //         }
        //     })
        // }

        const updated = await PosPromotion
            .findOneAndUpdate({ Id: Id }, newData, { new: true })
            .exec()
        if(updated) {
            res.send(updated)
        } else {
            res.send('not found Promotion ' +  Id + ' to update!!!').status(400)
        }
        //console.log('updated = ' + updated)
        

    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.remove = async (req, res) => {
    try {
        // code
        const Id = req.params.Id
        console.log('Id = ' + Id)
        const removed = await PosPromotion.findOneAndDelete({Id:Id}).exec()

        console.log(removed)

        // if(removed?.file) {
        //     await fs.unlink('./uploadFiles/' + removed.file,(err)=>{
        //         if(err){
        //             console.log(err)
        //         } else {
        //             console.log('Remove Success')
        //         }
    
        //     })
        // }
        
        if(removed) {
            res.send(removed)
        } else {
            res.send('not found Promotion ' + Id + ' to delete!!!')
        }
        
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}