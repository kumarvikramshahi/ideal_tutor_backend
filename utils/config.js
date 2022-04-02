// const config = process.env.REACT_APP_ENVIRONMENT === 'production'
//     ? prod
//     : (process.env.REACT_APP_ENVIRONMENT === 'staging' ? staging : dev);

const config = {
    databaseConnectionString:
        `mongodb+srv://kvsCusat:Kumarvikram*293@cluster0.tphmm.mongodb.net/idealTest?retryWrites=true&w=majority`,
}

module.exports = config;