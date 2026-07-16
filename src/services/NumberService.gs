/**
 * ==========================================================
 * Ontario CRM
 * NumberService
 * Version: 2.0.0
 * ==========================================================
 *
 * Генерация номеров документов CRM.
 *
 */

const NumberService = (() => {

  const OBJECT_PREFIX = "ON-";

  /**
   * Следующий номер объекта
   *
   * @returns {string}
   */
  function nextObjectNumber() {

    const number = SystemRepository.increment(
      CONFIG.SYSTEM.OBJECT_NUMBER
    );

    return (
      OBJECT_PREFIX +
      String(number).padStart(4, "0")
    );

  }

  /**
   * Следующий номер документа
   *
   * @returns {number}
   */
  function nextDocumentNumber() {

    return SystemRepository.increment(
      CONFIG.SYSTEM.DOCUMENT_NUMBER
    );

  }

  return {

    nextObjectNumber,

    nextDocumentNumber

  };

})();

/**
 * ==========================================================
 * TEST
 * ==========================================================
 */

function testNumberService() {

  Logger.log(
    NumberService.nextObjectNumber()
  );

}
