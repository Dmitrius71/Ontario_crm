/**
 * ==========================================================
 * Ontario CRM
 * SystemRepository v1.0.0
 * ==========================================================
 */

const SystemRepository = (() => {

  const SHEET = CONFIG.SHEETS.SYSTEM;

  function sheet() {

    return BaseRepository.getSheet(SHEET);

  }

  /**
   * Получить значение
   */
  function get(key) {

    const sh = sheet();

    const values = sh.getDataRange().getValues();

    for (let i = 1; i < values.length; i++) {

      if (values[i][0] === key) {

        return values[i][1];

      }

    }

    return null;

  }

  /**
   * Изменить значение
   */
  function set(key, value) {

    const sh = sheet();

    const values = sh.getDataRange().getValues();

    for (let i = 1; i < values.length; i++) {

      if (values[i][0] === key) {

        sh.getRange(i + 1, 2).setValue(value);

        return;

      }

    }

    sh.appendRow([key, value]);

  }

  return {

    get,

    set

  };

})();
