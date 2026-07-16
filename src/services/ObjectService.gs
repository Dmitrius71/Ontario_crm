/**
 * ==========================================================
 * Ontario CRM
 * ObjectService
 * Version: 2.0.0
 * ==========================================================
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

      name: data.name.trim(),

      address: data.address.trim(),

      area: Number(data.area) || 0,

      foreman: data.foreman || "",

      status: CONFIG.STATUS.WORKING,

      contractDateStart: data.contractDateStart,

      contractDateFinish: data.contractDateFinish,

      contractAmount: Number(data.contractAmount) || 0,

      createdAt: new Date(),

      updatedAt: new Date()

    };

    ObjectRepository.insert(object);

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

    if (Number(data.contractAmount) < 0)
      throw new Error("Стоимость договора не может быть отрицательной.");

  }

  return {

    create,

    get,

    update

  };

})();

/**
 * ==========================================================
 * TEST
 * ==========================================================
 */

function testCreateObject() {

  const object = ObjectService.create({

    name: "Тестовый объект",

    address: "Москва",

    area: 75,

    foreman: "Иванов",

    contractDateStart: new Date(),

    contractDateFinish: new Date(),

    contractAmount: 1000000

  });

  Logger.log(object);

}
