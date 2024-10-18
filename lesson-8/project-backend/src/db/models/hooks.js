export const handleSaveError = (error, data, next)=> {
    error.status = 400;
    next();
};

export const setUpdateSettings = function(next){
    this.options.runValidators = true;
    this.options.new = true;
    next();
};
