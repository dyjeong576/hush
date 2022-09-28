const appDataSource = require('./dataSource')

const getItems = async (keyWord) => {

    let result = [];
    //if( keyWord = "" ) return result;
    
    keyWord = keyWord + '%';
    
    result = await appDataSource.query(`
    SELECT
      id,
      name
    FROM 
      products
    WHERE 
      name like ? `,[keyWord]
    )
    return result;
    
  };

module.exports = {
    getItems
}