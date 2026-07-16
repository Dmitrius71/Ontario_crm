/**
 * ==========================================================
 * Ontario CRM
 * NumberService v2.0.0
 * ==========================================================
 */

const NumberService = (() => {

  const PREFIX = "ON-";

  function nextObjectNumber() {

    let value =
      Number(
        SystemRepository.get("objectNumber")
      ) || 0;

    value++;

    SystemRepository.set(
      "objectNumber",
      value
    );

    return PREFIX +
      String(value).padStart(4, "0");

  }

  return {

    nextObjectNumber

  };

})();
