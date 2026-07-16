/**
 * ==========================================================
 * Ontario CRM
 * UiController
 * Version: 2.1.0
 * ==========================================================
 */

const UiController = (() => {

  function onOpen() {

    SpreadsheetApp.getUi()

      .createMenu("Ontario CRM")

      .addItem("➕ Новый объект", "openNewObject")

      .addSeparator()

      .addItem("📋 Карточка объекта", "openObjectCard")

      .addToUi();

  }

  /**
   * Форма создания объекта
   */
  function openNewObject() {

    const html = HtmlService
      .createTemplateFromFile("ObjectForm")
      .evaluate()
      .setTitle("Новый объект")
      .setWidth(420);

    SpreadsheetApp
      .getUi()
      .showSidebar(html);

  }

  /**
   * Создание объекта из HTML
   */
  function createObject(data) {

    return ObjectService.create({

      name: data.name,

      address: data.address,

      area: data.area,

      foreman: data.foreman,

      contractDateStart: data.contractDateStart
        ? new Date(data.contractDateStart)
        : null,

      contractDateFinish: data.contractDateFinish
        ? new Date(data.contractDateFinish)
        : null,

      contractAmount: data.contractAmount

    });

  }

  /**
   * Пока заглушка
   */
  function openObjectCard() {

    SpreadsheetApp
      .getUi()
      .alert("Карточка объекта пока не реализована.");

  }

  return {

    onOpen,

    openNewObject,

    createObject,

    openObjectCard

  };

})();

/**
 * ==========================================================
 * Глобальные функции
 * ==========================================================
 */

function onOpen() {

  UiController.onOpen();

}

function openNewObject() {

  UiController.openNewObject();

}

function createObject(data) {

  return UiController.createObject(data);

}

function openObjectCard() {

  UiController.openObjectCard();

}
