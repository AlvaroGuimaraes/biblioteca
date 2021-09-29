export class ConsultaBancoUtils{
    
  /*método responsável por criar os filtros de consulta na base dedados*/
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