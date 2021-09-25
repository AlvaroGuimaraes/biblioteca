export class ConsultaBancoUtils{
    
  static buildFiltersParameters(obj) {
    const queryFields = Object.getOwnPropertyNames(obj);
    const objtoSearch = {};
    queryFields.forEach(field => {
      if (obj[field]) {
        objtoSearch[field] = obj[field];
      }
    });
    return Object.getOwnPropertyNames(objtoSearch).length > 0
      ? objtoSearch
      : null;
  }
}