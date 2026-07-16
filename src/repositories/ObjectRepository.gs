/**
 * ==========================================================
 * Ontario CRM
 * ObjectRepository v2.0.0
 * ==========================================================
 *
 * Работа с таблицей "Объекты"
 *
 */

const ObjectRepository = (() => {

  const SHEET = CONFIG.SHEETS.OBJECTS;

  /**
   * Лист
   */
  function sheet() {

    return BaseRepository.getSheet(SHEET);

  }

  /**
   * Все объекты
   */
  function getAll() {

    const sh = sheet();

    const rows =
      BaseRepository.getRows(sh);

    return rows.map(toObject);

  }

  /**
   * Получить объект
   */
  function get(uuid) {

    const sh = sheet();

    const result =
      BaseRepository.findRowByUuid(
        sh,
        uuid
      );

    if (!result)
      return null;

    return toObject(result.values);

  }

  /**
   * Сохранить
   */
  function insert(object) {

    const sh = sheet();

    BaseRepository.append(
      sh,
      fromObject(object)
    );

    return object;

  }

  /**
   * Обновить
   */
  function update(object) {

    const sh = sheet();

    const result =
      BaseRepository.findRowByUuid(
        sh,
        object.uuid
      );

    if (!result)
      throw new Error(
        "Объект не найден."
      );

    BaseRepository.update(
      sh,
      result.row,
      fromObject(object)
    );

    return object;

  }

  /**
   * Архивировать
   */
  function archive(uuid) {

    const object = get(uuid);

    if (!object)
      return;

    object.status =
      CONFIG.STATUS.ARCHIVED;

    update(object);

  }

  /**
   * Google Sheet → Object
   */
  function toObject(row) {

    return {

      uuid: row[0],

      number: row[1],

      name: row[2],

      address: row[3],

      area: Number(row[4]) || 0,

      foremanUuid: row[5],

      status: row[6],

      contractDateStart: row[7],

      contractDateFinish: row[8],

      contractAmount:
        Number(row[9]) || 0,

      createdAt: row[10],

      updatedAt: row[11]

    };

  }

  /**
   * Object → Google Sheet
   */
  function fromObject(object) {

    return [

      object.uuid,

      object.number,

      object.name,

      object.address,

      object.area,

      object.foremanUuid,

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

    update,

    archive

  };

})();
