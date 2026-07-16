/**
 * ==========================================================
 * Ontario CRM
 * SystemRepository
 * Version: 2.0.0
 * ==========================================================
 *
 * Работа с системными настройками.
 *
 */

const SystemRepository = (() => {

  const SHEET_NAME = CONFIG.SHEETS.SYSTEM;

  /**
   * Лист System
   */
  function getSheet() {

    const sheet = SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName(SHEET_NAME);

    if (!sheet)
      throw new Error(`Лист "${SHEET_NAME}" не найден.`);

    return sheet;

  }

  /**
   * Получить значение
   */
  function get(key) {

    const sheet = getSheet();

    const values = sheet.getDataRange().getValues();

    for (let i = 1; i < values.length; i++) {

      if (String(values[i][0]) === String(key)) {

        return values[i][1];

      }

    }

    return null;

  }

  /**
   * Записать значение
   */
  function set(key, value) {

    const sheet = getSheet();

    const values = sheet.getDataRange().getValues();

    for (let i = 1; i < values.length; i++) {

      if (String(values[i][0]) === String(key)) {

        sheet.getRange(i + 1, 2).setValue(value);

        return;

      }

    }

    sheet.appendRow([key, value]);

  }

  /**
   * Увеличить счетчик
   */
  function increment(key) {

    let value = Number(get(key));

    if (isNaN(value))
      value = 0;

    value++;

    set(key, value);

    return value;

  }

  return {

    get,

    set,

    increment

  };

})();

/**
 * ==========================================================
 * TEST
 * ==========================================================
 */

function testSystemRepository() {

  Logger.log(
    SystemRepository.get(CONFIG.SYSTEM.BUILD_VERSION)
  );

}
