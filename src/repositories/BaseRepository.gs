/**
 * ==========================================================
 * Ontario CRM
 * BaseRepository v1.0.0
 * ==========================================================
 *
 * Базовый репозиторий для работы с Google Sheets.
 *
 * Не содержит бизнес-логики.
 *
 */

const BaseRepository = (() => {

  /**
   * Получить лист
   */
  function getSheet(sheetName) {

    const sheet =
      SpreadsheetApp
        .getActiveSpreadsheet()
        .getSheetByName(sheetName);

    if (!sheet) {

      throw new Error(
        `Лист "${sheetName}" не найден.`
      );

    }

    return sheet;

  }

  /**
   * Получить заголовки
   */
  function getHeaders(sheet) {

    return sheet
      .getRange(
        1,
        1,
        1,
        sheet.getLastColumn()
      )
      .getValues()[0];

  }

  /**
   * Получить все строки
   */
  function getRows(sheet) {

    if (sheet.getLastRow() < 2)
      return [];

    return sheet
      .getRange(
        2,
        1,
        sheet.getLastRow() - 1,
        sheet.getLastColumn()
      )
      .getValues();

  }

  /**
   * Добавить строку
   */
  function append(sheet, values) {

    sheet.appendRow(values);

  }

  /**
   * Обновить строку
   */
  function update(sheet, rowNumber, values) {

    sheet
      .getRange(
        rowNumber,
        1,
        1,
        values.length
      )
      .setValues([values]);

  }

  /**
   * Удалить строку
   */
  function remove(sheet, rowNumber) {

    sheet.deleteRow(rowNumber);

  }

  /**
   * Найти строку по UUID
   *
   * UUID всегда хранится в первом столбце.
   */
  function findRowByUuid(sheet, uuid) {

    const rows = getRows(sheet);

    for (let i = 0; i < rows.length; i++) {

      if (
        String(rows[i][0]).trim() === String(uuid).trim()
      ) {

        return {

          row: i + 2,

          values: rows[i]

        };

      }

    }

    return null;

  }

  return {

    getSheet,

    getHeaders,

    getRows,

    append,

    update,

    remove,

    findRowByUuid

  };

})();
