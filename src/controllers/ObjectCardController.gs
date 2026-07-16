/**
 * ==========================================================
 * Ontario CRM
 * ObjectCardController
 * Version: 2.0.0
 * ==========================================================
 */

const ObjectCardController = (() => {

  /**
   * Открыть карточку объекта
   *
   * @param {string} uuid
   */
  function open(uuid) {

    const template = HtmlService.createTemplateFromFile("ObjectCard");

    template.objectUuid = uuid;

    const html = template
      .evaluate()
      .setTitle("Карточка объекта")
      .setWidth(900);

    SpreadsheetApp
      .getUi()
      .showSidebar(html);

  }

  return {

    open

  };

})();

/**
 * ==========================================================
 * Глобальные функции
 * ==========================================================
 */

function openObject(uuid) {

  ObjectCardController.open(uuid);

}

function getObject(uuid) {

  return ObjectCardService.get(uuid);

}

function updateObjectStatus(uuid, status) {

  return ObjectCardService.changeStatus(uuid, status);

}
