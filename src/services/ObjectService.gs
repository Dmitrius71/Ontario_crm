/**
 * ==========================================================
 * Ontario CRM
 * ObjectService v2.0.0
 * ==========================================================
 *
 * Бизнес-логика работы с объектами
 *
 */

const ObjectService = (() => {

  /**
   * Создать объект
   */
  function create(data) {

    validate(data);

    const object = {

      uuid: UuidService.create(),

      number: NumberService.nextObjectNumber(),

      name: data.name,

      address: data.address,

      area: Number(data.area) || 0,

      foremanUuid: data.foremanUuid,

      status: CONFIG.STATUS.WORKING,

      contractDateStart: data.contractDateStart,

      contractDateFinish: data.contractDateFinish,

      contractAmount: Number(data.contractAmount) || 0,

      createdAt: new Date(),

      updatedAt: new Date()

    };

    ObjectRepository.insert(object);

    HistoryService.add({

      objectUuid: object.uuid,

      event: "OBJECT_CREATED",

      description: "Создан новый объект"

    });

    return object;

  }

  /**
   * Получить объект
   */
  function get(uuid) {

    return ObjectRepository.get(uuid);

  }

  /**
   * Обновить объект
   */
  function update(object) {

    validate(object);

    object.updatedAt = new Date();

    ObjectRepository.update(object);

    return object;

  }

  /**
   * Архивировать объект
   */
  function archive(uuid) {

    const object = get(uuid);

    if (!object)
      throw new Error("Объект не найден.");

    object.status = CONFIG.STATUS.ARCHIVED;

    update(object);

    HistoryService.add({

      objectUuid: uuid,

      event: "OBJECT_ARCHIVED",

      description: "Объект перенесён в архив"

    });

  }

  /**
   * Проверка данных
   */
  function validate(data) {

    if (!data.name)
      throw new Error("Не указано название объекта.");

    if (!data.address)
      throw new Error("Не указан адрес объекта.");

    if (!data.contractDateStart)
      throw new Error("Не указана дата начала.");

    if (!data.contractDateFinish)
      throw new Error("Не указана дата окончания.");

    if (
      Number(data.contractAmount) <= 0
    ) {
      throw new Error(
        "Стоимость договора должна быть больше нуля."
      );
    }

  }

  return {

    create,

    get,

    update,

    archive

  };

})();
