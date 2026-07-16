/**
 * ==========================================================
 * Ontario CRM
 * UuidService v2.0.0
 * ==========================================================
 *
 * Назначение:
 * Генерация UUID для всех сущностей CRM.
 *
 * Используется:
 * - ObjectService
 * - CustomerService
 * - DocumentService
 * - HistoryService
 * - UserService
 *
 */

const UuidService = (() => {

  /**
   * Создать UUID
   *
   * @returns {string}
   */
  function create() {

    return Utilities.getUuid();

  }

  /**
   * Проверка UUID
   *
   * @param {string} uuid
   * @returns {boolean}
   */
  function isValid(uuid) {

    if (!uuid)
      return false;

    const regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    return regex.test(uuid);

  }

  /**
   * Создать массив UUID
   *
   * @param {number} count
   * @returns {string[]}
   */
  function createMany(count) {

    const result = [];

    for (let i = 0; i < count; i++) {

      result.push(create());

    }

    return result;

  }

  return {

    create,

    isValid,

    createMany

  };

})();
