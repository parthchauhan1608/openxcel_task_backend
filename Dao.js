
function findOne(model, query, projection = {}, options = {}, populate = []) {
    return model.findOne(query, projection, options)
        .populate(populate)
        .lean()
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log("Query Error ====>", { err });
            Promise.reject(err);
        });
};

function find(model, query, projection, options) {
    return model.find(query, projection, options).lean()
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log("Query Error ====>", { err });
            Promise.reject(err);
        });
};

function save(data) {
    return data.save()
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log("Query Error ====>", { err });
            Promise.reject(err);
        });
}

function findandupdateWithPopulate(model, query, update, options = {}, populate = []) {
    return model.findOneAndUpdate(query, update, options).populate(populate)
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log("Query Error ====>", { err });
            Promise.reject(err);
        });
}

function updateMany(model, query, update, options = {}) {
    return model.updateMany(query, update, options)
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log("Query Error ====>", { err });
            Promise.reject(err);
        });
}

function count(model, query) {
    return model.find(query).count()
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log("Query Error ====>", { err });
            Promise.reject(err);
        });
}



function findWithPopulate(model, query, projection = {}, options = {}, populate = []) {
    return model.find(query, projection, options).populate(populate).lean()
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log("Query Error ====>", { err });
            Promise.reject(err);
        });
}

module.exports = {
    findOne,
    find,
    save,
    findandupdateWithPopulate,
    updateMany,
    count,
    findWithPopulate
}