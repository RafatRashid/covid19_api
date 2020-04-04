const Private = {
    isSingleObject: (obj) => {
        return obj instanceof Object && !Array.isArray(Object);
    },
    isArray: (obj) => Array.isArray(obj),
    isSingleObjectArray: (obj) => Array.isArray(obj) && obj.length > 0
};

module.exports.isEmpty = obj => {
    return obj ? Object.keys(obj).length === 0 : true;
};

/*module.exports.cacheModelsToDataModels = cacheModelList => {
    return this.isEmpty(cacheModelList) ? null : cacheModelList.map(cacheModel => {
        return cacheModel.val;
    });
};*/

/*module.exports.DataModelsToCacheModels = (key, dataModels) => {
    return this.isEmpty(dataModels) ? null : {
        key: key,
        val: dataModels
    }
};*/

module.exports.convertFromMongoModelToCovidReportViewModel = (dataFromMongo) => {
    if(this.isEmpty(dataFromMongo)) return null;
    else if(Private.isArray(dataFromMongo)){
        return dataFromMongo.map(mongoModel => {
            return {
                country_name: mongoModel.country_name,
                total_cases: mongoModel.total_cases,
                new_cases: mongoModel.new_cases,
                total_death: mongoModel.total_death,
                new_death: mongoModel.new_death,
                total_recovered: mongoModel.total_recovered,
                active_cases: mongoModel.active_cases,
                critical_cases: mongoModel.critical_cases,
                total_cases_per_million: mongoModel.total_cases_per_million,
                total_death_per_million: mongoModel.total_death_per_million
            };
        });
    }else if(Private.isSingleObjectArray(dataFromMongo)){
        delete dataFromMongo[0]._id;
        return dataFromMongo;
    }
    else if (Private.isSingleObject(dataFromMongo)) {
        delete dataFromMongo._id;
        return dataFromMongo;
    }
    return null;
};
