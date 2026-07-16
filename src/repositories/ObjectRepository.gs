/**
 * ==========================================================
 * Ontario CRM
 * ObjectRepository
 * Version: 2.0.0
 * ==========================================================
 */

const ObjectRepository = (() => {

  const SHEET_NAME = CONFIG.SHEETS.OBJECTS;

  const COL = Object.freeze({

    UUID: 0,
    NUMBER: 1,
    NAME: 2,
    ADDRESS: 3,
    AREA: 4,
    FOREMAN: 5,
    STATUS: 6,
    DATE_START: 7,
    DATE_FINISH: 8,
    CONTRACT_SUM: 9,
    CREATED_AT: 10,
    UPDATED_AT: 11

  });

  function sheet() {

    const sheet = SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName(SHEET_NAME);

    if (!sheet)
      throw new Error(`Лист "${SHEET_NAME}" не найден.`);

    return sheet;

  }

  function getAll() {

    const sh = sheet();

    if (sh.getLastRow() < 2)
      return [];

    const rows = sh
      .getRange(
        2,
        1,
        sh.getLastRow() - 1,
        sh.getLastColumn()
      )
      .getValues();

    return rows.map(rowToObject);

  }

  function get(uuid) {

    const list = getAll();

    return list.find(o => o.uuid === uuid) || null;

  }

  function insert(object) {

    sheet().appendRow(objectToRow(object));

    return object;

  }

  function update(object) {

    const sh = sheet();

    const values = sh.getDataRange().getValues();

    for (let i = 1; i < values.length; i++) {

      if (values[i][COL.UUID] === object.uuid) {

        sh.getRange(
          i + 1,
          1,
          1,
          12
        ).setValues([objectToRow(object)]);

        return object;

      }

    }

    throw new Error("Объект не найден.");

  }

  function rowToObject(row) {

    return {

      uuid: row[COL.UUID],

      number: row[COL.NUMBER],

      name: row[COL.NAME],

      address: row[COL.ADDRESS],

      area: Number(row[COL.AREA]) || 0,

      foreman: row[COL.FOREMAN],

      status: row[COL.STATUS],

      contractDateStart: row[COL.DATE_START],

      contractDateFinish: row[COL.DATE_FINISH],

      contractAmount: Number(row[COL.CONTRACT_SUM]) || 0,

      createdAt: row[COL.CREATED_AT],

      updatedAt: row[COL.UPDATED_AT]

    };

  }

  function objectToRow(object) {

    return [

      object.uuid,

      object.number,

      object.name,

      object.address,

      object.area,

      object.foreman,

      object.status,

      object.contractDateStart,

      object.contractDateFinish,

      object.contractAmount,

      object.createdAt,

      object.updatedAt

    ];

  }

  return {

    getAll,

    get,

    insert,

    update

  };

})();

/**
 * ==========================================================
 * TEST
 * ==========================================================
 */

function testObjectRepository() {

  Logger.log(
    ObjectRepository.getAll()
  );

}
