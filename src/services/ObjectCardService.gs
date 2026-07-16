/**
 * ==========================================================
 * Ontario CRM
 * ObjectCardService
 * Version: 2.0.0
 * ==========================================================
 */

const ObjectCardService = (() => {

  /**
   * Получить объект для карточки
   *
   * @param {string} uuid
   * @returns {Object}
   */
  function get(uuid) {

    const object = ObjectRepository.get(uuid);

    if (!object)
      throw new Error("Объект не найден.");

    return object;

  }

  /**
   * Изменить статус объекта
   *
   * @param {string} uuid
   * @param {string} status
   */
  function changeStatus(uuid, status) {

    const object = ObjectRepository.get(uuid);

    if (!object)
      throw new Error("Объект не найден.");

    object.status = status;

    object.updatedAt = new Date();

    ObjectRepository.update(object);

    return object;

  }

  return {

    get,

    changeStatus

  };

})();

/**
 * ==========================================================
 * Глобальные функции для HTML
 * ==========================================================
 */

/**
 * Возвращает объект в карточку
 *
 * @param {string} uuid
 * @returns {Object}
 */
function getObject(uuid) {

  return ObjectCardService.get(uuid);

}
